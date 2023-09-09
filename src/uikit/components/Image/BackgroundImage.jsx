import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import observerOptions from './options'
import Wrapper from './Wrapper'

const StyledBackgroundImage = styled(Wrapper)`
  background-repeat: no-repeat;
  background-size: contain;
`

const BackgroundImage = ({ src, width, height, ...props }) => {
  const ref = useRef()

  useEffect(() => {
    let observer

    if (ref.current) {
      const div = ref.current

      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const { isIntersecting } = entry
          if (isIntersecting) {
            div.style.backgroundImage = `url("${src}")`
            observer.disconnect()
          }
        })
      }, observerOptions)
      observer.observe(div)
    }
    return () => {
      if (observer) {
        observer.disconnect()
      }
    }
  }, [src])

  return (
    <StyledBackgroundImage ref={ref} width={width} height={height} {...props} />
  )
}

export default BackgroundImage
