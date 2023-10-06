export interface Option {
  name: string,
  value: any
}

export function AnimalSimpleFilter ({title, options, relatedTrait}:{title:string, options: Option[], relatedTrait:string}) {
  

  return (
    <div className="flex-col flex gap-3">
      <h3 className="font-semibold">{title}</h3>
      <div className="flex gap-3 overflow-x-scroll overflow-y-hidden no-scrollbar ">
            <button className="px-4 py-1 brute-border rounded-full flex items-center justify-center  whitespace-nowrap">
              Tanto faz
            </button>
        {options.map((option, index) => {
          return(
            <button className="px-4 py-1 brute-border rounded-full flex justify-center items-center">
              {option.name}
            </button>
          )
        })}
      </div>
    </div>
  )
}