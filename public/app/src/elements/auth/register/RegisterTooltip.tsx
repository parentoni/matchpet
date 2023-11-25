
export interface RegisterTooltipProps {
  interior: JSX.Element,
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}
export const RegisterTooltip = (props: RegisterTooltipProps) => {
  return (
    <button type="button" className={'h-10 absolute top-1 right-1 aspect-square flex rounded-md bg-primary items-center justify-center'} onClick={props.onClick}>
      {props.interior}
    </button>
  )
}