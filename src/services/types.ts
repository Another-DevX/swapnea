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
  txn: ({ args }: { args: (bigint | `0x${string}`)[] }) => Promise<{
    hash: `0x${string}`;
  }>;
};

export interface approveProps {
  chain: string;
  ammount: number;
  functions: fnArg;
}

export interface transferProps {
  functions: fnStd;
  ammount: number;
  provider: Address
}

export interface Contract_service {
  approve: (props: approveProps) => Promise<`0x${string}` | null>;
  transfer: (props: transferProps) => Promise<`0x${string}` | null>;
}
