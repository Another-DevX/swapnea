import React, { useEffect, useState } from "react";
import { parseEther, zeroAddress } from "viem";
import {
  erc20ABI,
  useContractWrite,
  useNetwork,
  useWaitForTransaction,
} from "wagmi";

function useTxn(ammount: number) {
  const [addresses, setAdresses] = useState({
    token: zeroAddress,
    scrow: zeroAddress,
  });
  const [txnHash, setTxnHash] = useState();
  const { chain } = useNetwork();

  useEffect(() => {
    switch (chain?.name) {
      case "Ethereum":
        setAdresses({
          token: zeroAddress,
          scrow: zeroAddress,
        });
        break;
      case "Alfajores":
        setAdresses({
          token: zeroAddress,
          scrow: zeroAddress,
        });
        break;
      default:
        return;
    }
  }, [chain]);

  const ERC20 = useContractWrite({
    address: addresses.token,
    abi: erc20ABI,
    functionName: "approve",
  });

  const { data, isError, error, isLoading } = useWaitForTransaction({
    hash: txnHash,
  });

  const Scrow = useContractWrite({
    address: addresses.scrow,
    abi: someAbi,
    functionName: "transfer",
    args: [process.env.NEXT_PUBLIC_ETH_CONTRACT_ADDRESS as `0x${string}`],
  });

  useEffect(() => {
    async function scrowCall(ammount: number) {
      const data = await Scrow.writeAsync({

      });
      return data.hash;
    }
    if (isError) {
      console.error(error);
    } else if (!isLoading && data) {
      scrowCall(ammount);
    }
  }, [data, isError, isLoading]);

  return { ERC20, setTxnHash };
}
