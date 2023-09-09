import React from 'react'
import styled from 'styled-components'

const Label = styled.div`
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  text-transform: uppercase;
  color: #9199b0;
  text-align: left;
  margin-bottom: 3px;
`

const ContentContainer = styled.div`
  min-height: 24px;
  display: flex;
  align-items: center;
`

const CellLayout = ({ label = '', children }) => {
  return (
    <div>
      {label && <Label>{label}</Label>}
      <ContentContainer>{children}</ContentContainer>
    </div>
  )
}

export default CellLayout
