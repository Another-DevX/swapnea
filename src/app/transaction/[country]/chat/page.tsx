"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { FaPaperPlane } from "react-icons/fa";
import { Economica } from "next/font/google";
import axios from "axios";
import { toast } from "react-toastify";

function Page() {
  const searchParams = useSearchParams();
  const data = searchParams.get("code");
  const id = searchParams.get("id")

  const [messages, setmessages] = useState<any[]>([
    JSON.stringify({
      from: "admin",
      body: "Bienvenido a swapnea!",
      date: "00:20",
      type: "text",
    }),
  ]);
  const [currentMessage, setCurrentMessage] = useState<any>({
    from: "user",
    body: "",
    type: "text",
  });
  const socket = new WebSocket(process.env.NEXT_PUBLIC_WS as string);

  const handleOnChange = (e: any) => {
    setCurrentMessage({
      from: "user",
      body: e.target.value,
      type: "text",
    });
  };
  useEffect(() => {
    const handleOpen = () => {
      const formattedTime = new Date().toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      });

      const formatedBody = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${data?.replace(
        /%2F/g,
        "/"
      )}`;
      socket.send(
        JSON.stringify({
          from: "user",
          body: formatedBody,
          date: formattedTime,
          type: "image",
        })
      );
    };
    socket.addEventListener("open", handleOpen);
    return () => {
      socket.removeEventListener("open", handleOpen);
    };
  }, []);

  useEffect(() => {
    console.debug(JSON.stringify(messages));

    const handleMessage = (event: any) => {
      const newMessages = [...messages, event.data];
      console.debug("DATA", newMessages);
      setmessages(newMessages);
    };

    socket.addEventListener("message", handleMessage);

    return () => {
      socket.removeEventListener("message", handleMessage);
    };
  }, [messages]);

  const sendMessage = () => {
    if (!currentMessage.body || socket.readyState !== 1) return;
    const formattedTime = new Date().toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    });
    console.debug(formattedTime);
    socket.send(JSON.stringify({ ...currentMessage, date: formattedTime }));
    setCurrentMessage({
      from: "user",
      body: "",
    });
  };


  const handleOnFinally = async () => {
    toast.loading('Finalizando transaccion',{
      toastId:'trx'
    })
    console.debug({
      trxId: '001',
      id
    })
    await axios.post('/api/trx-approve',{
      trxId: '001',
      id
    })
    toast.success('Nos vemos de nuevo',{
      toastId:'trx'
    })
  };

  return (
    <main className="h-screen flex justify-center  bg-slate-200">
      <div className="w-full max-w-lg max-h-full h-full flex flex-col">
        <div className="flex flex-row justify-between px-5  items-center bg-zinc-600 shadow-lg py-5">
          <div className="text-white flex flex-row items-center justify-center gap-2">
            <input type="checkbox" name="TXNFailed" id="checkTxn" />
            <label htmlFor="checkTxn">
              <p className="break-words max-w-[80%]  text-xs text-zinc-400 font-bold">
                El dinero aun no ha llegado y el proveedor no responde
              </p>
            </label>
          </div>
          <button onClick={handleOnFinally} className="main-btn">
            Finalizar
          </button>
        </div>
        <ul className="h-full flex flex-col  justify-end overflow-y-scroll ">
          {messages.map((message, i) => (
            <motion.li
              initial={{
                x: JSON.parse(message).from === "user" ? "-100%" : "100%",
              }}
              animate={{ x: "0%" }}
              key={i}
              className={`my-2 p-3 max-w-[80vw] h-auto text-md font-medium rounded-md  ${
                JSON.parse(message).from === "user"
                  ? "bg-sky-950 ml-auto rounded-ee-none mr-5"
                  : "bg-sky-700 ml-5 rounded-es-none"
              }`}
            >
              {JSON.parse(message).type === "text" ? (
                <>
                  <p className="text-md max-w-full break-words font-light text-white">
                    {JSON.parse(message).body}
                  </p>
                  <span className="text-xs max-w-full mt-1 text-end font-medium text-teal-300 block">
                    {JSON.parse(message).date}
                  </span>
                </>
              ) : (
                <>
                  <img alt="image" src={JSON.parse(message).body} />
                  <span className="text-xs max-w-full mt-1 text-end font-medium text-teal-300 block">
                    {JSON.parse(message).date}
                  </span>
                </>
              )}
            </motion.li>
          ))}
        </ul>
        <div className="min-w-full flex flex-row justify-between gap-1  items-center bg-zinc-700">
          <input
            placeholder="Escribi un nuevo mensaje"
            value={currentMessage.body}
            onChange={handleOnChange}
            id="newMessage"
            type="text"
            className="border-none rounded-md text-xl  p-2 h-16 w-full bg-transparent text-neutral-100 outline-none"
          />
          <button
            onClick={sendMessage}
            className="text-white w-16 h-16 text-2xl grid place-content-center"
            type="submit"
          >
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </main>
  );
}

export default Page;
