import { useCallback, useContext, useEffect } from 'react'
import { Context } from './ModalContext'

const useModal = (modal, closeOnOverlayClick = true) => {
  const { onPresent, onDismiss, setCloseOnOverlayClick } = useContext(Context)
  const onPresentCallback = useCallback(() => {
    onPresent(modal)
  }, [modal, onPresent])

  useEffect(() => {
    setCloseOnOverlayClick(closeOnOverlayClick)
  }, [closeOnOverlayClick, setCloseOnOverlayClick])

  return [onPresentCallback, onDismiss]
}

export default useModal
