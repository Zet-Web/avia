import { FC, FormEvent } from 'react'
import { useTranslation } from 'next-i18next'
import { Button, Modal, Input } from 'components'

import s from './blogSearchModal.module.scss'

interface BlogSearchModalProps {
  isOpen: boolean
  value: string
  onClose: () => void
  onChange: (value: string) => void
  onSearch: () => void
}

const BlogSearchModal: FC<BlogSearchModalProps> = ({
  isOpen,
  value,
  onClose,
  onChange,
  onSearch,
}) => {
  const { t } = useTranslation(['common', 'blogSearchModal'])
  const handleClose = (): void => {
    onClose()
  }

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSearch()
  }

  return (
    <>
      <Modal
        contentClassName={s.body}
        onClose={handleClose}
        isOpen={isOpen}
        isClosable={true}
        className={s.blogSearchModal}
      >
        <div className={s.container}>
          <div className={s.content}>
            <h1>{t('blogSearchModal:title')}</h1>
            <p>{t('blogSearchModal:text')}</p>
          </div>
          <form onSubmit={handleSearch} className={s.search}>
            <Input
              hasAutoFocus={true}
              value={value}
              onChange={onChange}
              className={s.input}
            />
            <Button
              className={s.searchButton}
              title={t('common:words.search')}
              onClick={() => {}}
              type='submit'
            />
          </form>
        </div>
      </Modal>
    </>
  )
}

export default BlogSearchModal
