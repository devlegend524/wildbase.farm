import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useNFTContract } from "hooks/useContract";
import NFTCard from "components/NFTCard";
import { notify } from "utils/toastHelper";
import useRefresh from "hooks/useRefresh";
import Loading from "components/Loading";
import { didUserReject } from "utils/customHelpers";

export default function Zap() {
  const { address } = useAccount();
  const [nfts, setNfts] = useState(0);
  const [myTokenIds, setMyTokenIds] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const nftContract = useNFTContract();
  const { fastRefresh } = useRefresh();

  const getAvailableNFTs = async () => {
    const availableNFTs = await nftContract.getMaximumAmountCanMint(address);
    const myNFTs = await nftContract.balanceOf(address);
    if (Number(myNFTs) > 0) {
      const tokenIds = await nftContract.walletOfOwner(address);
      setMyTokenIds(tokenIds);
    }
    setNfts(Number(availableNFTs) - Number(myNFTs));
  };

  const claimNFT = async () => {
    if (nfts < 1) return;
    try {
      setIsProcessing(true);
      const tx = await nftContract.mint();
      await tx.wait();
      setIsProcessing(false);
      notify("success", "you have successfully claimed an NFT");
      await getAvailableNFTs();
    } catch (e) {
      if (didUserReject(e)) {
        notify("error", "User Rejected Transaction");
      }
    }
  };

  useEffect(() => {
    getAvailableNFTs();
  }, [fastRefresh]);

  useEffect(() => {
    getAvailableNFTs();
  }, []);
  return (
    <div className="container">
      <div className="flex justify-center gap-4 mt-24">
        {myTokenIds && myTokenIds.length > 0 ? (
          myTokenIds.map((tokenId, index) => (
            <div className="w-[200px] h-[200px]">
              <NFTCard key={index} tokenId={tokenId} />
            </div>
          ))
        ) : (
          <div className="w-full max-w-[300px] max-h-[400px] p-4 rounded-lg border border-gray-600">
            <img
              src={"/logo.png"}
              alt="token"
              className="w-full border-[3px] border-white rounded-lg border-opacity-30"
            />
          </div>
        )}
      </div>
      <div className="mt-12">
        {address && !nfts && (
          <p className="mt-3 text-center text-2xl">
            You are not able to claim NFT.
          </p>
        )}

        {address && nfts ? (
          <p className="mt-3 text-center text-2xl">
            You have {nfts} NFT(s) to claim.
          </p>
        ) : (
          ""
        )}
      </div>

      <div className="flex justify-center items-center pb-16 m-2 mt-12">
        <button
          className="bg-secondary-700 rounded-xl w-full max-w-sm flex justify-center px-6 py-3 hover:scale-105 transition ease-in-out border border-white border-opacity-30"
          disabled={!address && !nfts}
          onClick={() => claimNFT()}
        >
          {isProcessing ? <Loading /> : nfts ? "Clain NFT" : "Nothing to claim"}
        </button>
      </div>
    </div>
  );
}
