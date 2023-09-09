import React from 'react'
import Link from './Link'
import OpenNewIcon from '../Svg/Icons/OpenNew'

const LinkExternal = ({ children, ...props }) => {
  return (
    <Link external {...props}>
      {children}
      <OpenNewIcon color='white' ml='4px' />
    </Link>
  )
}

export default LinkExternal
