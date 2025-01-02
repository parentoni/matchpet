export interface MaxCharactersProps {
  current: number,
  max: number,
  error: boolean
}

export const MaxCharacters = (props: MaxCharactersProps) => {
  
  return(<span className={`text-xs ${(props.error || props.current > props.max)?"text-error":"text-primary"}`}>{props.current}/{props.max}</span>)
}