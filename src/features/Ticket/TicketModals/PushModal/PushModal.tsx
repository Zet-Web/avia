import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Modal } from 'components'

import { getImageUrlWithBaseDomain } from 'shared/helpers/getImageUrlWithBaseDomain'

import Loading from '/public/assets/images/icons/loading.svg'

import s from './pushModal.module.scss'
import { useAppSelector } from 'redux/hooks'
import { useRouter } from 'next/router'
import { Method } from 'shared/types/ticket'
import { selectSelectedSeller } from '../../../../redux/slices/ticketSlice/ticketSlice'

interface PushModalProps {
  isOpen: boolean
  onClose: () => void
  text: string
  logo: string
  error: string | null
}

const PushModal: FC = () => {
  const { t } = useTranslation(['common', 'ticket'])
  const selectedSeller = useAppSelector(selectSelectedSeller)
  const [error, setError] = useState<string | null>(null)
  const { query } = useRouter()

  useEffect(() => {
    if (!query.to) return
    setTimeout(() => {
      if (selectedSeller?.method === Method.GET) {
        window?.open(selectedSeller?.url, '_self', 'noopner')
        return
      }

      if (
        selectedSeller?.method === Method.POST &&
        selectedSeller.params
      ) {
        const form = document.createElement('form')
        form.action = selectedSeller.url
        form.method = Method.POST
        form.innerHTML = Object.keys(selectedSeller.params)
          .map(
            p =>
              `<input name=${p} value=${selectedSeller.params![p]} />`
          )
          .join('')
        form.className = s.form
        document.body.appendChild(form)
        form.submit()
        return
      }
      setError(t('ticket:sellerLinkError'))
    }, 3000)
  }, [query])

  return (
    <Modal
      className={s.overlay}
      onClose={() => null}
      isOpen={true}
      isClosable={false}
    >
      <div className={s.container}>
        <div className={s.loadingIcon}>
          <Loading />
        </div>

        <div className={s.title}>
          {error ? (
            <span>{error}</span>
          ) : (
            <>
              {t('ticket:ticketModalTitle')}{' '}
              <span>{selectedSeller?.title}</span>
            </>
          )}
        </div>

        <div className={s.logo}>
          {selectedSeller?.logo_url ? (
            // @ts-ignore
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={
                getImageUrlWithBaseDomain(
                  selectedSeller?.logo_url
                ) as string
              }
              alt='seller logo'
            />
          ) : null}
        </div>
      </div>
    </Modal>
  )
}

export default PushModal
