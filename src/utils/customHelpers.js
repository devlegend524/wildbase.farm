import { BigNumber, ethers } from 'ethers';

export function fromReadableAmount(amount, decimals) {
  if (!amount) return 0;
  return ethers.utils.parseUnits(amount.toString(), decimals).toString();
}

export function toReadableAmount(rawAmount, decimals) {
  if (!rawAmount) return 0;
  return Number(
    ethers.utils.formatUnits(rawAmount, decimals)?.toString()
  ).toFixed(5);
}
export const formatAddress = (address, segment) => {
  if (!address) return;
  return address.slice(0, segment) + '...' + address.slice(-segment);
};
export const convertCurrency = (labelValue) => {
  return Number(labelValue) >= 1.0e9
    ? (Number(labelValue) / 1.0e9).toFixed(2) + 'B'
    : Number(labelValue) >= 1.0e6
      ? (Number(labelValue) / 1.0e6).toFixed(2) + 'M'
      : Number(labelValue) >= 1.0e3
        ? (Number(labelValue) / 1.0e3).toFixed(2) + 'K'
        : Number(labelValue);
};
export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
export const toFixed = (num, fixed) => {
  var re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?');
  return num.toString().match(re)[0];
}

function getReason(error) {
  let reason
  while (error) {
    reason = error.reason ?? error.message ?? reason
    error = error.error ?? error.data?.originalError
  }
  return reason
}

export function didUserReject(error) {
  const reason = getReason(error)
  if (
    error?.code === 4001 ||
    // ethers v5.7.0 wrapped error
    error?.code === 'ACTION_REJECTED' ||
    // For Rainbow :
    (reason?.match(/request/i) && reason?.match(/reject/i)) ||
    // For Frame:
    reason?.match(/declined/i) ||
    // For SafePal:
    reason?.match(/cancell?ed by user/i) ||
    // For Trust:
    reason?.match(/user cancell?ed/i) ||
    // For Coinbase:
    reason?.match(/user denied/i) ||
    // For Fireblocks
    reason?.match(/user rejected/i) ||
    error instanceof UserRejectedRequestError
  ) {
    return true
  }
  return false
}

export class UserRejectedRequestError extends Error {
  constructor(message) {
    super(message)
    this.name = 'UserRejectedRequestError'
  }
}