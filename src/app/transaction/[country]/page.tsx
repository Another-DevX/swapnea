import { ConnectButton } from '@rainbow-me/rainbowkit'
import React from 'react'

function page() {
  return (
    <main>
        <h1>Pasarela de pago</h1>
        <form action="">
            <label htmlFor="">Escribí el valor acá</label>
            <input required type="number" placeholder='Monto en USD' inputMode='decimal' step={0.0001} />
            <p>4,5 USDT</p>
            <ConnectButton/>
            <button type='submit' >Pagar</button>
        </form>
    </main>
  )
}

export default page