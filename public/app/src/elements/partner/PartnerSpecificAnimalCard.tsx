import { useNavigate } from "react-router-dom";
import { IAnimalDTO } from "../../utils/services/dtos/AnimalDTO";


export const PartnerSpecificAnimalCard = ({ animal }: { animal: IAnimalDTO; }) => {

  const navigate = useNavigate()

  return (
    <div className="grid-resizable-cards-width  brute-border " key={animal._id}>
      <img className="w-full aspect-video bg-cover" alt={`Imagem de ${animal.name}`} src={animal.image[0]}></img>
      <div className="flex flex-col p-4">
        <div className="flex justify-between items-center">
          <div className="text-xl">{animal.name}</div>
          <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" className="text-lg" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9.5 2a.5.5 0 0 1 0-1h5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0V2.707L9.871 6.836a5 5 0 1 1-.707-.707L13.293 2H9.5zM6 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"></path></svg>
        </div>
        <p className="line-clamp-2 text-xs">{animal.description}</p>
        <div className="flex justify-between items-center mt-5 gap-3">
          <button className="h-8 flex-1 border flex justify-center items-center" onClick={() => navigate(`/partner/animal/${animal._id}`)}>
            <span className="text-sm">EDITAR</span>
          </button>
        </div>
      </div>
    </div>
  );
};
