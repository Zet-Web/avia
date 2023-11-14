import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useAppSelector } from 'redux/hooks'

import Avatar from 'features/Avatar/Avatar'

import EditProfileIcon from '/public/assets/images/icons/profilePage/EditProfileIcon.svg'

import s from './profileHeaderSection.module.scss'
import { selectAuth } from '../../redux/slices/authSlice/authSlice'

const ProfileHeaderSection = () => {
  const { t } = useTranslation('profilePage')
  const router = useRouter()

  const profile = useAppSelector(selectAuth)

  const handleTabChange = () => {
    router.push(
      {
        query: { tab: 'editProfile' },
      },
      undefined,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      { shallow: true }
    )
  }

  return (
    <div className={s.container}>
      <div className={s.logo}>
        <Avatar user={profile.user} size={'big'} bg={'white'} />
      </div>

      <div className={s.content}>
        <p>{t('greetings')},</p>
        <div className={s.info}>
          <h1>
            {profile.user?.first_name ?? 'User Name'}{' '}
            {profile.user?.last_name}
          </h1>

          <EditProfileIcon
            className={s.editIcon}
            onClick={handleTabChange}
          />
        </div>
      </div>
    </div>
  )
}

export default ProfileHeaderSection
