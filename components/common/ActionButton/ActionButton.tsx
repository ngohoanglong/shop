import cn from 'classnames'
import React from 'react'
import s from './ActionButton.module.css'

export interface Props {
  tooltip?: string
  className?: string
  size?: 'default' | 'small' | 'large'
  shape?: 'round' | 'circle'
}
const ActionButton: React.FC<Props> = ({
  tooltip,
  className,
  size = 'default',
  shape = 'circle',
  children,
}) => (
  <div
    className={cn(s.root, s[size], s[shape], className)}
    data-testid="ActionButton"
  >
    {children}
    {tooltip && (
      <div className={s.tooltip}>
        <div>{tooltip}</div>
      </div>
    )}
  </div>
)
export default ActionButton
