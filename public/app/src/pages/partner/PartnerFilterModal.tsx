import React, { ElementType, Fragment, useContext, useEffect } from "react";
import { ANIMAL_STATUS, PrintableAnimalStatus } from "../../utils/services/dtos/AnimalDTO";
import { AuthContext } from "../../utils/context/AuthContext";
import { FILTER_MODES } from "../../elements/Animals/filters";
import { BarChart2, Cat, RefreshCcw } from "lucide-react";
import { FiltersContext } from "../../utils/context/FiltersContext";
import { Dialog, RadioGroup, Transition } from "@headlessui/react";
import { SpeciesContext } from "../../utils/context/SpeciesContext";
import { CategoriesContext } from "../../utils/context/CategoriesContext";
import { Specie } from "../../utils/domain/Specie";
import { SEX } from "../../utils/domain/Animal";


export interface PartnerFilterModalProps {
  isOpen: boolean,
  setIsOpen: (x: boolean) => void
}

export const PartnerFilterModal = (props: PartnerFilterModalProps) => {

  const { species } = useContext(SpeciesContext);
  const { useCreateVisualFilter, useCreateVisualCounter, useCountVisual, useListenForQuerySearchParams,  loading, dispatch } = useContext(FiltersContext);
  const { categories } = useContext(CategoriesContext);
  const { user } = useContext(AuthContext);

  let [visualFilters, setVisualFilters] = useCreateVisualFilter();
  const [counter, setCounter] = useCreateVisualCounter();

  const closeModal = () => {
    props.setIsOpen(false);
  };

  useEffect(() => {
    if (user) {
      visualFilters['donator_id'] = [{ mode: FILTER_MODES.EQUAL, comparation_value: user._id }];
      setVisualFilters(structuredClone(visualFilters));
    }
  }, [user]);

  const cleanVisualFilters = (specie_id?: string) => {
    if (user) {
      visualFilters = { "donator_id": [{ mode: FILTER_MODES.EQUAL, comparation_value: user._id }] };
      if (specie_id) {
        visualFilters['specie_id'] = [{ mode: FILTER_MODES.EQUAL, comparation_value: specie_id }];
      }
      setVisualFilters(structuredClone(visualFilters));
    }
  };

  const changeVisualFilters = (key: string, value: string) => {
    visualFilters[key] = [{ mode: FILTER_MODES.EQUAL, comparation_value: value }];
    setVisualFilters(structuredClone(visualFilters));
  };


  /**
   * 
   * @param date
   * todo: check this after
  */

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const changeVisualFiltersRenew = (canBeRenewed:boolean) => {
    if (canBeRenewed) {
      // visualFilters['renew'] = [{ mode: FILTER_MODES.EQUAL, comparation_value: 'true' }]; | Such a good implementation, check this later
      visualFilters['last_modified_at'] = [{ mode: FILTER_MODES.LESS_THAN_EQUAL, comparation_value: sevenDaysAgo.toISOString()}];
    } else {
      visualFilters['last_modified_at'] = [{ mode: FILTER_MODES.GREATHER_THAN, comparation_value: sevenDaysAgo.toISOString()}]; 
    }

    setVisualFilters(structuredClone(visualFilters));
    console.log(visualFilters)
  }

  const deleteFromVisualFilters = (key: string) => {
    delete visualFilters[key];
    setVisualFilters(structuredClone(visualFilters));
  };

  const getFromVisualFilters = (key: string) => {
    return visualFilters[key] ? visualFilters[key][0].comparation_value : null;
  };




  useListenForQuerySearchParams()
  //clean filters
  useCountVisual(visualFilters, setCounter, []);



  return (
    <Transition appear show={props.isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25 z-40" />
        </Transition.Child>
        <div className="fixed inset-0 w-full overflow-y-auto z-50">
          <div className="flex min-h-full w-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full flex flex-col h-[35rem] max-w-xl transform overflow-hidden rounded-2xl bg-white shadow-xl transition-all">
                <div className="flex-1 p-4 flex flex-col gap-4 overflow-y-auto w-full">
                  <FilterRadioGroup 
                    icon={Cat} 
                    setSelected={(x) => { x === null ? deleteFromVisualFilters('specie_id') : changeVisualFilters('specie_id', x); cleanVisualFilters(x); }} 
                    label="Espécie" 
                    options={species.map(a => a._id)} 
                    selected={getFromVisualFilters('specie_id')} 
                    print={option => species.find(a => a._id === option)?.name || "Qualquer"} />
                  

                  <FilterRadioGroup 
                    icon={BarChart2} 
                    setSelected={(x) => x === null ? deleteFromVisualFilters('status') : changeVisualFilters('status', x)} 
                    label="Estado" 
                    options={Object.keys(ANIMAL_STATUS)} 
                    selected={getFromVisualFilters('status')} 
                    print={option => PrintableAnimalStatus[option as ANIMAL_STATUS] || "Qualquer"} />

                  <FilterRadioGroup 
                    icon={Cat}
                    setSelected={(x) => { x === null ? deleteFromVisualFilters('sex') : changeVisualFilters('sex', x); }}
                    label="Sexo" 
                    options={[SEX.MALE, SEX.FEMALE]} 
                    selected={getFromVisualFilters('sex')}
                    print={option => option === SEX.FEMALE? "Fêmea": option === SEX.MALE? "Macho":"Qualquer"} />
                  
                  <FilterRadioGroup icon={RefreshCcw} setSelected={(x) => x === null ? deleteFromVisualFilters('last_modified_at') : changeVisualFiltersRenew(x)} label="Modificado em mais de 7 dias (Pode ser renovado)" options={[true, false]} selected={visualFilters['last_modified_at']?visualFilters['last_modified_at'][0].mode === FILTER_MODES.LESS_THAN_EQUAL?true:false:null} print={option => option? "Sim": "Não"} />
                  {getFromVisualFilters('specie_id') !== null ? categories.map((category, cIndex) => {
                    const selectedSpecie = species.find(a => a._id === getFromVisualFilters('specie_id'));
                    if (selectedSpecie) {
                      const domainSpecie = Specie.create(selectedSpecie);
                      return domainSpecie.getTraitsThatMatchCategory(category._id).map((trait, tIndex) => {
                        return <FilterRadioGroup key={cIndex * 10 + tIndex} icon={Cat} setSelected={(x) => x === null ? deleteFromVisualFilters(`trait_${trait._id}`) : changeVisualFilters(`trait_${trait._id}`, x)} label={trait.name} options={trait.options.map(a => a._id)} selected={getFromVisualFilters(`trait_${trait._id}`)} print={option => trait.options.find(a => a._id === option)?.name || 'Qualquer'} />;
                      });
                    }

                    return null;
                  }) : ""}
                </div>
                <div className="p-4 border-t flex gap-4 items-center justify-end">
                  <button className="flex items-center justify-center bg-neutral-50 border-neutral-200 border h-8 px-2 rounded text-sm hover:bg-black hover:bg-opacity-5" onClick={() => cleanVisualFilters()}>
                    Limpar
                  </button>
                  <button className="flex items-center justify-center h-8 px-2 rounded text-sm bg-primary text-white hover:bg-primary hover:bg-opacity-80 hover:border border-primary  border" onClick={() => { dispatch(visualFilters, [], false); closeModal(); }}>
                    Mostrar {loading ? <span className="loading loading-spinner loading-sm"></span> : counter} resultados
                  </button>
                </div>
              </Dialog.Panel>

            </Transition.Child>
          </div>
        </div>
      </Dialog>

    </Transition>
  );
};

export interface FilterRadioGroupProps<T> {
  label: string,
  selected: T,
  options: T[],
  print: (option:T) => string,
  setSelected: (x:T) => void,
  icon: React.ElementType
}

export function FilterRadioGroup <T>(props: FilterRadioGroupProps<T | null>) {

  return (
  <RadioGroup value={props.selected} onChange={props.setSelected} className={'w-full'}>
    <div className="flex gap-2 items-center">
      <props.icon className={'w-4 h-4'}/>
      <RadioGroup.Label className={"text-sm"}>{props.label}</RadioGroup.Label>
    </div>
    <div className="flex gap-4 pt-2 w-full overflow-x-auto">
      <RadioGroup.Option value={null} className={({checked}) => checked?"flex flex-shrink-0 flex-grow-0 items-center text-primary justify-center h-8 px-2 rounded text-sm bg-primary  bg-opacity-10  border-primary border border-opacity-10":"flex items-center justify-center bg-neutral-50 border-neutral-200 border h-8 px-2 rounded text-sm cursor-pointer hover:bg-black hover:bg-opacity-5"}>
        {props.print(null)}
      </RadioGroup.Option>
      {props.options.map((option, index) => 
        <RadioGroup.Option key={index} value={option} className={({checked}) => checked?"flex flex-shrink-0 flex-grow-0  whitespace-nowrap items-center text-primary justify-center h-8 px-2 rounded text-sm bg-primary  bg-opacity-10  border-primary border border-opacity-10":" flex flex-shrink-0 flex-grow-0  whitespace-nowrap  items-center justify-center bg-neutral-50 border-neutral-200 cursor-pointer border h-8 px-2 rounded text-sm hover:bg-black hover:bg-opacity-5"}>
          {props.print(option)}
        </RadioGroup.Option>
      )}
    </div>
  </RadioGroup>)
}

export function CreateCategorySVG (link:string): ElementType {
  return (
    <img alt="Ícone" src={link}></img> as unknown as ElementType
  )
}
