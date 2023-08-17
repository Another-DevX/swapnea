import { NextResponse } from "next/server";
import axios from "axios";

const BOT_TOKEN = "6658789229:AAEooWWQohoWc46yyZxzcb61737Ozjeyz20";
const CHANNEL_ID = "945721251";
const API_URL = `https://api.telegram.org/bot${BOT_TOKEN}`;

export async function POST(req: Request, res: any) {
  if (req.method === "POST") {
    const data = await req.json();
    // await uploadImage(data.photo);
    // // const body = JSON.parse(req.body)
    // // console.log({body})
    await sendMessage(data.qrInfo, data.category);
    return NextResponse.json("Hola");
  } else {
    console.log("Other: ", req.method, { req, res });
  }
}

const sendMessage = async (qrInfo: string, category: string) => {
  try {
    const qrInfoSend = qrInfo.replace(/\+/g, "%2B");
    const response = await axios.post(`${API_URL}/sendPhoto`, {
      chat_id: CHANNEL_ID,
      caption: category,
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

const uploadImage = async (BASE64_IMAGE: string) => {
  const API_KEY = "682cdfa4558923afa6aa21a5a38e4c1f";
  const myImage = Buffer.from(BASE64_IMAGE, "base64");
  try {
    const response = await axios.post(
      `https://api.imgbb.com/1/upload?expiration=600&key=${API_KEY}&image=${BASE64_IMAGE}`
    );
    console.log({ response });
    if (response.data.status === 200) {
      console.log("Imagen subida exitosamente.");
      console.log("URL de la imagen:", response.data.data.url);
    } else {
      console.error("Error al subir la imagen:", response.data.error.message);
    }
  } catch (error: any) {
    console.error("Error en la solicitud:", error.message);
  }
};

export function GET() {
  console.log("Hol");
  return NextResponse.json("Hola");
}
