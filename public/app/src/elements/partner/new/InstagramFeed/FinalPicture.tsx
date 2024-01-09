import { useEffect, useState } from "react"
import { IAnimalDTO } from "../../../../utils/services/dtos/AnimalDTO"
import { IUserPersistent } from "../../../../utils/services/dtos/UserDTO"
import QRCode  from "qrcode"

export type FinalPictureProps = {
  user: IUserPersistent,
  animal:IAnimalDTO
}
export const FinalPicture = (props: FinalPictureProps) => {
  const [url, setUrl] = useState<string | undefined>()
  useEffect(() => {
    QRCode.toDataURL(`https://www.matchpet.org/animals/${props.animal._id}`).then(res => {
      setUrl(res)
    })
    }, [])
  return (
    <div className="h-80 w-80 bg-white relative">
    {/*Copyright*/}
      <div className="absolute top-0 left-0 flex items-center justify-center w-full">
        <span className="text-primary text-[0.5rem] "> www.matchpet.org & {props.user.display_name} </span>
      </div>
      <div className="absolute bottom-0 left-0 flex items-center justify-center w-full">
        <span className="text-primary text-[0.5rem] "> www.matchpet.org & {props.user.display_name}</span>
      </div>
      <div className="w-full h-full bg-primary bg-opacity-10 p-4 flex flex-col gap-2">
        <p>Adote <span className="text-primary">{props.animal.name}</span> no <span className="text-primary font-medium">MatchPet</span>.</p>
        <p className="text-sm ">Acesse: <span className="text-primary">www.matchpet.org/p/{props.user.username}</span></p>
        <p className="text-sm">ou</p>
        <p className="text-sm">Leia o QR-Code abaixo:</p>
        <img src={url} alt="QR code do animal" className="w-32 h-32"/>
      </div>
    </div>
  )
}
