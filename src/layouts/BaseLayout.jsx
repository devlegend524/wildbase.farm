import React from 'react'
import Header from 'components/Header'
import Footer from 'components/Footer'
export default function BaseLayout({ children }) {
  return (
    <div className='bg-[#000000] text-white'>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
