import React from 'react'
import styled from 'styled-components'
import { Modal, Text, LinkExternal, Flex, Box } from 'uikit'
import { useTranslation } from 'contexts/Localization'
import {
  tokenEarnedPerThousandDollarsCompounding,
  getRoi,
} from 'utils/compoundApyHelpers'

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, auto);
  grid-template-rows: repeat(4, auto);
  margin-bottom: 12px;
`

const GridItem = styled.div``

const GridHeaderItem = styled.div`
  max-width: 180px;
`

const BulletList = styled.ul`
  li::marker {
    font-size: 12px;
  }
`

const ApyCalculatorModal = ({
  onDismiss,
  tokenPrice,
  apr,
  linkLabel,
  linkHref,
  earningTokenSymbol = 'WILDX',
  roundingDecimals = 2,
  compoundFrequency = 1,
  performanceFee = 0,
  isFarm = false,
}) => {
  const { t } = useTranslation()
  const oneThousandDollarsWorthOfToken = 1000 / tokenPrice

  const tokenEarnedPerThousand1D = tokenEarnedPerThousandDollarsCompounding({
    numberOfDays: 1,
    farmApr: apr,
    tokenPrice,
    roundingDecimals,
    compoundFrequency,
    performanceFee,
  })
  const tokenEarnedPerThousand7D = tokenEarnedPerThousandDollarsCompounding({
    numberOfDays: 7,
    farmApr: apr,
    tokenPrice,
    roundingDecimals,
    compoundFrequency,
    performanceFee,
  })
  const tokenEarnedPerThousand30D = tokenEarnedPerThousandDollarsCompounding({
    numberOfDays: 30,
    farmApr: apr,
    tokenPrice,
    roundingDecimals,
    compoundFrequency,
    performanceFee,
  })
  const tokenEarnedPerThousand365D = tokenEarnedPerThousandDollarsCompounding({
    numberOfDays: 365,
    farmApr: apr,
    tokenPrice,
    roundingDecimals,
    compoundFrequency,
    performanceFee,
  })

  return (
    <Modal title={t('ROI')} onDismiss={onDismiss}>
      {isFarm && (
        <Flex mb='24px' justifyContent='space-between'>
          <Text color='textWhite'>{t('APR (incl. LP rewards)')}</Text>
          <Text color='textWhite'>{apr.toFixed(roundingDecimals)}%</Text>
        </Flex>
      )}
      <Grid>
        <GridHeaderItem>
          <Text fontSize='14px' color='textWhite' mb='12px'>
            {t('Timeframe')}
          </Text>
        </GridHeaderItem>
        <GridHeaderItem>
          <Text fontSize='14px' color='textWhite' mr='12px' ml='12px' mb='12px'>
            {t('ROI')}
          </Text>
        </GridHeaderItem>
        <GridHeaderItem>
          <Text fontSize='14px' color='textWhite' mb='12px'>
            {t('%symbol% per $1,000', { symbol: earningTokenSymbol })}
          </Text>
        </GridHeaderItem>
        {/* 1 day row */}
        <GridItem>
          <Text color='textWhite'>{t('%num%d', { num: 1 })}</Text>
        </GridItem>
        <GridItem>
          <Text color='textWhite' mr='12px' ml='12px'>
            {getRoi({
              amountEarned: tokenEarnedPerThousand1D,
              amountInvested: oneThousandDollarsWorthOfToken,
            }).toFixed(roundingDecimals)}
            %
          </Text>
        </GridItem>
        <GridItem>
          <Text color='textWhite'>{tokenEarnedPerThousand1D}</Text>
        </GridItem>
        {/* 7 day row */}
        <GridItem>
          <Text color='textWhite'>{t('%num%d', { num: 7 })}</Text>
        </GridItem>
        <GridItem>
          <Text color='textWhite' mr='12px' ml='12px'>
            {getRoi({
              amountEarned: tokenEarnedPerThousand7D,
              amountInvested: oneThousandDollarsWorthOfToken,
            }).toFixed(roundingDecimals)}
            %
          </Text>
        </GridItem>
        <GridItem>
          <Text color='textWhite'>{tokenEarnedPerThousand7D}</Text>
        </GridItem>
        {/* 30 day row */}
        <GridItem>
          <Text color='textWhite'>{t('%num%d', { num: 30 })}</Text>
        </GridItem>
        <GridItem>
          <Text color='textWhite' mr='12px' ml='12px'>
            {getRoi({
              amountEarned: tokenEarnedPerThousand30D,
              amountInvested: oneThousandDollarsWorthOfToken,
            }).toFixed(roundingDecimals)}
            %
          </Text>
        </GridItem>
        <GridItem>
          <Text color='textWhite'>{tokenEarnedPerThousand30D}</Text>
        </GridItem>
        {/* 365 day / APY row */}
        <GridItem style={{ maxWidth: '180px' }}>
          <Text color='textWhite'>{t('365d (APY)')}</Text>
        </GridItem>
        <GridItem>
          <Text color='textWhite' mr='12px' ml='12px'>
            {getRoi({
              amountEarned: tokenEarnedPerThousand365D,
              amountInvested: oneThousandDollarsWorthOfToken,
            }).toFixed(roundingDecimals)}
            %
          </Text>
        </GridItem>
        <GridItem>
          <Text color='textWhite'>{tokenEarnedPerThousand365D}</Text>
        </GridItem>
      </Grid>
      <Flex justifyContent='flex-start'>
        <Box mb='28px' p='4px'>
          <BulletList>
            <li>
              <Text ml='-8px' fontSize='14px' color='textWhite' display='inline'>
                {t('Calculated based on current rates.')}
              </Text>
            </li>
            {isFarm && (
              <li>
                <Text ml='-8px' fontSize='14px' color='textWhite' display='inline'>
                  {t(
                    'LP rewards: 0.17% trading fees, distributed proportionally among LP token holders.'
                  )}
                </Text>
              </li>
            )}
            <li>
              <Text ml='-8px' fontSize='14px' color='textWhite' display='inline'>
                {t(
                  'All figures are estimates provided for your convenience only,'
                )}
              </Text>
              <br />
              <Text ml='-8px' fontSize='14px' color='textWhite' display='inline'>
                {t('and by no means represent guaranteed returns.')}
              </Text>
            </li>
            {performanceFee > 0 && (
              <li>
                <Text
                  mt='14px'
                  ml='-8px'
                  fontSize='14px'
                  color='textWhite'
                  display='inline'
                >
                  {t(
                    'All estimated rates take into account this pool’s %fee%% performance fee',
                    {
                      fee: performanceFee,
                    }
                  )}
                </Text>
              </li>
            )}
          </BulletList>
        </Box>
      </Flex>
      <Flex justifyContent='center'>
        <LinkExternal href={linkHref}>{linkLabel}</LinkExternal>
      </Flex>
    </Modal>
  )
}

export default ApyCalculatorModal
