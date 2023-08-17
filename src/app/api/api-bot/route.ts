const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios");

// Token de acceso de tu bot (obtenido de BotFather)
const token = "6658789229:AAEooWWQohoWc46yyZxzcb61737Ozjeyz20";

// URL del webhook donde enviarás las imágenes
const webhookUrl = "https://15ff24076aa6.ngrok.app/api/webhook-bot";
const webhookUrlText = "https://15ff24076aa6.ngrok.app/api/webhook-text";

import { NextResponse } from "next/server";

export async function POST(req: Request, res: any) {
  if (req.method === "POST") {
    const bot = new TelegramBot(token, { polling: true });
    bot.on("message", async (msg: any) => {
      if (msg.photo) {
        // Obtener la información de la imagen más grande
        const photo = msg.photo.pop();
        const imageUrl = await bot.getFileLink(photo.file_id);

        // Enviar la imagen al webhook
        try {
          await axios.post(webhookUrl, { imageUrl });
          console.log("Imagen enviada al webhook:", imageUrl);
        } catch (error) {
          console.error("Error al enviar la imagen al webhook:", error);
        }
      } else if (msg.text) {
        const text = msg.text;
        // Enviar el texto al webhook
        try {
          await axios.post(webhookUrlText, { text, msg });
          console.log("Texto enviado al webhook:", text);
        } catch (error) {
          console.error("Error al enviar el texto al webhook:", error);
        }
      }
    });
    return NextResponse.json({ message: "Hola" });
  } else {
    console.log("Other: ", req.method, { req, res });
  }
}
