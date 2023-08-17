import { NextResponse } from "next/server";
import axios from "axios";
import { getTrx, createTrx } from "../../../../utils/mongo";

export async function POST(req: Request, res: any) {
  const data = await req.json();
  const dataSend = {state: "initial", createdAt: new Date(), ...data}
  const trx = await createTrx(dataSend);
  return NextResponse.json({ message: "created", trx });
}

export async function GET(req: Request, res: any) {
  const trx = await getTrx();
  return NextResponse.json({ message: "ok", trx });
}
