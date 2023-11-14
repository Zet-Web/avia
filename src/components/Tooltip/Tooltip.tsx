import { FC, ReactNode, useRef, useState } from 'react'

import {
  AlignedPlacement,
  inline,
  flip,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useHover,
  useInteractions,
  useRole,
} from '@floating-ui/react'

import cn from 'classnames'

import s from './tooltip.module.scss'

interface TooltipProps {
  title: ReactNode
  children: ReactNode
  position?: AlignedPlacement
  trigger: 'click' | 'focus' | 'hover'
  className?: string
}

const Tooltip: FC<TooltipProps> = ({
  title,
  children,
  position,
  trigger,
  className,
}) => {
  const arrowRef = useRef<HTMLDivElement>(null)

  const [isOpen, setIsOpen] = useState(false)
  const { x, y, strategy, refs, context, placement } = useFloating({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    open: isOpen,
    placement: position,
    onOpenChange: setIsOpen,
    middleware: [shift(), flip(), inline()],
  })

  const dismiss = useDismiss(context)
  const role = useRole(context, { role: 'tooltip' })

  const hover = useHover(context, {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    enabled: trigger === 'hover',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    move: false,
  })
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const click = useClick(context, { enabled: trigger === 'click' })

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    click,
    dismiss,
    role,
  ])

  return (
    <>
      <div ref={refs.setReference} {...getReferenceProps()}>
        {children}
      </div>
      {isOpen && (
        <div
          ref={refs.setFloating}
          style={{
            position: strategy,
            top: y ?? '',
            left: x ?? '',
          }}
          data-position={placement}
          {...getFloatingProps()}
          className={cn(s.tooltip, className)}
        >
          {title}

          <div
            className={s.tooltipArrow}
            data-position={placement}
            ref={arrowRef}
          />
        </div>
      )}
    </>
  )
}

export default Tooltip
