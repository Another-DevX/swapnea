import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request, res: any) {
  if (req.method === "POST") {
    const data = await req.json();
    const socket = new WebSocket(process.env.NEXT_PUBLIC_WS as string); 
    
    setTimeout(()=>{
      socket.send( 
        JSON.stringify({ 
          from: "provider", 
          body: data.imageUrl, 
          date: new Date().toLocaleTimeString("en-US", { 
            hour12: false, 
            hour: "2-digit", 
            minute: "2-digit", 
          }), 
          type: "image", 
        }) 
      );
    },2000)
    console.log({data});
    return NextResponse.json({message: "Hola"});
  } else {
    console.log("Other: ", req.method, { req, res });
  }
}
