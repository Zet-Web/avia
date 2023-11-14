import { useTranslation } from 'react-i18next'
import s from './favoritesProfileSection.module.scss'

const FavoritesProfileSection = () => {
  const { t } = useTranslation(['profilePage', 'common'])
  return (
    <>
      <div className={s.header}>
        <h1 className={s.title}>Избранное</h1>
      </div>
      <div className={s.empty}>
        <h1>{t('contentIsEmpty')}</h1>
      </div>
    </>
  )
}

export default FavoritesProfileSection
