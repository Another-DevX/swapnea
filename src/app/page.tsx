"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  const [showModal, setShowModal] = useState(false);
  const handleOnSubmit = ()=>{
    
  }
  return (
    <>
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed min-h-screen min-w-full flex justify-center items-center bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-slate-200 rounded-lg p-10 flex flex-col justify-center items-center"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
            >
              <form onSubmit={handleOnSubmit} className="flex flex-col justify-center items-center gap-3">
                <h1 className="text-4xl font-bold">
                  Primero selecciona tu pais
                </h1>
                <label className="flex flex-row gap-2 justify-center items-center" htmlFor="">
                  <input type="radio" name="country" value="COL" id="" />
                  Colombia
                  <br />
                </label>
                <label className="flex flex-row gap-2 justify-center items-center" htmlFor="">
                  <input type="radio" name="country" value="ARG" id="" />
                  Argentina <br />
                </label>
                <button className="main-btn" type="submit">Siguiente</button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <main className="flex min-h-   <h1>Hola</h1>een flex-col items-center justify-center p-24">
        <nav className="fixed top-0 w-full py-10 flex justify-end px-5 items-center shadow-xl h-2" >
        <ConnectButton />
        </nav>
        <div className="w-full h-full gap-2 flex flex-col justify-center items-start">
          <h1 className="text-4xl font-bold text-blue-800">Swapnea</h1>
          <p className="text-2xl font-thin">Tus cripto a la mano</p>
          <button className="main-btn" onClick={() => setShowModal(true)}>Empezar</button>
        </div>
      </main>
    </>
  );
}
