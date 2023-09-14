import React from 'react'
import styled from 'styled-components'
import Text from '../Text/Text'
import getExternalLinkProps from '../../util/getExternalLinkProps'

const StyledLink = styled(Text)`
  display: flex;
  align-items: center;
  width: fit-content;
  color: white;
  &:hover {
    text-decoration: underline;
  }
`

const Link = ({ external, color = 'primary', ...props }) => {
  const internalProps = external ? getExternalLinkProps() : {}
  return (
    <StyledLink
      as='a'
      bold='true'
      {...internalProps}
      {...props}
      color={color}
    />
  )
}

export default Link
