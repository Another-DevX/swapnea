import { Contract_service, approveProps, transferProps } from "./types";

async function approve({
  address,
  abi,
  functionName,
  args,
  functions,
}: approveProps) {
  try {
    const data = await functions.txn();
    // Llamadas a apis
    return data.hash;
  } catch (e) {
    console.error(e);
    return null;
  }
}

async function transfer({address, abi, functionName, functions} : transferProps) {
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
