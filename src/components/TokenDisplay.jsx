import React from 'react'

export default function TokenDisplay(props) {
  if (props.token?.isTokenOnly) {
    return (
      <img
        src={props.token?.logoA}
        alt='token'
        className='rounded-full lg:w-[80px] lg:h-[80px] mx-auto border-[3px] border-white'
      />
    )
  } else {
    return (
      <div className='h-[80px] w-[80px] relative'>
        <img
          src={props.token?.logoA}
          alt='token'
          className='rounded-full lg:w-[80px] lg:h-[80px] absolute left-1/2 -translate-x-[80%]  mx-auto border-[3px] border-white'
        />
        <img
          src={props.token?.logoB}
          alt='token'
          className='rounded-full lg:w-[80px] lg:h-[80px] absolute left-1/2 -translate-x-[30%] mx-auto border-[3px] border-white'
        />
      </div>
    )
  }
}
