import { TextInput } from "./input/TextInput";
import { MaxCharacters } from "./input/MaxCharacters";
import { TextArea } from "./input/TextArea";
import { NumberInput } from "./input/NumberInput.";
import { AnimalInput, AnimalInputError } from "../../pages/partner/PartnerEditAnimal";

export interface PartnerEditAnimalFormProps {
  animalInput: AnimalInput,
  setAnimalInput: (x:AnimalInput) => void,
  animalInputError: AnimalInputError,
  formSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

export const PartnerEditAnimalForm = ({ animalInput, setAnimalInput, animalInputError, formSubmit }: PartnerEditAnimalFormProps) => {

  function changeAnimalInput<T extends keyof AnimalInput>(key: T, value: AnimalInput[T]) {
    animalInput[key] = value;
    setAnimalInput(structuredClone(animalInput));
  }

  return (
    <form onSubmit={formSubmit} className="flex-1">
      <h2 className="text-2xl font-semibold  mb-2">Informações básicas</h2>
      <div className="border-b mb-5"></div>
      <TextInput
        onChange={e => changeAnimalInput("name", e.target.value)}
        state={animalInput['name']}
        title="Nome"
        subElement={<MaxCharacters current={animalInput['name'].length} max={100} error={animalInputError["name"] ? true : false} />}
        placeholder="Max" />

      <TextArea
        onChange={e => changeAnimalInput("description", e.target.value)}
        state={animalInput['description']}
        title="Descrição"
        subElement={<MaxCharacters current={animalInput['name'].length} max={1500} error={animalInputError["name"] ? true : false} />}
        placeholder="Max é um animal muito brincalhão, gosta de ...." />
      <div className="flex w-full   justify-between">

        <NumberInput
          onChange={e => changeAnimalInput("age", animalInput['age'] % 12 + Number(e.target.value) * 12)}
          state={Math.floor(animalInput['age'] / 12)}
          title="Idade"
          subElement={<span className="text-gray-400">anos</span>} />
        <span className="flex-1 align-top flex items-center justify-center">e</span>
        <div className="flex flex-1 items-end">
          <NumberInput
            onChange={e => changeAnimalInput("age", Math.floor(animalInput['age'] / 12) * 12 + Number(e.target.value))}
            state={animalInput['age'] % 12}
            title=""
            subElement={<span className="text-gray-400">meses</span>} />
        </div>
      </div>


    </form>
  );
};
