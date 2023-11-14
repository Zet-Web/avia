import PassengerNumberPopup from 'features/PassengerNumberPopup/PassengerNumberPopup '

import cn from 'classnames'

import { Button, Input, MobileModal, Modal } from 'components'
import { Control, Controller } from 'react-hook-form'
import { getPassengersVariant } from 'shared/helpers/route/getPassengersVariant'
import { PassengerValue } from 'shared/types/passengerNumber'
import { useTranslation } from 'next-i18next'
import { FC, useState } from 'react'

import s from '../../searchTickets.module.scss'
import { useWindowDimensions } from 'shared/hooks/useWindowDimension'
import { laptop } from 'shared/constants/breakpoints'

interface PassengersInputProps {
  control: Control<any>
  defaultValue: PassengerValue
}

const PassengersInput: FC<PassengersInputProps> = ({
  control,
  defaultValue,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { t } = useTranslation(['common'])
  const { width } = useWindowDimensions()
  const isNotDesktop = width < laptop

  return (
    <div className={s.passengersInput}>
      <Controller
        name='passengers'
        // eslint-disable-next-line @typescript-eslint/naming-convention
        rules={{ required: true }}
        defaultValue={defaultValue}
        control={control}
        render={({ field: { onChange, value } }) => (
          <>
            <Input
              className={cn(s.input, s.inputPassengers)}
              placeholderClassName={s.placeholder}
              placeholder={
                t('common:searchTickets.passengersClass') ??
                'пассажиры и класс'
              }
              isReadOnly
              value={
                value
                  ? `${
                      value.adults + value.children + value.infants
                    } ${t(
                      `common:route.${getPassengersVariant(
                        value.adults + value.children + value.infants
                      )}`
                    )}, ${
                      value.business
                        ? t('common:route.category.business')
                        : t('common:route.category.economy')
                    }`
                  : ''
              }
              onClick={() => setIsOpen(true)}
            />
            {!isNotDesktop && (
              <PassengerNumberPopup
                className={s.passengersPopup}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                value={value}
                onChange={onChange}
              />
            )}

            {isNotDesktop && isOpen && (
              <MobileModal
                title='Пассажиры'
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
              >
                <div
                  style={{
                    height: '100%',
                    position: 'relative',
                    zIndex: '99999',
                  }}
                >
                  <PassengerNumberPopup
                    className={s.passengersPopup}
                    isOpen={isOpen}
                    onClose={() => setIsOpen(true)}
                    value={value}
                    onChange={onChange}
                  />

                  <Button
                    title='Применить'
                    className={s.applyBtn}
                    onClick={() => setIsOpen(false)}
                  />
                </div>
              </MobileModal>
            )}
          </>
        )}
      />
    </div>
  )
}

export default PassengersInput
