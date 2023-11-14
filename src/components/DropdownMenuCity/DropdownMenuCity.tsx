import { type ReactNode, useRef, useState } from 'react'
import { useTranslation } from 'next-i18next'
import cn from 'classnames'

import { Text } from '../index'

import { useClickOutside } from 'shared/hooks/useClickOutside'

import type { Vehicle } from 'shared/types/cities'
import { Directions } from 'shared/types/geo'
import type {
  DropdownItemProps,
  DropdownMenuCityProps,
  DropdownMenuItemProps,
} from './types'
import TrainIcon from '/public/assets/images/icons/Train.svg'
import BusIcon from '/public/assets/images/icons/Bus.svg'
import PlaneIcon from '/public/assets/images/icons/plane-departure.svg'

import s from './dropdownMenuCity.module.scss'

const DropdownMenuItem = ({
  title,
  abbreviation,
  icon,
  onChange,
  onClose,
}: DropdownMenuItemProps) => {
  const handleClick = (airport: Directions) => {
    onChange(airport)
    onClose()
  }
  return (
    <li
      className={s.dropDownMenuItem}
      onClick={() => handleClick({ abbreviation, title })}
    >
      <div className={s.iconAndText}>
        {icon}
        <Text className={s.transportText}>{title}</Text>
      </div>
      {abbreviation ? (
        <Text className={s.cityAbbreviation}>{abbreviation}</Text>
      ) : null}
    </li>
  )
}

const DropdownItem = (props: DropdownItemProps) => {
  const {
    isActive,
    onClick,
    onChange,
    pointDeparture,
    transports,
    title,
    abbreviation,
    icon,
    onClose,
  } = props
  const currentRef = useRef<HTMLUListElement | null>(null)
  const { t } = useTranslation(['common'])
  const [isCityActive, setIsCityActive] = useState<boolean>(false)
  const handleClick = (city: Directions) => {
    onClick()
    onChange(city)
    onClose()
    // isCityActive ? onChange(city) : null
    // isCityActive ? onClose() : null
    // setActiveCity(!isCityActive)
  }
  const clickOutside = () => {
    setIsCityActive(false)
  }
  const overlayRef = useRef<HTMLDivElement>(null)

  useClickOutside(overlayRef, clickOutside)
  return (
    <div className={s.dropdown} ref={overlayRef}>
      <button
        type='button'
        className={cn(s.cityButton, { [s.active]: isCityActive })}
        onClick={() => handleClick({ title, abbreviation })}
      >
        <div className={s.textButtonContainer}>
          <Text className={s.pointDepartureText}>
            {pointDeparture}
          </Text>
          {abbreviation ? (
            <Text className={s.cityAbbreviation}>{abbreviation}</Text>
          ) : null}
        </div>
      </button>
      <ul ref={currentRef} className={s.dropDownMenu}>
        {transports ? (
          transports.map(transport =>
            isActive ? (
              <DropdownMenuItem
                key={transport.id}
                icon={icon}
                title={transport.title}
                abbreviation={transport.code}
                onChange={onChange}
                onClose={onClose}
              />
            ) : null
          )
        ) : isActive ? (
          <Text className={s.noAirports}>
            {t('common:cityNoTransport:text')}
          </Text>
        ) : null}
      </ul>
    </div>
  )
}

const getIcon = (type: Vehicle): ReactNode => {
  switch (type) {
    case 'bus':
      return <BusIcon />
    case 'plane':
      return <PlaneIcon />
    case 'train':
      return <TrainIcon />
  }
}

const DropdownMenuCity = ({
  vehicle,
  options,
  onChange,
  onClose,
}: DropdownMenuCityProps) => {
  const [selected, setSelected] = useState<number>(0)
  const handleClick = (selected: number) => () => {
    setSelected(selected)
  }
  const icon = getIcon(vehicle)

  return (
    <div className={s.root}>
      {options.map((city, i) => (
        <DropdownItem
          key={i}
          icon={icon}
          title={city.title}
          abbreviation={city.code}
          onClick={handleClick(i)}
          pointDeparture={`${city.title}, ${city.country_title}`}
          transports={city.airports}
          isActive={i === selected}
          onChange={onChange}
          onClose={onClose}
        />
      ))}
    </div>
  )
}

export default DropdownMenuCity
