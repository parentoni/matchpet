import { TextInput } from "./input/TextInput";
import { MaxCharacters } from "./input/MaxCharacters";
import { TextArea } from "./input/TextArea";
import { NumberInput } from "./input/NumberInput";
import { AnimalInput, AnimalInputError, SpecieInputTraitsErrors, SpecieInputTraitsProps } from "../../pages/partner/PartnerEditAnimal";
import { Species } from "../../utils/domain/Species";
import { SelectInput, SpecieInputProps } from "./input/SelecInput";
import { Specie } from "../../utils/domain/Specie";
import { text } from "body-parser";
import { ANIMAL_STATUS } from "../../utils/services/dtos/AnimalDTO";

export interface PartnerEditAnimalFormProps {
  animalInput: AnimalInput,
  setAnimalInput: (x:AnimalInput) => void,
  animalInputError: AnimalInputError,
  species: Species,
  selectedSpecies: Specie | undefined,
  speciesError:boolean
  setSelectedSpecies: (x: Specie) => void,
  traits: SpecieInputTraitsProps,
  setTraits: (x:SpecieInputTraitsProps) => void,
  traitsError: SpecieInputTraitsErrors,
  id:string,
  animalStatus: ANIMAL_STATUS | undefined,
  setAnimalStatus: (x: ANIMAL_STATUS) => void,
}

export const PartnerEditAnimalForm = (props: PartnerEditAnimalFormProps) => {

  function changeAnimalInput<T extends keyof AnimalInput>(key: T, value: AnimalInput[T]) {
    props.animalInput[key] = value;
    props.setAnimalInput(structuredClone(props.animalInput));
  }

  function changeTraits(key: string, value: {name:string, _id:string}) {
    props.traits[key]= value;
    props.setTraits(structuredClone(props.traits));
  }

  return (
    <div className="">
      <h2 className="text-2xl font-semibold  mb-2">Informações básicas</h2>
      <div className="border-b mb-5"></div>
      <TextInput
        onChange={e => changeAnimalInput("name", e.target.value)}
        state={props.animalInput['name']}
        errorMessage={props.animalInputError["description"] ?"Por favor, digite o nome do animal.":undefined}
        title="Nome"
        subElement={<MaxCharacters current={props.animalInput['name'].length} max={100} error={props.animalInputError["name"] ? true : false} />}
        placeholder="Max" />

      <TextArea
        onChange={e => changeAnimalInput("description", e.target.value)}
        state={props.animalInput['description']}
        title="Descrição"
        errorMessage={props.animalInputError["description"] ?"Por favor, digite a descrição do animal.":undefined}
        subElement={<MaxCharacters current={props.animalInput['name'].length} max={1500} error={props.animalInputError["description"] ? true : false} />}
        placeholder="Max é um animal muito brincalhão, gosta de ...." />

      <SelectInput
        array={props.species.list}
        state={props.selectedSpecies}
        setState={props.setSelectedSpecies}
        option={s => s.props.name}
        title="Espécie"
        checked={s => s?.props?._id === props.selectedSpecies?.props?._id}
        errorMessage={props.speciesError? "Por favor, selecione uma espécie.":undefined}
      />

      {props.id !== 'new' && props.animalStatus && <div className="mt-5">
      <SelectInput
        array={[ANIMAL_STATUS.CANCELED, ANIMAL_STATUS.PENDING, ANIMAL_STATUS.DONATED]}
        state={props.animalStatus}
        setState={props.setAnimalStatus}
        option={s => {
          if (s === ANIMAL_STATUS.DONATED) {
            return "Doado"
          } else if (s === ANIMAL_STATUS.PENDING) {
            return "Em adoção"
          } else {
            return "Cancelado";
          }
        }}
        
        title="Estado"
        checked={s => s === props.animalStatus}
        errorMessage={props.speciesError? "Por favor, selecione uma estado.":undefined}
      /></div>}
      {props.selectedSpecies && <>
      <h2 className="text-2xl font-semibold mt-10 mb-2">Características obrigatórias</h2>
      <div className="border-b mb-5"></div>
      <div className="flex flex-col gap-5">
        {props.selectedSpecies?.obrigatoryTraits.map(t => <SelectInput 
                                                            array={t.options}
                                                            state={props.traits[t._id]}
                                                            setState={(x) => changeTraits(t._id, x)}
                                                            option={(x) => x.name}
                                                            title={t.name} 
                                                            checked={s => s?._id === props.traits[t._id]?._id}
                                                            errorMessage={props.traitsError[t._id]?`A característica ${t.name} é obrigatória.`:undefined}
                                                            />)}
      </div>

      <h2 className="text-2xl font-semibold mt-10 mb-2">Características opicionais</h2>
      <div className="border-b mb-5"></div>
      <div className="flex flex-col gap-5">
        {props.selectedSpecies?.optionalTraits.map(t => <SelectInput 
                                                          array={t.options} 
                                                          state={props.traits[t._id]} 
                                                          setState={(x) => changeTraits(t._id, x)} 
                                                          option={(x) => x.name} 
                                                          title={t.name} 
                                                          checked={s => s?._id === props.traits[t._id]?._id}
                                                          optional={{
                                                            text: "Não informar"
                                                          }}
                                                        />
        )}
      </div>
      </>}

    </div>
  );
};
