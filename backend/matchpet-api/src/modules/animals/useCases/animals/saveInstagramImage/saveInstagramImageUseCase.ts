import { CommonUseCaseResult } from "../../../../../shared/core/Response/UseCaseError";
import { Either, left, right } from "../../../../../shared/core/Result";
import { UseCase } from "../../../../../shared/core/UseCase";
import ejs from "ejs";
import { animalRepo } from "../../../repository";
import { SaveInstagramImageDTO } from "./saveInstagramImageDTO";
import { UploadedFile } from "express-fileupload";
import { findSpecieByIdUseCase } from "../../species/findSpecieById";
import { join } from "path";
import { uploadAnimalImageUseCase } from "../../../../app/useCases/uploadlImage";
import { arrayBuffer } from "stream/consumers";
import { ValidUrl } from "../../../../../shared/core/ValidUrl";
import { IAnimalRepo } from "../../../repository/IAnimalRepo";

export class SaveInstagramImageUseCase implements UseCase<SaveInstagramImageDTO, Either<CommonUseCaseResult.UnexpectedError | CommonUseCaseResult.InvalidValue, null>> {
    

    private animalRepo: IAnimalRepo;

  
    constructor(animalRepo: IAnimalRepo) {
      this.animalRepo = animalRepo;
    }

    async execute(request: SaveInstagramImageDTO): Promise<Either<CommonUseCaseResult.UnexpectedError | CommonUseCaseResult.InvalidValue, null>> {
        function formatPhoneNumber(phoneNumberString : string) {
        
            var cleaned = ('' + phoneNumberString.replace("+55", '')).replace(/\D/g, '');
            var match = cleaned.match(/^(1|)?(\d{2})(\d{5})(\d{4})$/);
            var match2 = cleaned.match(/^(1|)?(\d{2})(\d{5})(\d{5})$/);
            if (match ) {
              var intlCode = (match[1] ? '+55 ' : '');
              return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
            } else if (match2) {
                var intlCode = (match2[1] ? '+55 ' : '');
                return [intlCode, '(', match2[2], ') ', match2[3], '-', match2[4]].join('');
            }
            return phoneNumberString;
          }
        
        const animalOrError = await this.animalRepo.findById(request.animalId)
        if (animalOrError.isLeft()) {
            return left(animalOrError.value)
        }
        const animal = animalOrError.getRight()

        const animalSpecieOrError = await findSpecieByIdUseCase.execute({id : animal.specieId.toValue()})
        if (animalSpecieOrError.isLeft()) {
            return left(animalSpecieOrError.value)
        }
        
        const traits = []
        const animalImages = []
        for (const trait of animal.animalTraits.persistentValue) {
            let i = animalSpecieOrError.value.traits.findIndex(el => el._id === trait._id)
            
            let y = animalSpecieOrError.value.traits[i]?.options.findIndex(el => el._id === trait.value)
            if (!animalSpecieOrError.value.traits[i] || y === undefined || !animalSpecieOrError.value.traits[i]?.options[y]) {
                return left(CommonUseCaseResult.UnexpectedError.create({
                    errorMessage: `An error ocurred getting the animal traits`,
                    variable: "ANIMAL_TRAITS",
                    location: `${SaveInstagramImageUseCase.name}.execute`
                }))
            }
            traits.push({name : animalSpecieOrError.value.traits[i]?.name, value: animalSpecieOrError.value.traits[i]?.options[y]?.name})
        }
        for (const image of animal.image.getImages()) {
            animalImages.push( image.value)
        }
       
        const contact = animal.contact.persistentValue[animal.contact.persistentValue.findIndex(el => el.contact_type === "WHATSAPP")]?.contact_value

        const firstHTMLFile = await ejs.renderFile(join(animal.image.list.length >= 3 ? __dirname + `../../../../../../../static/emails/ejs/instagramImage.ejs` : __dirname + `../../../../../../../static/emails/ejs/instagramSingleImage.ejs`), {
            animalName : animal.name.value,
            animalSex : animal.sex.value,
            images : animalImages
        })
        const secondHTMLFile = await ejs.renderFile(join(__dirname + "../../../../../../../static/emails/ejs/instagramAnimalInfo.ejs"), {
            animalName : animal.name.value,
            animalTraits : traits
        })
        const thirdHTMLFile = await ejs.renderFile(join(__dirname + "../../../../../../../static/emails/ejs/instagramContact.ejs"), {
            animalContact : formatPhoneNumber(contact as string),
            images : animalImages
        })

        const images = []
        const files = [firstHTMLFile, secondHTMLFile, thirdHTMLFile]

        for (const file of files) {
            const response = await fetch("http://matchpet-rendering-server:8001/render?width=1080&height=1080", {
                method: "POST",
                body: file,
                headers: {"Accept" : "image/jpeg", "Content-Type" : "text/html"},
            })
            if (response.ok) {
                images.push(await response.arrayBuffer())
            } else {
                return left(CommonUseCaseResult.UnexpectedError.create({
                    errorMessage: `An error ocurred when rendering the image`,
                    variable: "IMAGE_HTML_RENDER",
                    location: `${SaveInstagramImageUseCase.name}.execute`
                }))
            }
        }

        animal.exportImage.clear()

        for (const image of images) {
            const res = await uploadAnimalImageUseCase.execute({ file: Buffer.from(image), fileName: `image.jpg`})
            
            if (res.isLeft()) {
                return left(res.value)
            }
            const url = ValidUrl.create({value : res.value})
            if (url.isLeft()) {
                return left(url.value)
            }

            animal.exportImage.add(url.getRight())
        }

        await this.animalRepo.save(animal)

        return right(null)
    }

}