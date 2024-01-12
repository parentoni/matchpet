import { TextInput } from "../input/TextInput";
import { useContext, useState } from "react";
import { ANIMAL_STATUS, PrintableAnimalStatus } from "../../../utils/services/dtos/AnimalDTO";
import { MaxCharacters } from "../input/MaxCharacters";
import { TextArea } from "../input/TextArea";
import { SelectInput } from "../input/SelecInput";
import _ from 'lodash';
import { SpeciesContext } from "../../../utils/context/SpeciesContext";
import { ImageInput, ImageInputModal } from "./ImageInput";
import { AnimalInput, PartnerCreateAnimalFormProps } from "./PartnerCreateAnimalFormTypes";
import { SEX } from "../../../utils/domain/Animal";


export const PartnerCreateAnimalForm = (props: PartnerCreateAnimalFormProps) => {

  const { species } = useContext(SpeciesContext);

  const [imageInputModalOpenId, setImageInputModalOpenId] = useState<number | undefined>(undefined);
  const [imageInputModalOpen, setImageInputModalOpen] = useState(false);

  function changeAnimalInput<T extends keyof AnimalInput>(key: T, value: AnimalInput[T]['value']) {
    props.animalInput[key].value = value;
    props.setAnimalInput(structuredClone(props.animalInput));
  }

  function changeAnimalInputTraits(key: string, value: string) {
    props.animalInputTraits[key] = value;
    props.setAnimalInputTraits(structuredClone(props.animalInputTraits));
  }


  return (
    <>
      <form className=" flex flex-col w-[min(100%,37rem)]" onSubmit={props.onSubmit}>
        <section className=" pb-4">
          <h2 className=" h-8 flex items-center text-xl font-medium">Informações gerais</h2>
          <div className="w-full border-b my-4"></div>
          <TextInput
            state={props.animalInput.name.value}
            placeholder="Max"
            onChange={(x) => changeAnimalInput('name', x.target.value as string)}
            title="Nome"
            subElement={<MaxCharacters current={props.animalInput.name.value.length} max={100} error={false} />}
            errorMessage={props.animalInputErrors.name ? "O nome do animal é obrigatório e não deve exceder 100 caracteres." : ""}
            obrigatory={props.animalInput.name.obrigatory} />

          <TextArea
            state={props.animalInput.description.value}
            placeholder="Max é um animal muito brincalhão. Foi resgatado aos 7 anos de idade..."
            onChange={(x) => changeAnimalInput('description', x.target.value as string)}
            title="Descrição"
            subElement={<MaxCharacters current={props.animalInput.description.value.length} max={1000} error={false} />}
            errorMessage={props.animalInputErrors.description ? "A descricão do animal é obrigatória e não deve exceder 1000 caracteres." : ""}
            obrigatory={props.animalInput.description.obrigatory} />

          <SelectInput
            state={props.animalInput.specie_id.value}
            setState={x => changeAnimalInput('specie_id', x as ANIMAL_STATUS)}
            title="Espécie"
            array={species.map(e => e._id)}
            option={x => species.find(e => e._id === x)?.name || "ERRO"}
            checked={x => x === props.animalInput.specie_id.value}
            errorMessage={props.animalInputErrors.specie_id ? "A espécie do animal é obrigatória." : ""}

            obrigatory />
          <div className="mt-4 w-full"></div>

          <SelectInput
            state={props.animalInput.sex.value}
            setState={x => changeAnimalInput("sex", x as SEX)}
            title="Sexo"
            array={[SEX.MALE, SEX.FEMALE]}
            option={x => x === SEX.MALE? "Macho": x === SEX.FEMALE? "Fêmea": "ERRO"}
            checked={x => x === props.animalInput.sex.value}

            errorMessage={props.animalInputErrors.sex ? "O sexo do animal é obrigatório" : ""}
            obrigatory
            />
          <div className="mt-4 w-full"></div>

          <SelectInput
            state={props.animalInput.status.value}
            setState={x => changeAnimalInput('status', x as ANIMAL_STATUS)}
            title="Estado"
            array={[ANIMAL_STATUS.PENDING, ANIMAL_STATUS.CANCELED, ANIMAL_STATUS.DONATED]}
            option={x => PrintableAnimalStatus[x]}
            checked={x => x === props.animalInput.status.value}
            errorMessage={props.animalInputErrors.status ? "O estado do animal é obrigatório." : ""}
            obrigatory />
        </section>
        <section className="pb-4">
          <h2 className=" h-8 flex items-center text-xl font-medium">Galeria de fotos</h2>
          <p className="text-sm">5 imagens permitidas. Máximo de 50 mb por imagem.</p>
          <div className="w-full border-b my-4"></div>
          <div className="flex flex-col gap-4">
            <ImageInput
              obrigatory
              setIsOpen={setImageInputModalOpen}
              image={props.images[0]}
              title="Imagem principal (1/5)"
              id={0}
              setImageInputModalOpenId={setImageInputModalOpenId}
              errorMessage={props.imagesError ? "A imagem principal é obrigatória." : ""} />
            {_.range(0, Math.min(props.images.length, 4)).map((_, index) => <ImageInput setIsOpen={setImageInputModalOpen} key={index} image={props.images[index + 1]} title={`Imagem da galeria (${index + 2}/5)`} id={index + 1} setImageInputModalOpenId={setImageInputModalOpenId} />
            )}
          </div>
        </section>
        <section className="pb-4">
          <h2 className=" h-8 flex items-center text-xl font-medium">Dados específicos da espécie</h2>
          <div className="w-full border-b my-4"></div>

          {props.animalInput.specie_id.value ?
            <div className="flex flex-col gap-4">
              {species.find(e => e._id === props.animalInput.specie_id.value)?.traits.map((e, index) => <SelectInput
                state={props.animalInputTraits[`trait_${e._id}`]}
                setState={x => changeAnimalInputTraits(`trait_${e._id}`, x as string)}
                title={e.name}
                array={e.options.map(x => x._id)}
                option={x => e.options.find(e => e._id === x)?.name || 'Erro'}
                checked={x => x === props.animalInputTraits[`trait_${e._id}`]}
                key={index}
                obrigatory={!e.optional}
                errorMessage={props.animalInputTraitsErrors[`trait_${e._id}`] ? `O campo ${e.name} é obrigatório.` : ""} />

              )}
            </div>
            :
            <div className="w-full h-60 flex items-center justify-center">
              <p className="text-primary">Selecione uma espécie para continuar</p>
            </div>}
        </section>
        <section>
          <h2 className=" h-8 flex items-center text-xl font-medium">Contato</h2>
          <div className="w-full border-b my-4"></div>
          <div className="flex flex-col gap-4">
            <SelectInput
              state={props.iAmTheContact}
              array={[true, false]}
              option={x => x ? "Sim" : "Não"}
              setState={x => props.setIAmTheContact(x as boolean)}
              title="Os seus dados de contato devem ser usados para esse animal?"
              checked={x => x === props.iAmTheContact}
              obrigatory />
            {!props.iAmTheContact &&
              <>
                <ContactInput
                  state={props.animalInput.whatsapp.value}
                  onChange={x => changeAnimalInput('whatsapp', x.target.value)}
                  title={"Whatsapp"}
                  placeholder="31 9 1234-5678"
                  errorMessage={props.animalInputErrors.whatsapp ? "Por favor, insira um número de Whatsap válido." : ""}
                  obrigatory />
                <ContactInput
                  state={props.animalInput.email.value}
                  onChange={x => changeAnimalInput('email', x.target.value)}
                  title={"Email"}
                  placeholder="nome@provedor.com" />
              </>}
          </div>
        </section>

        <button className="h-8 w-full bg-primary text-white text-xs rounded mt-8 items-center flex justify-center" type="submit">{<p>Salvar alterações</p>}</button>
      </form>
      <ImageInputModal isOpen={imageInputModalOpen} setIsOpen={setImageInputModalOpen} imageInputModalIsOpenId={imageInputModalOpenId} setImageInputModalOpenId={setImageInputModalOpenId} imagesArray={props.images} setImagesArray={props.setImages} />
    </>
  );
};


export interface ContactInputProps {
  title: string;
  errorMessage?: string;
  onChange: (x: React.ChangeEvent<HTMLInputElement>) => void;
  state: string;
  placeholder: string;
  obrigatory?: boolean;
}

export const ContactInput = (props: ContactInputProps) => {

  return (
    <div className="flex flex-col w-full">
      <label className={`mb-2 text-sm  ${props.errorMessage ? "text-error" : ""}`}>{props.title}  {props.obrigatory ? <span className="text-primary">*</span> : ''}</label>
      <input value={props.state} placeholder={props.placeholder} id={props.title} onChange={props.onChange} className={`rounded w-full bg-neutral-50 h-8  text-xs border p-2 ${props.errorMessage ? "border-error  placeholder-error" : "border-gray-300"}`}></input>
      <div className="flex items-center">
        {props.errorMessage ? <span className="text-sm text-error">{props.errorMessage}</span> : ''}
      </div>
    </div>
  );
};
