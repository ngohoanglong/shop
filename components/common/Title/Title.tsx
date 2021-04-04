import cn from 'classnames'
import React from 'react'
import s from './Title.module.css'

export interface Props {
  small?: boolean
  subTitle?: any
  center?: boolean
}
const Title: React.FC<Props> = ({ small, subTitle, center, children }) => (
  <div
    className={cn(
      s.root,
      small && s.small,
      center && 'flex flex-col items-center'
    )}
    data-testid="Title"
  >
    {subTitle && <h4 className={s.subTitle}>{subTitle}</h4>}
    <h2 className={s.title}>{children}</h2>
  </div>
)
export default Title
