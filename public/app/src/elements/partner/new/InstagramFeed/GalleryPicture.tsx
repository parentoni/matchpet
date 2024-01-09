import { image } from "html2canvas/dist/types/css/types/image"
import { IAnimalDTO } from "../../../../utils/services/dtos/AnimalDTO"
import { IUserPersistent } from "../../../../utils/services/dtos/UserDTO"

export type GalleryPictureProps = {
  animal: IAnimalDTO,
  user: IUserPersistent,
  imageUrl: string,
  imageIndex:number,
  totalImages: number,
}

export const GalleryPicture = (props: GalleryPictureProps) => {
  return (
    <div className="h-80 w-80 bg-white relative">
      {/* Name and next page indicator */} 
      <div className="absolute bottom-8 right-0 w-full flex justify-end">
        <div className="max-w-[60%] bg-neutral-50 border p-2 flex flex-col border-r-0 rounded rounded-r-none ">
          <p className="text-[0.5rem]"> Imagem  <span className="text-primary">{props.imageIndex}</span> de <span className="text-primary">{props.totalImages}</span></p>
        </div>
      </div>
    {/*Copyright */}

    <div className="absolute top-0 left-0 flex items-center justify-center w-full">
      <span className="text-primary text-[0.5rem] "> www.matchpet.org & {props.user.display_name} </span>
    </div>
    <div className="absolute bottom-0 left-0 flex items-center justify-center w-full">
      <span className="text-primary text-[0.5rem] "> www.matchpet.org & {props.user.display_name}</span>
    </div>


    <div className="w-full h-full flex items-center justify-center bg-opacity-10  bg-primary">
      <img alt="Imagem principal do animal" src={props.imageUrl} className="w-auto h-auto max-w-full max-h-full " />
    </div>
    </div>
  )
}
