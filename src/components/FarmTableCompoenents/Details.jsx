import React from 'react'
import styled from 'styled-components'
import { ChevronDownIcon } from 'uikit'
const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  padding-right: 8px;

  @media screen and (min-width: 576px) {
    padding-right: 0px;
  }
`

const ArrowIcon = styled(ChevronDownIcon)`
  transform: 'rotate(180deg)';
  height: 20px;
`

const Details = ({ actionPanelToggled }) => {
  return (
    <Container>
      <ArrowIcon color='primary' />
    </Container>
  )
}

export default Details
