import { parseEther, zeroAddress } from "viem";
import { Contract_service, approveProps, transferProps } from "./types";
import axios from "axios";

function getTokenAddress(chain: string) {
  switch (chain) {
    case "Ethereum":
      return zeroAddress;
    case "Alfajores":
      return process.env.NEXT_PUBLIC_CELO_ESCROW as string;
      break;
    default:
      return;
  }
}

export async function approve({ ammount, functions, chain }: approveProps) {
  console.debug(functions, chain, ammount);
  try {
    console.debug({
      args: [
        getTokenAddress(chain) as `0x${string}`,
        parseEther((ammount as number).toString()),
      ],
    });
    const data = await functions.txn({
      args: [
        getTokenAddress(chain) as `0x${string}`,
        // @ts-expect-error
        ammount * 10 ** 18,
      ],
    });
    if (!data.hash) throw new Error("Error");
    return data.hash;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function transfer({
  functions,
  ammount,
  provider,
}: transferProps) {
  try {
    const data = await functions.txn({
      args: [parseEther(ammount.toString()), provider],
    });
    if (!data.hash) throw new Error("Error");
    return data.hash;
  } catch (e) {
    console.error(e);
    return null;
  }
}

const ethereum: Contract_service = {
  approve,
  transfer,
};

export default ethereum;
