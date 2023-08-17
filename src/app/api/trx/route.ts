import { NextResponse } from "next/server";
import axios from "axios";
import { getTrx, createTrx, validateValue } from "../../../../utils/mongo";

export async function POST(req: Request, res: any) {
  const data = await req.json();
  const dataSend = { state: "initial", createdAt: new Date(), ...data };
  const isUsed = await validateValue(data);
  if (!isUsed) return NextResponse.json({ message: "ERROR_PRICE_INCORRECT" });
  const trx = await createTrx(dataSend);
  return NextResponse.json({ message: "created", trx });
}

export async function GET(req: Request, res: any) {
  const trx = await getTrx();
  return NextResponse.json({ message: "ok", trx });
}
