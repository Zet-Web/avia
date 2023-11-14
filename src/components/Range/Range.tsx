import React, { FC } from 'react'

import ReactSlider from 'react-slider'

import s from './range.module.scss'

interface RangeProps {
  onChange: (value: [number, number]) => void
  min?: number
  max?: number
  step?: number
  value?: number[] | (() => number[])
}

const Range: FC<RangeProps> = ({
  min = 0,
  max = 24,
  step = 1,
  value,
  onChange,
}) => {
  return (
    <ReactSlider
      defaultValue={[min, max]}
      className={s.slider}
      thumbClassName={s.thumb}
      trackClassName={s.track}
      step={step}
      min={min}
      max={max}
      value={typeof value === 'function' ? value() : value}
      onChange={([min, max], index) => onChange([min, max])}
    />
  )
}

export default Range
