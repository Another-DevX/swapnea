"use client";
import { ConnectButton, useChainModal } from "@rainbow-me/rainbowkit";
import React, { useState } from "react";
import ChainButton from "@/components/ChainButton";
function page() {
  const { openChainModal } = useChainModal();

  const [tokenValue, setTokenValue] = useState(0);
  return (
    <main className="min-h-screen w-full flex flex-col justify-center items-center gap-2">
      <div>
        <h1 className="text-4xl">Pasarela de pago</h1>
        <form
          className="flex flex-col justify-center items-start gap-2 w-full"
          action=""
        >
          <label htmlFor="">Leé tu QR acá</label>
          <label htmlFor="">Escribí el valor acá</label>
          <input
            required
            type="number"
            placeholder="Monto en USD"
            inputMode="decimal"
            step={0.0001}
          />
          <p>{tokenValue} USDT</p>
          <ChainButton />
          <button className="main-btn" type="submit">
            Pagar
          </button>
        </form>
      </div>
    </main>
  );
}

export default page;
