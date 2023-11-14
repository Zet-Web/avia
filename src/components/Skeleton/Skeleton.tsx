import React from 'react'
import NativeSkeleton, { SkeletonTheme } from 'react-loading-skeleton'

import 'react-loading-skeleton/dist/skeleton.css'

interface SkeletonProps {
  width?: string | number
  height?: string | number
  radius?: string | number
  className?: string | undefined
  theme?: 'grey' | 'blue'
}

const Skeleton: React.FC<SkeletonProps> = ({
  width,
  height,
  radius,
  className,
  theme = 'grey',
}) => {
  const style = {
    width,
    height,
    borderRadius: radius,
  }

  return (
    <SkeletonTheme
      baseColor={theme === 'blue' ? '#658ef8' : '#eeeeee'}
      highlightColor={theme === 'blue' ? '#819DF5FF' : '#fbfbfb'}
    >
      <NativeSkeleton style={style} className={className} />
    </SkeletonTheme>
  )
}

export default Skeleton
