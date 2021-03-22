import React from 'react'
import s from './ActionButton.module.css'
import cn from 'classnames'

export interface Props {
  tooltip?: string
  className?: string
}
const ActionButton: React.FC<Props> = ({ tooltip, className, children }) => (
  <div className={cn(className, s.root)} data-testid="ActionButton">
    {children}
    {tooltip && (
      <div className={s.tooltip}>
        <div>{tooltip}</div>
      </div>
    )}
  </div>
)
export default ActionButton
