import { NextResponse } from "next/server";
import { updateTrx   } from "../../../../utils/mongo";

export async function POST(req: Request, res: any) {
  const data = await req.json();
  const dataSend = {state: "Etransferred", trxId: data.trxId }
  const trx = await updateTrx(dataSend, data.id);
  return NextResponse.json({ message: "updated", trx });
}

