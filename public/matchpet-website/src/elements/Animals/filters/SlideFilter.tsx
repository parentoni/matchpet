import { RangeSlider, RangeSliderFilledTrack, RangeSliderThumb, RangeSliderTrack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { FILTER_MODES } from '.'


export interface SlideFilterProps {
  filters: Record<string, {mode: FILTER_MODES, comparation_value:any}[]>,
  setFilters: (x:Record<string, {mode: FILTER_MODES, comparation_value:any}[]>) => void,
  min:number,
  setMin: (x: number) => void,
  max:number,
  setMax: (x: number) => void
}
export function SlideFilter (props: SlideFilterProps) {



  useEffect(() => {
    if (props.min !== 0 || props.max !== 120) {
      props.filters['age'] = [{mode: FILTER_MODES.GREATHER_THAN_EQUAL, comparation_value: props.min}, {mode: FILTER_MODES.LESS_THAN_EQUAL, comparation_value: props.max}]
      props.setFilters(structuredClone(props.filters))
    }
  }, [props.min, props.max])

  return (
    <div className='flex flex-col gap-3 border-b pb-5 w-full'>
      <h2 className=' font-semibold'>Idade</h2>
      <RangeSlider
        aria-label={['min', 'max']}
        step={1}
        defaultValue={[props.min,props.max]}
        onChangeEnd={(val) => {props.setMin(val[0]);props.setMax(val[1])}}
        max={120}
        
      >
        <RangeSliderTrack >
          <RangeSliderFilledTrack backgroundColor={'#FA8128'}/>
        </RangeSliderTrack> 
        <RangeSliderThumb index={0} boxSize={6}  backgroundColor={'#FA8128'}/>
        <RangeSliderThumb index={1} boxSize={6}  backgroundColor={'#FA8128'}/>

      </RangeSlider>
      <div className='flex w-full gap-5'>
        <div className='flex flex-1 flex-col gap-2'>
          Idade mínima 
          <div className='w-full border h-8 flex rounded-md brute-border items-center px-2 text-sm'>
            <span className='font-semibold'> {Math.floor(props.min  / 12)}</span>&nbsp;anos e&nbsp; <span className='font-semibold'>{Math.round(props.min % 12)}</span>&nbsp;meses
          </div>
        </div>
        <div className='flex flex-col gap-2 flex-1'  >
          Idade máxima 
          <div className='w-full border h-8 flex rounded-md brute-border items-center px-2 text-sm'>
            <span className='font-semibold'> {Math.floor(props.max  / 12)}</span>&nbsp;anos e&nbsp; <span className='font-semibold'>{Math.round(props.max % 12)}</span>&nbsp;meses
          </div>
        </div>
      </div>
    </div>
  )
}