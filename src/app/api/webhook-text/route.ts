import { NextResponse } from "next/server";
import axios from "axios";
import { addProvider } from "../../../../utils/mongo";

export async function POST(req: Request, res: any) {
  if (req.method === "POST") {
    const data = await req.json();
    // await uploadImage(data.photo);
    // // const body = JSON.parse(req.body)
    // // console.log({body})
    console.log({data: data.msg.from})
    if (data.text.slice(0,6).toLowerCase() == "price ") {
        const value = data.text.slice(6,data.text.length);
        console.log({value})
        const dataSend = {
            from: data.msg.from.id,
            price: parseInt(value)
        }
        await addProvider(dataSend);
    }
    return NextResponse.json({message: "Hola"});
  } else {
    console.log("Other: ", req.method, { req, res });
  }
}



