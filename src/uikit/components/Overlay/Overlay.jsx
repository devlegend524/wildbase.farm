import styled from 'styled-components'

const Overlay = styled.div.attrs({ role: 'presentation' })`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: #000000ad;
  transition: opacity 0.4s;
  opacity: 0.6;
  z-index: 9999;
  pointer-events: 'initial';
`

Overlay.defaultProps = {
  zIndex: 10,
}

export default Overlay
