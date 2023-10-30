export interface MaxCharactersProps {
  current: number,
  max: number,
  error: boolean
}

export const MaxCharacters = (props: MaxCharactersProps) => {
  
  return(<span className={`text-sm ${(props.error || props.current > props.max)?"text-error":"text-gray-400"}`}>{props.current}/{props.max}</span>)
}