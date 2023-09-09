import styled from 'styled-components'
import Button from './Button'

const IconButton = styled(Button)`
  padding: 0;
  width: ${({ scale }) => (scale === 'sm' ? '32px' : '48px')};
`

export default IconButton
