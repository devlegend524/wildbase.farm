import React, { useEffect, useState } from 'react';
import { MdArrowDropDown } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { ethers } from 'ethers';
import { useDebounce } from 'use-debounce';
import { useEthersProvider } from 'hooks/useEthers';

import { useAccount, useNetwork, erc20ABI } from 'wagmi';

const LiquidityInput = ({
    tokenType,
    token,
    changeBalance,
    defaultValue,
    setDirection
}) => {
    const dispatch = useDispatch();
    const [swapBalance, setSwapBalance] = useState('');
    const [balance, setBalance] = useState(0);
    const [fromParent, setFromParent] = useState(false);
    const [debouncedValue] = useDebounce(swapBalance, 1000);

    const { chain } = useNetwork();
    const { address, isConnected } = useAccount();
    const provider = useEthersProvider();
    const correctNetwork = chain && chain.id === 8453;

    const getTokenBalance = async () => {
        const contractFrom = new ethers.Contract(
            token.lpAddresses,
            erc20ABI,
            provider
        );
        const decimals1 = await contractFrom.decimals();
        const balance1 = await contractFrom.balanceOf(address);
        dispatch({
            type: tokenType === 'sell' ? 'SET_FROM_BALANCE' : 'SET_TO_BALANCE',
            payload: ethers.utils.formatUnits(balance1, decimals1),
        });
        setBalance(ethers.utils.formatUnits(balance1, decimals1));
    };
    useEffect(() => {
        if (isConnected && token && token.lpAddresses)
            getTokenBalance();
    }, [token]);

    useEffect(() => {
        if (defaultValue !== swapBalance) {
            setSwapBalance(defaultValue);
            setFromParent(true);
        }
    }, [defaultValue]);

    useEffect(() => {
        if (Number(debouncedValue) > 0 && !fromParent) {
            setDirection(tokenType)
            changeBalance(debouncedValue);
        }
    }, [debouncedValue]);

    const calculatePrice = (value) => {
        setSwapBalance(value);
        setFromParent(false);
    };

    return (
        <>
            <div className="secondary_bg mt-[16px] flex w-full flex-col rounded-xl">
                <div className="flex w-full">
                    <div
                        data-te-toggle="modal"
                        data-te-target={`#tokenListModal_${tokenType}`}
                        className="buttonhover m-3 flex w-auto min-w-[120px] shrink-0 cursor-pointer items-center justify-between  rounded-xl  bg-[#3a466b] p-1 font-semibold "
                    >
                        <div className="flex items-center gap-1  text-xl">
                            {token && token.logoA && (
                                <>
                                    <img src={token.logoA} alt="logo" className="w-[25px]" />
                                </>
                            )}
                            {token ? token.lpSymbol : 'Select Token'}{' '}
                        </div>
                        <MdArrowDropDown className="" />
                    </div>
                    <div className="flex w-full appearance-none">
                        <input
                            type="number"
                            name=""
                            inputMode="decimal"
                            placeholder="0.000000"
                            pattern="^[0-9]*[.,]?[0-9]*$"
                            autoComplete="off"
                            minLength="1"
                            maxLength="79"
                            autoCorrect="off"
                            value={swapBalance}
                            onChange={(e) => calculatePrice(e.target.value)}
                            className="w-full rounded-xl border-none bg-transparent px-4 text-right text-3xl font-semibold text-white focus:outline-none"
                            disabled={correctNetwork ? '' : 'disabled'}
                        />
                    </div>
                </div>
                <div className="mx-3 mb-1 flex justify-between">
                    <div className="text-sm">
                        Balance:{' '}
                        <span className="font-semibold">
                            {' '}
                            {Number(balance).toFixed(5)} {token?.symbol}
                        </span>
                    </div>
                    <div></div>
                </div>
            </div>
        </>
    );
};

export default LiquidityInput;
