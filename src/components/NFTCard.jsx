import React, { useState, useEffect } from "react";
import { useNFTContract } from "hooks/useContract";

export default function NFTCard({ tokenId }) {
  const [tokenUri, setTokenUri] = useState("");
  const nftContract = useNFTContract();

  const getTokenUri = async (_tokenId) => {
    const url = await nftContract.tokenURI(_tokenId);
    console.log(url);
    setTokenUri(url);
  };
  useEffect(() => {
    getTokenUri(tokenId);
  }, [tokenId]);
  return (
    <div className="flex justify-center items-center p-2 border">
      <img src={tokenUri} alt="NFT" srcSet="" className="w-[200px] h-[200px]" />
    </div>
  );
}
