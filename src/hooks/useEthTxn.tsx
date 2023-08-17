import React, { useEffect, useState } from "react";
import { Address, parseEther, zeroAddress } from "viem";
import {
  erc20ABI,
  useContractWrite,
  useNetwork,
  useWaitForTransaction,
} from "wagmi";
import Abis from "@/utils/abis.json";

function useTxn() {
  const [addresses, setAdresses] = useState<{
    token: Address;
    escrow: Address;
  }>({
    token: zeroAddress,
    escrow: zeroAddress,
  });
  const [txnHash, setTxnHash] = useState();
  const { chain } = useNetwork();

  console.debug({
    token: process.env.NEXT_PUBLIC_CELO_USDT as `0x${string}`,
    escrow: process.env.NEXT_PUBLIC_CELO_ESCROW as `0x${string}`,
  });
  console.debug(chain?.name);

  useEffect(() => {
    switch (chain?.name) {
      case "Ethereum":
        setAdresses({
          token: zeroAddress,
          escrow: zeroAddress,
        });
        break;
      case "Alfajores":
        setAdresses({
          token: process.env.NEXT_PUBLIC_CELO_USDT as `0x${string}`,
          escrow: process.env.NEXT_PUBLIC_CELO_ESCROW as `0x${string}`,
        });
        break;
      default:
        return;
    }
  }, [chain]);

  console.debug(addresses);

  const ERC20 = useContractWrite({
    address: addresses.token,
    abi: Abis.USDTCoin,
    functionName: "approve",
  });


  const Escrow = useContractWrite({
    address: addresses.escrow,
    abi: Abis.Escrow,
    functionName: "deposit",
    args: [process.env.NEXT_PUBLIC_ETH_CONTRACT_ADDRESS as `0x${string}`],
  });

  return { ERC20, Escrow };
}

export { useTxn };
