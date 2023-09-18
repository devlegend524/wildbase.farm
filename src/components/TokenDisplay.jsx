import React from 'react'

export default function TokenDisplay(props) {
  if (props.token?.isTokenOnly) {
    return (
      <img
        src={props.token?.logoA}
        alt='token'
        className='rounded-full lg:w-[65px] lg:h-[65px] border-[3px] border-white mb-3'
      />
    )
  } else {
    return (
      <div className='h-[65px] w-[65px] relative mb-3'>
        <img
          src={props.token?.logoA}
          alt='token'
          className='rounded-full lg:w-[65px] lg:h-[65px] absolute left-1/2 -translate-x-[80%]  border-[3px] border-white'
        />
        <img
          src={props.token?.logoB}
          alt='token'
          className='rounded-full lg:w-[65px] lg:h-[65px] absolute left-1/2 -translate-x-[30%] border-[3px] border-white'
        />
      </div>
    )
  }
}
