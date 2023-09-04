import React, { useState } from 'react'
import { Line } from 'rc-progress'
import { formatAddress } from 'utils/customHelpers'
import { getPresaleAddress } from 'utils/addressHelpers'
import { BASE_EXPLORER } from 'config/config'
export default function Presale() {
  const [active, setActive] = useState(0)
  return (
    <div className='presale'>
      <div className='presale_banner'>PRESALE WILD BASE</div>
      <div className='presale_content'>
        <div className='card'>
          <div className='presale_card'>
            <div className='tab_box'>
              <div
                className={`tab_panel  + ${active === 0 ? 'active' : ''}`}
                onClick={() => setActive(0)}
              >
                SALE
              </div>
              <div
                className={`tab_panel  + ${active === 1 ? 'active' : ''}`}
                onClick={() => setActive(1)}
              >
                CLAIM
              </div>
            </div>
            {active === 0 ? (
              <div>
                <div className='sale_percent_bar'>
                  <div className='text'>0/100 ETH</div>
                  <div className='text'>0%</div>
                </div>
                <Line
                  percent={20}
                  strokeWidth={3}
                  strokeColor='#2a8710'
                  trailColor='#00162fb0'
                  trailWidth={3}
                  style={{ margin: '17px 0 30px 0' }}
                />
                <div className='balance_form'>
                  <div className='form_text'>Balance: 0 ETH</div>
                  <div className='form_input'>
                    <input type='number' placeholder='0' />
                  </div>
                </div>
                <button className='btn buy_btn'>BUY</button>
                <div className='commit_text'>
                  <div>Your Commited</div>
                  <div>0 ETH</div>
                </div>
              </div>
            ) : (
              <div className='claim_card'>
                <div className='claim_list'>
                  <div className='list_item'>
                    <p>Your Commited</p>
                    <p>0 ETH</p>
                  </div>
                  <div className='list_item'>
                    <p>ETH to Refund</p>
                    <p>0 ETH</p>
                  </div>
                  <div className='list_item'>
                    <p>Claimable</p>
                    <p>0 $</p>
                  </div>
                  <div className='list_item'>
                    <p>Earned Farming Bonuese</p>
                    <p>0 $</p>
                  </div>
                </div>
                <button className='claim_btn'>CLAIM</button>
              </div>
            )}
          </div>
        </div>
        <div className='card'>
          <div className='presale_detail'>
            <div className='annual_price'>
              <p>Total Raised</p>
              <h3>0 ETH</h3>
            </div>
            <div className='main_detail'>
              <div className='detail_title'>Main Details</div>
              <div className='detail_list'>
                <div className='list_item'>
                  <p>Token Sale Contract</p>
                  <p>
                    <a
                      href={`${BASE_EXPLORER}/address/${getPresaleAddress()}`}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      {formatAddress(getPresaleAddress(), 4)}
                    </a>
                  </p>
                </div>
                <div className='list_item'>
                  <p>Price Per WILD</p>
                  <p>$0.35 / $0.45</p>
                </div>
                <div className='list_item'>
                  <p>Minimum Purchase:</p>
                  <p>0.2 ETH / 0.1 ETH</p>
                </div>
                <div className='list_item'>
                  <p>Maximum Purchase: </p>
                  <p>2.7 ETH / 1.35 ETH</p>
                </div>
                <div className='list_item'>
                  <p>Start Time</p>
                  <p>TBA</p>
                </div>
                <div className='list_item'>
                  <p>End Time</p>
                  <p>TBA</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
