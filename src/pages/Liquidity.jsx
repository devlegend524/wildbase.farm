import React, { useState, useEffect } from "react";
import LiquidityInput from "components/LiquidityInput";
import farmsConfig from "config/farms";
import Loading from "components/Loading";
import { getErc20Contract } from "utils/contractHelpers";
import { Button } from "uikit";
import { useEthersSigner } from "hooks/useEthers";
import { getZapAddress } from "utils/addressHelpers";
import { useAccount } from "wagmi";
import { didUserReject } from "utils/customHelpers";
import { notify } from "utils/toastHelper";
import { ethers } from "ethers";
import { useZapContract, useRouterContract } from "hooks/useContract";
import { fromReadableAmount, toReadableAmount } from "utils/customHelpers";
export default function Liquidity() {

    const [pendingFromApproveTx, setPendingFromApproveTx] = useState(false)
    const [pendingToApproveTx, setPendingToApproveTx] = useState(false)
    const [pendingTx, setPendingTx] = useState(false)
    const [sellAmount, setSellAmount] = useState('');
    const [buyAmount, setBuyAmount] = useState('');
    const [allowanceFrom, setAllowanceFrom] = useState(0);
    const [allowanceTo, setAllowanceTo] = useState(0);
    const [fromToken, setFromToken] = useState(farmsConfig[1]);
    const [toToken, setToToken] = useState(farmsConfig[0]);
    const [direction, setDirection] = useState('sell')
    const { address } = useAccount()
    const signer = useEthersSigner()
    const zapAddress = getZapAddress()
    const zapContract = useZapContract()
    const routerContract = useRouterContract()

    const getAllowance = async (token, type) => {
        let tokenContract;
        tokenContract = getErc20Contract(token.lpAddresses, signer)
        const tokenAllowance = await tokenContract.allowance(address, zapAddress, { from: address })
        if (type === 'from')
            setAllowanceFrom(tokenAllowance.toString())
        else
            setAllowanceTo(tokenAllowance.toString())
    }

    const handleApproveFromToken = async () => {
        try {
            if (
                Number(ethers.utils.formatUnits(allowanceFrom, 'ether')) < Number(sellAmount)
            ) {
                console.log('approving...')
                setPendingFromApproveTx(true)
                let tokenContract;
                tokenContract = getErc20Contract(fromToken.lpAddresses, signer)
                await tokenContract.approve(zapAddress, ethers.constants.MaxUint256, { from: address })
                setPendingFromApproveTx(false)
            }
        } catch (e) {
            console.log(e)
            if (didUserReject(e)) {
                notify('error', 'User rejected transaction')
            }
            setPendingFromApproveTx(false)
        }
    }
    const handleApproveToToken = async () => {
        try {
            if (
                Number(ethers.utils.formatUnits(allowanceTo, 'ether')) < Number(buyAmount)
            ) {
                console.log('approving...')
                setPendingToApproveTx(true)
                let tokenContract;
                tokenContract = getErc20Contract(toToken.lpAddresses, signer)
                await tokenContract.approve(zapAddress, ethers.constants.MaxUint256, { from: address })
                setPendingToApproveTx(false)
            }
        } catch (e) {
            console.log(e)
            if (didUserReject(e)) {
                notify('error', 'User rejected transaction')
            }
            setPendingToApproveTx(false)
        }
    }

    const handleAddLiquidity = async () => {
        setPendingTx(true)
        try {
            console.log('adding liquidity...')
            const tx = await zapContract.addTaxFreeLiquidity(
                fromToken.lpAddresses,
                toToken.lpAddresses,
                fromReadableAmount(sellAmount, 18),
                fromReadableAmount(buyAmount, 18)
            )
            await tx.wait()
            refresh()
        } catch (e) {
            console.log(e)
            if (didUserReject(e)) {
                notify('error', 'User rejected transaction')
            }
        }
        setPendingTx(false)
    }

    const getAmount = async (amount, type) => {
        const amount_in = fromReadableAmount(amount, 18);
        try {
            if (type === 'sell') {
                const amount_out = await routerContract.getAmountsOut(amount_in, [
                    fromToken?.lpAddresses,
                    toToken?.lpAddresses,
                ]);
                setBuyAmount(toReadableAmount(amount_out[1], 18))
            } else {
                const amount_out = await routerContract.getAmountsIn(amount_in, [
                    fromToken?.lpAddresses,
                    toToken?.lpAddresses,
                ]);
                setSellAmount(toReadableAmount(amount_out[0], 18))
            }

        } catch (e) {
            console.log(e);
            return "unkown";
        }
    }

    const refresh = () => {
        setSellAmount('')
        setBuyAmount('')
        setFromToken(farmsConfig[1])
        setToToken(farmsConfig[0])
    }
    useEffect(() => {
        if (direction === 'sell') {
            if (Number(sellAmount) === 0) {
                setSellAmount('')
                setBuyAmount('')
            }
            else {
                getAmount(sellAmount, 'sell')
            }
        }
    }, [sellAmount, direction])

    useEffect(() => {
        if (direction === 'buy') {
            if (Number(buyAmount) === 0) {
                setSellAmount('')
                setBuyAmount('')
            } else {
                getAmount(buyAmount, 'buy')
            }
        }
    }, [buyAmount, direction])

    useEffect(() => {
        getAllowance(fromToken, 'from')
        getAllowance(toToken, 'to')
    })
    return (
        <div className='container'>
            <div className='presale_banner pb-16'>Add Liquidity
                <p className="text-center text-gray-400 text-[20px]">
                    Receive LP tokens and earn trading fees
                </p>
            </div>
            <div className="flex justify-center items-center">
                <div className="flex flex-col main_bg max-w-md w-full p-5 rounded-xl mb-16">
                    <div className="flex justify-between items-center">
                        <div className="flex-1">
                            <div>Add Liquidity</div>
                        </div>
                        <div className="flex-1 flex justify-end items-center">
                            <button className="action_btn" onClick={refresh}>
                                <img src="/images/refresh.png" alt="" />
                            </button>
                        </div>
                    </div>
                    <div className="block">
                        <LiquidityInput
                            tokenType="sell"
                            token={fromToken}
                            changeBalance={setSellAmount}
                            defaultValue={sellAmount}
                            setDirection={setDirection}
                        />
                        <div className="flex justify-center mt-3">
                            <img src="/images/arrow-down.png" alt="" />
                        </div>
                        <LiquidityInput
                            tokenType="buy"
                            token={toToken}
                            changeBalance={setBuyAmount}
                            defaultValue={buyAmount}
                            setDirection={setDirection}
                        />
                        <div className="flex flex-col my-2 justify-center">
                            <div className="py-1">
                                {Number(ethers.utils.formatUnits(allowanceTo, 'ether')) < Number(buyAmount) && Number(buyAmount) > 0 &&
                                    <Button
                                        id="compound-all"
                                        // disabled={balancesWithValue.length <= 0}
                                        onClick={handleApproveFromToken}
                                        width="100%"
                                        style={{
                                            background: "#317ffe",
                                            color: "#ddd",
                                            fontWeight: 500,
                                        }}
                                    >
                                        {pendingFromApproveTx ? (
                                            <Loading />
                                        ) : (
                                            <>Approve {fromToken.lpSymbol}</>
                                        )}
                                    </Button>
                                }

                            </div>
                            <div className="py-1">
                                {Number(ethers.utils.formatUnits(allowanceTo, 'ether')) < Number(sellAmount) && Number(sellAmount) > 0 &&
                                    <Button
                                        id="compound-all"
                                        // disabled={balancesWithValue.length <= 0}
                                        onClick={handleApproveToToken}
                                        width="100%"
                                        style={{
                                            background: "#317ffe",
                                            color: "#ddd",
                                            fontWeight: 500,
                                        }}
                                    >
                                        {pendingToApproveTx ? (
                                            <Loading />
                                        ) : (
                                            <>Approve {toToken.lpSymbol}</>
                                        )}
                                    </Button>
                                }
                            </div>
                            <div className="py-1">
                                <Button
                                    id="compound-all"
                                    disabled={Number(sellAmount) === 0 || Number(buyAmount) === 0}
                                    onClick={handleAddLiquidity}
                                    width="100%"
                                    style={{
                                        background: "#317ffe",
                                        color: "#ddd",
                                        fontWeight: 500,
                                    }}
                                >
                                    {pendingTx ? (
                                        <Loading />
                                    ) : (
                                        <>Add Liquidity</>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
