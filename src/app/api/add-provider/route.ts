
import { NextResponse } from "next/server";
import axios from "axios";
import { addProvider } from "../../../../utils/mongo";

export async function POST(req: Request, res: any) {
  if (req.method === "POST") {
    const data = await req.json();
    // await uploadImage(data.photo);
    // // const body = JSON.parse(req.body)
    // // console.log({body})
    await addProvider(data);
    return NextResponse.json("Hola");
  } else {
    console.log("Other: ", req.method, { req, res });
  }
}