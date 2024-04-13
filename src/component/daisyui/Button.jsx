import React from 'react'
import { cn } from '../../libs/utils'

export default function Button({children,className, onClick,disabled}) {
  return (
    <button disabled={disabled} onClick={onClick} className={cn("btn",className)}>{children}</button>
  )
}
