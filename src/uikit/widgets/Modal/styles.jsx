import React from 'react'
import styled from 'styled-components'
import Flex from '../../components/Box/Flex'
import { Box } from '../../components/Box'
import { ArrowBackIcon, CloseIcon } from '../../components/Svg'
import { IconButton } from '../../components/Button'

export const ModalHeader = styled.div`
  align-items: center;
  background: transparent;
  border-bottom: 1px solid #c3c3c3;
  display: flex;
  padding: 12px 24px;
  background-color: #ffffff;
`

export const ModalTitle = styled(Flex)`
  align-items: center;
  flex: 1;
`

export const ModalBody = styled(Flex)`
  flex-direction: column;
  max-height: 90vh;
  overflow-y: auto;
  background-color: #ffffff;
`

export const ModalCloseButton = ({ onDismiss }) => {
  return (
    <IconButton
      variant='text'
      onClick={onDismiss}
      aria-label='Close the dialog'
    >
      <CloseIcon color='white' width='24px' />
    </IconButton>
  )
}

export const ModalBackButton = ({ onBack }) => {
  return (
    <IconButton variant='text' onClick={onBack} area-label='go back' mr='8px'>
      <ArrowBackIcon color='primary' />
    </IconButton>
  )
}

export const ModalContainer = styled(Box)`
  overflow: hidden;
  background: #FAF9FA;
  box-shadow: 0px 20px 36px -8px rgba(14, 14, 44, 0.1), 0px 1px 1px rgba(0, 0, 0, 0.05);
  border: 1px solid #E7E3EB;
  border-radius: 2px;
  width: 100%;
  max-height: 100vh;
  z-index: 10000;

  @media screen and (min-width: 370px) {
    width: auto;
    min-width: 350px;
    max-width: 100%;
  }
`
