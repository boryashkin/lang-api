import { NextResponse } from 'next/server';
import { authOptions, getUserFromSession } from '@/lib/auth/authoptions';
import { authorize } from '@/errors/http/authorize';
import { mailer } from '@/lib/mailer/mailer';
import { Appeal } from '@/interfaces/Appeal';

export async function POST(request: Request) {
  const user = await getUserFromSession(authOptions);
  if (!user) {
    return NextResponse.json(authorize, { status: 401 })
  }

  const appeal: Appeal = await request.json()
  console.log("appeal", appeal)
  if (typeof appeal.entity != "string") {
    return NextResponse.json({ "error": "Invalid request" }, { status: 400 })
  }

  mailer.send("New Appeal", `User ${user.email} complains about an entity: ${appeal.entity}, id: ${appeal.id}`);

  return NextResponse.json([])
}