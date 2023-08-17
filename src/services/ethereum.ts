import { parseEther } from "viem";
import { Contract_service, approveProps, transferProps } from "./types";
import axios from "axios";

async function approve({
  ammount,
  functions,
}: approveProps) {
  try {
    const data = await functions.txn({
        args: [
            process.env.NEXT_PUBLIC_ETH_CONTRACT_ADDRESS as `0x${string}`,
            parseEther((ammount as number).toString()),
          ],
    });
    return data.hash;
  } catch (e) {
    console.error(e);
    return null;
  }
}

async function transfer({functions} : transferProps) {
    try{
        const data = await functions.txn()
        return data.hash
    }catch(e){
        console.error(e)
        return null
    }
}

const ethereum: Contract_service = {
  approve,
  transfer,
};

export default ethereum;
