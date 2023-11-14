import { FC } from 'react'

import LogoBlue from '/public/assets/images/LogoBlue.svg'
import LogoWhite from '/public/assets/images/LogoWhite.svg'
import LogoShortenBlue from '/public/assets/images/LogoShortenBlue.svg'
import LogoShortenWhite from '/public/assets/images/LogoShortenWhite.svg'

interface LogoProps {
  variant: 'primary' | 'secondary'
  isShortened?: boolean
}

const Logo: FC<LogoProps> = ({
  variant = 'primary',
  isShortened = false,
}) => {
  switch (variant) {
    case 'primary':
      return isShortened ? <LogoShortenBlue /> : <LogoBlue />
    case 'secondary':
      return isShortened ? <LogoShortenWhite /> : <LogoWhite />
  }
}
export default Logo
