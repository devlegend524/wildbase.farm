import React from 'react'
import { notify } from 'utils/toastHelper'
import moment from 'moment'
export default function ClaimComponent({
  finished,
  claim2WILD,
  claimable,
  userDeposited,
}) {
  const lastClaimedTime = window.localStorage.getItem('lastClaimedTime')
  const handleClaim = () => {
    if (!finished) {
      notify('error', 'Presale is not ended yet')
      return
    }
    if (Number(userDeposited) === 0) {
      notify('error', 'You do not have any tokens to claim')
      return
    }
    claim2WILD()
  }
  return (
    <div className='claim_card'>
      <div className='claim_list'>
        <div className='list_item'>
          <p>Claimable</p>
          <p>{claimable} 2WILD</p>
        </div>
        <div className='list_item'>
          <p>Last Claimed Time</p>
          <p>
            {lastClaimedTime
              ? moment(Number(lastClaimedTime)).format('YYYY-MM-DD HH:mm:ss')
              : '0000-00-00 00:00:00'}{' '}
          </p>
        </div>
        <div className='list_item'>
          <p>Next Claimable Time</p>
          <p>
            {lastClaimedTime
              ? moment(Number(lastClaimedTime))
                  .add(1, 'h')
                  .format('YYYY-MM-DD HH:mm:ss')
              : '0000-00-00 00:00:00'}{' '}
          </p>
        </div>
      </div>
      <button
        className='claim_btn'
        onClick={() => handleClaim()}
        disabled={!finished ? 'disabled' : ''}
      >
        {!finished
          ? 'Preslae is not ended yet'
          : Number(claimable) === 0
          ? "You don't have any tokens to claim"
          : 'ClAIM 2WILD'}
      </button>
    </div>
  )
}
