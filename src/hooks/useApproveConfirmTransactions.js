import { useEffect, useReducer, useRef } from 'react'
import { noop } from 'lodash'
import { useTranslation } from 'contexts/Localization'
import { useAccount } from 'wagmi'
import { notify } from 'utils/toastHelper'

const reducer = (state, actions) => {
  switch (actions.type) {
    case 'requires_approval':
      return {
        ...state,
        approvalState: 'success',
      }
    case 'approve_sending':
      return {
        ...state,
        approvalState: 'loading',
      }
    case 'approve_receipt':
      return {
        ...state,
        approvalState: 'success',
        approvalReceipt: actions.payload,
      }
    case 'approve_error':
      return {
        ...state,
        approvalState: 'fail',
        approvalError: actions.payload,
      }
    case 'confirm_sending':
      return {
        ...state,
        confirmState: 'loading',
      }
    case 'confirm_receipt':
      return {
        ...state,
        confirmState: 'success',
        confirmReceipt: actions.payload,
      }
    case 'confirm_error':
      return {
        ...state,
        confirmState: 'fail',
        confirmError: actions.payload,
      }
    default:
      return state
  }
}


const useApproveConfirmTransaction = ({
  onApprove,
  onConfirm,
  onRequiresApproval,
  onSuccess = noop,
  onApproveSuccess = noop,
}) => {
  const { t } = useTranslation()
  const { address } = useAccount()
  const [state, dispatch] = useReducer(reducer, initialState)
  const handlePreApprove = useRef(onRequiresApproval)
  const { toastError } = useToast()

  // Check if approval is necessary, re-check if account changes
  useEffect(() => {
    if (address && handlePreApprove.current) {
      handlePreApprove.current().then((result) => {
        if (result) {
          dispatch({ type: 'requires_approval' })
        }
      })
    }
  }, [address, handlePreApprove, dispatch])

  return {
    isApproving: state.approvalState === 'loading',
    isApproved: state.approvalState === 'success',
    isConfirming: state.confirmState === 'loading',
    isConfirmed: state.confirmState === 'success',
    approvalReceipt: state.approvalReceipt,
    approvalError: state.approvalError,
    confirmReceipt: state.confirmReceipt,
    confirmError: state.confirmError,
    handleApprove: () => {
      onApprove()
        .on('sending', () => {
          dispatch({ type: 'approve_sending' })
        })
        .on('receipt', (payload) => {
          dispatch({ type: 'approve_receipt', payload })
          onApproveSuccess(state)
        })
        .on('error', (error) => {
          dispatch({ type: 'approve_error', payload: error })
          console.log('An error occurred approving transaction:', error)
          notify('error', t('An error occurred approving transaction'))
        })
    },
    handleConfirm: () => {
      onConfirm()
        .on('sending', () => {
          dispatch({ type: 'confirm_sending' })
        })
        .on('receipt', (payload) => {
          dispatch({ type: 'confirm_receipt', payload })
          onSuccess(state)
        })
        .on('error', (error) => {
          dispatch({ type: 'confirm_error', payload: error })
          console.log('An error occurred confirming transaction:', error)
          notify('error', t('An error occurred confirming transaction'))
        })
    },
  }
}

export default useApproveConfirmTransaction
