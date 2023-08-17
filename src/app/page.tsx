"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useRouter } from "next/navigation";
import Logo from "@/images/2.png";
import "/node_modules/flag-icons/css/flag-icons.min.css";
export default function Home() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [selections, setSelections] = useState({
    col: false,
    arg: false,
  });
  const handleOnSubmit = (e:any) => {
    e.preventDefault();
    console.debug(e.target.country.value);

    switch (e.target.country.value) {
      case "COL":
        router.push("/transaction/col");
        break;
      case "ARG":
        router.push("/transaction/arg");
        break;
      default:
        break;
    }
  };

  const handleOnChange = (e:ChangeEvent<HTMLInputElement>) => {
    const defaultSelections = {
      col:false,
      arg:false
    }
    console.debug((e.target as HTMLElement).id)
    setSelections({
      ...defaultSelections,
      [(e.target as HTMLElement).id]: true
    })
  };

  useEffect(()=>{
    console.debug(selections)
  },[selections])

  return (
    <>
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed min-h-screen min-w-full flex justify-center items-center z-20 bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-slate-200 rounded-lg w-5/6 p-10 flex flex-col justify-center items-center"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
            >
              <form
                onSubmit={handleOnSubmit}
                className="flex flex-col w-full justify-center items-center gap-3"
              >
                <h1 className="text-4xl font-bold">
                  Primero selecciona tu pais
                </h1>
                <label
                  className="flex w-full flex-row gap-2 justify-between items-center"
                  htmlFor="col"
                >
                  <input
                    type="radio"
                    className="hidden"
                    name="country"
                    value="COL"
                    id="col"
                    onChange={handleOnChange}
                  />
                  <div id="colCont" className={`input-cont ${selections.col && 'active'}`}>
                    <span className="fi fi-co" />
                    Colombia
                  </div>
                </label>
                <label
                  className="flex w-full flex-row gap-2 justify-between items-center"
                  htmlFor="arg"
                >
                  <input
                    type="radio"
                    className="hidden"
                    name="country"
                    value="ARG"
                    id="arg"
                    onChange={handleOnChange}
                  />
                  <div id="argCont" className={`input-cont ${selections.arg && 'active'}`}>
                    <span className="fi fi-ar" /> Argentina
                  </div>
                </label>  
                <button className="main-btn" type="submit">
                  Siguiente
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <main className="bg-slate-200 min-h-screen flex justify-center items-center">
        <div className="w-full flex justify-center items-center top-0 absolute">
          <Image height={128} src={Logo} alt="logo" />
        </div>
        <div className="text-center">
          <h1 className="hex text-2xl font-bold">
            Usa tus criptos en el día a día
          </h1>
          <p className="font-semibold text-[#2B44E7]">Con swapnea revolucionamos el p2p</p>
        </div>
        <div className="absolute bottom-0 w-full justify-between py-5 px-3 flex flex-row">
          <ConnectButton />
          <button onClick={() => setShowModal(true)} className="main-btn">
            Empezar
          </button>
        </div>
      </main>
    </>
  );
}
