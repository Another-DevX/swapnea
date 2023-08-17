import { Abi, Address } from "viem";

type fnArg = {
  isLoading: boolean;
  isError: boolean;
  error: any;
  txn: ({ args }: { args: (bigint | `0x${string}`)[] }) => Promise<{
    hash: `0x${string}`;
  }>;
};

type fnStd = {
  isLoading: boolean;
  isError: boolean;
  error: any;
  txn: () => Promise<{
    hash: `0x${string}`;
  }>;
};

export interface approveProps {
  address: Address;
  abi: Abi;
  ammount: number;
  functionName: string;
  functions: fnArg;
}

export interface transferProps {
  address: Address;
  abi: Abi;
  functionName: string;
  functions: fnStd;
}

export interface Contract_service {
  approve: (props: approveProps) => Promise<`0x${string}` | null>;
  transfer: (props: transferProps) => Promise<`0x${string}` | null>;
}
