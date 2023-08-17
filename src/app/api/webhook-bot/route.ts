import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request, res: any) {
  if (req.method === "POST") {
    const data = await req.json();
    // await uploadImage(data.photo);
    // // const body = JSON.parse(req.body)
    // // console.log({body})
    console.log({data});
    return NextResponse.json({message: "Hola"});
  } else {
    console.log("Other: ", req.method, { req, res });
  }
}
