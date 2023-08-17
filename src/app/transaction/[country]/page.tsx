"use client";
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import ChainButton from "@/components/ChainButton";
import QR from "@/components/QR";
import Image from "next/image";
import Logo from "@/images/2.png";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { useAccount, useNetwork } from "wagmi";
import { approve, transfer } from "@/services/ethereum";
import { useTxn } from "@/hooks/useEthTxn";
import { toast } from "react-toastify";

function Page({ params }: { params: any }) {
  const [openCamera, setOpenCamera] = useState(false);
  const [qrStatus, setQrStatus] = useState({
    readed: false,
    error: false,
    data: "",
  });
  const [localCurrencyValue, setLocalCurrencyValue] = useState("");
  const [tokenValue, setTokenValue] = useState(0);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;

  const [status, setStatus] = useState({
    data: null,
    isLoading: true,
    isError: false,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`/api/trx?country=${params.country}`);
        setStatus({
          data: response.data.trx,
          isLoading: false,
          isError: false,
        });
      } catch (e) {
        setStatus({
          data: null,
          isLoading: false,
          isError: true,
        });
      }
    }
    fetchData();
  }, []);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      // @ts-expect-error
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handleOnQRScan = (d: string, t: any) => {
    console.debug(d, t);
    setOpenCamera(false);
    setQrStatus({
      ...qrStatus,
      readed: true,
      data: d,
    });
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (status.data === undefined || status.data === null)
      return setTokenValue(0);
    const inputValue = parseFloat(e.target.value); // Convertir el valor a número
    setLocalCurrencyValue(e.target.value);
    if (isNaN(inputValue)) {
      return; // Salir si el valor no es un número
    }

    // @ts-expect-error
    const calculatedValue = inputValue / status.data.price;
    setTokenValue(Number(calculatedValue.toFixed(2)));
  };

  const { address } = useAccount();
  const { chain } = useNetwork();
  const { ERC20, Escrow } = useTxn();

  const handleOnPay = async (e: any) => {
    e.preventDefault();
    const formattedText = qrStatus.data
      .replace(/\//g, "%2F")
      .replace(/\+/g, "%2B");

    try {
      toast.loading("Enviando la transaccion", {
        toastId: "txn",
      });
      if (!status.data) {
        throw new Error("Failed to load the txn data");
      }
      // @ts-expect-error
      const tokenAmmount = parseFloat(localCurrencyValue) / status.data.price;
      const data = await axios.post("/api/trx", {
        // @ts-expect-error
        provider: status.data.from,
        address: address,
        currency: "USDT",
        network: chain?.name,
        amount: localCurrencyValue,
        amountUsed: tokenAmmount,
      });
      console.debug(data);
      await approve({
        ammount: tokenAmmount,
        functions: {
          isLoading: Escrow.isLoading,
          isError: Escrow.isError,
          error: Escrow.error,
          txn: Escrow.writeAsync,
        },
        chain: chain?.name as string,
      });
      await transfer({
        ammount: tokenAmmount,
        provider: data.data.address,
        functions: {
          isLoading: Escrow.isLoading,
          isError: Escrow.isError,
          error: Escrow.error,
          txn: Escrow.writeAsync,
        },
      });
      await axios.post("/api/txn-finish", {
        // @ts-expect-error
        id: status.data.from,
        qrInfo: qrStatus.data,
        category: "Cerveza",
        price: localCurrencyValue,
        country: params.country === "col" ? "COP" : "ARP",
      });
      toast.success("Transaccion en proceso", {
        toastId: "txn",
        autoClose: 2000,
        onClose: () =>
          router.push(
            `${pathname}/chat/?${createQueryString("code", formattedText)}`
          ),
      });
    } catch (e) {
      toast.error("Transaccion fallida", {
        toastId: "txn",
        autoClose: 2000,
      });
      console.error(e);
    }
  };

  function getAcurrancy() {
    const region = pathname.split("/")[pathname.split("/").length - 1];
    switch (region) {
      case "col":
        return "COP";
      case "arg":
        return "ARS";
      default:
        return;
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
                value={localCurrencyValue}
                onChange={handleOnChange}
                placeholder={`Monto en ${getAcurrancy()}`}
              />
            </div>
            <div className="cont">
              {!status.isLoading ? (
                status.isError ? (
                  <p>Error al cargar los precios</p>
                ) : (
                  <p>{tokenValue} USDT</p>
                )
              ) : (
                <p>Cargando...</p>
              )}
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

export default Page;
