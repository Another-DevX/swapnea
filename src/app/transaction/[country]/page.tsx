"use client";
import { ConnectButton, useChainModal } from "@rainbow-me/rainbowkit";
import React, { useCallback, useEffect, useState } from "react";
import ChainButton from "@/components/ChainButton";
import QR from "@/components/QR";
import Image from "next/image";
import Logo from "@/images/2.png";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Page() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const [openCamera, setOpenCamera] = useState(false);
  const [qrStatus, setQrStatus] = useState({
    readed: false,
    error: false,
    data: "",
  });
  const [tokenValue, setTokenValue] = useState(0);

  const handleOnQRScan = (d, t) => {
    console.debug(d, t);
    setOpenCamera(false);
    setQrStatus({
      ...qrStatus,
      readed: true,
      data: d,
    });
  };

  const handleOnPay = (e: any) => {
    e.preventDefault();
    const formattedText = qrStatus.data
      .replace(/\//g, "%2F")
      .replace(/\+/g, "%2B");
    console.debug(
      `${pathname}/chat/?${createQueryString("code", formattedText)}`
    );
    router.push(
      `${pathname}/chat/?${createQueryString("code", formattedText)}`
    );
  };

  function getAcurrancy (){
    const region = pathname.split('/')[pathname.split('/').length - 1]
    switch (region){
      case 'col' : 
        return 'COP'
      case 'arg':
        return 'ARS'
      default:
        return
    }
  }

  return (
    <main className="min-h-screen h-full w-full flex flex-col  items-center gap-2">
      <AnimatePresence>
        {openCamera && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed bg-black top-0 left-0 right-0 bottom-0 bg-opacity-20 flex justify-center items-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className=" bg-white p-5 w-full m-2 rounded-lg"
            >
              <QR
                fps={10}
                qrbox={500}
                disableFlip={false}
                qrCodeSuccessCallback={handleOnQRScan}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="w-full flex justify-center items-center ">
        <Image height={128} src={Logo} alt="logo" />
      </div>
      <div className="h-full flex justify-center items-center">
      <div className="bg-slate-100 p-5 flex flex-col gap-2 justify-center items-center rounded-lg">
        <h1 className="text-4xl">Pasarela de pago</h1>
        <form
          className="flex flex-col justify-center items-start gap-4 w-full"
          onSubmit={handleOnPay}
        >
          <div className="cont">
            <label className="text-lg">Leé tu QR acá</label>

            <button
              onClick={() => setOpenCamera(true)}
              className={`main-btn ${qrStatus.readed && "bg-green-700"}`}
            >
              {qrStatus.readed ? "Leer de nuevo" : "Leer"}
            </button>
          </div>

          <div className="cont">
            <label className="text-lg">Escribí el valor acá</label>
            <input
              className="h-12 rounded-md px-2"
              required
              type="number"
              placeholder={`Monto en ${getAcurrancy()}`}
              inputMode="decimal"
              step={0.0001}
            />
          </div>
          <div className="cont">
            <p>{tokenValue} USDT</p>
            <ChainButton />
          </div>
          <button className="main-btn w-full" type="submit">
            Pagar
          </button>
        </form>
      </div>
      </div>
    </main>
  );
}

export default page;
