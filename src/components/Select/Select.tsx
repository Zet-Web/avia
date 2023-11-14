import { ListSelect } from 'pages/BlogsPage/mock'
import { FC } from 'react'

import NativeSelect, {
  IndicatorSeparatorProps,
  components,
  PlaceholderProps,
  PropsValue,
  MultiValue,
} from 'react-select'

import s from './select.module.scss'

type SelectProps = {
  options: ListSelect[]
  placeholder: string
  value: PropsValue<string>
  setValue: (option: ListSelect) => void
}

const indicatorSeparatorStyle = {
  display: 'none',
}

const IndicatorSeparator = ({
  innerProps,
}: IndicatorSeparatorProps<ListSelect, true>) => {
  return <span style={indicatorSeparatorStyle} {...innerProps} />
}

const Placeholder = (props: PlaceholderProps<ListSelect>) => {
  return <components.Placeholder {...props} />
}

const Select: FC<SelectProps> = ({
  options,
  value,
  setValue,
  placeholder,
}) => {
  return (
    <NativeSelect
      options={options}
      value={value as PropsValue<ListSelect>}
      onChange={(option: any) => setValue(option!.label)}
      components={{ Placeholder, IndicatorSeparator }}
      className={s.select}
      placeholder={placeholder}
      styles={{
        placeholder: base => ({
          ...base,
          color: '#a1a1a1',
        }),
        option: base => ({
          ...base,
          borderBottom: '1px solid #ccc',
          height: '100%',
          ':last-child': {
            borderBottom: 'none',
          },
        }),
        menuList: base => ({
          ...base,
          paddingBottom: 0,
          paddingTop: 0,
          height: '100%',
          maxHeight: '405px',
          boxShadow: '0px 0px 15px 0px rgba(24, 50, 115, 0.10)',
          '::-webkit-scrollbar': {
            width: 0,
            height: 0,
          },
        }),
      }}
    />
  )
}

export default Select
