import { NextResponse } from "next/server";
import { validateTrx } from "../../../../utils/mongo";
import axios from "axios";
const BOT_TOKEN = "6658789229:AAEooWWQohoWc46yyZxzcb61737Ozjeyz20";
const CHANNEL_ID = "945721251";
const API_URL = `https://api.telegram.org/bot${BOT_TOKEN}`;

export async function POST(req: Request, res: any) {
  const data = await req.json();
  console.log("La data es: ", data);
  const trx = await validateTrx(data.id);
  if (!trx.modifiedCount)
    return NextResponse.json({ message: "TRX_NOT_FOUND" });
  await sendMessage(data.qrInfo, `Categoria: ${data.category}\nPrecio: ${formatNumber(data.price, data.country)}`);
  return NextResponse.json({ message: "updated", trx });
}

const sendMessage = async (qrInfo: string, text: string) => {
  try {
    const qrInfoSend = qrInfo.replace(/\+/g, "%2B");
    const response = await axios.post(`${API_URL}/sendPhoto`, {
      chat_id: CHANNEL_ID,
      caption: text,
      photo: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrInfoSend}`,
    });
    if (response.data.ok) {
      console.log("Message sent successfully.");
    } else {
      console.error("Failed to send message:", response.data.description);
    }
  } catch (e) {
    console.log(e);
  }
};

const formatNumber = (value: number, country: string) => {
    return `$ ${value.toLocaleString('es-ES')} ${country}`
}
