import React from 'react'

export default function Loading() {
  return (
    <div className='flex justify-center items-center'>
      <img
        src='/images/loading.svg'
        alt='Loading...'
        className='w-[30px] h-[30px]'
      />
    </div>
  )
}
