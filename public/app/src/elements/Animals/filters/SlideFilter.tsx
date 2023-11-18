import { RangeSlider, RangeSliderFilledTrack, RangeSliderThumb, RangeSliderTrack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { FILTER_MODES } from '.'


export interface SlideFilterProps {
  filters: Record<string, {mode: FILTER_MODES, comparation_value:any}[]>,
  setFilters: (x:Record<string, {mode: FILTER_MODES, comparation_value:any}[]>) => void,
}
export function SlideFilter (props: SlideFilterProps) {


  const [min, setMin] = useState(0)
  const [max, setMax] = useState(120)

  useEffect(() => {

    props.filters['age'] = [{mode: FILTER_MODES.GREATHER_THAN_EQUAL, comparation_value: min}, {mode: FILTER_MODES.LESS_THAN_EQUAL, comparation_value: max}]
    props.setFilters(structuredClone(props.filters))
  }, [min, max])

  return (
    <div className='flex flex-col gap-3 border-b pb-5 w-full'>
      <h2 className=' font-semibold'>Idade</h2>
      <RangeSlider
        aria-label={['min', 'max']}
        step={1}
        defaultValue={[0,120]}
        onChangeEnd={(val) => {setMin(val[0]);setMax(val[1])}}
        max={120}
        
      >
        <RangeSliderTrack>
          <RangeSliderFilledTrack backgroundColor={'#FFA1F5'}/>
        </RangeSliderTrack> 
        <RangeSliderThumb index={0} boxSize={6} backgroundColor={'#FFA1F5'}/>
        <RangeSliderThumb index={1} boxSize={6} backgroundColor={'#FFA1F5'}/>

      </RangeSlider>
      <div className='flex w-full gap-5'>
        <div className='flex flex-1 flex-col gap-2'>
          Idade mínima 
          <div className='w-full border h-8 flex rounded-md brute-border items-center px-2 text-sm'>
            <span className='font-semibold'> {Math.floor(min  / 12)}</span>&nbsp;anos e&nbsp; <span className='font-semibold'>{Math.round(min % 12)}</span>&nbsp;meses
          </div>
        </div>
        <div className='flex flex-col gap-2 flex-1'  >
          Idade máxima 
          <div className='w-full border h-8 flex rounded-md brute-border items-center px-2 text-sm'>
            <span className='font-semibold'> {Math.floor(max  / 12)}</span>&nbsp;anos e&nbsp; <span className='font-semibold'>{Math.round(max % 12)}</span>&nbsp;meses
          </div>
        </div>
      </div>
    </div>
  )
}