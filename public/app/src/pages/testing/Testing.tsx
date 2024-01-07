import { DomToImage } from "../../elements/partner/new/DomToImage"

export const Testing = () => {
  return (
  <DomToImage className="w-80 h-80  bg-white relative" imageName="Imagem 1 de Remi" proxy="https://matchpetong.s3.sa-east-1.amazonaws.com/animals/45d22f18-e678-483c-8d8e-f89f246eec45-IMG_20231022_181317.jpg">
    <div className="absolute bottom-8 right-0 w-full flex justify-end">

      {/* Name and next page indicator */} 
      <div className="max-w-[60%] bg-neutral-50 border p-2 flex flex-col border-r-0 rounded rounded-r-none ">
        <p className="text-sm">Adote <span className="text-primary">Remi</span>, fêmea.</p>
        <p className="text-[0.5rem]"> Detalhes na <span className="text-primary">próxima página</span>.</p>
      </div>

    </div>
    {/*Copyright */}

    <div className="absolute top-0 left-0 flex items-center justify-center w-full">
      <span className="text-primary text-[0.5rem] "> www.matchpet.org & Parentoni </span>
    </div>
    <div className="absolute bottom-0 left-0 flex items-center justify-center w-full">
      <span className="text-primary text-[0.5rem]  "> www.matchpet.org & Parentoni </span>
    </div>

    {/* Image container */}
    <div className="w-full h-full flex items-center justify-center bg-opacity-10  bg-primary">
      <img alt="Imagem principal do animal" src="https://matchpetong.s3.sa-east-1.amazonaws.com/animals/45d22f18-e678-483c-8d8e-f89f246eec45-IMG_20231022_181317.jpg"
          className="w-auto h-auto max-w-full max-h-full " />
    </div>
  </DomToImage>
  )
}
