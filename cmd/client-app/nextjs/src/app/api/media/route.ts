import { MediaTextClient } from '@/clients/Mediatext';
import { NextResponse } from 'next/server';
import * as grpc from '@grpc/grpc-js';
import { Media } from '@/proto/generated/Media';
import { TextType } from '@/interfaces/Text';
import { authOptions, getUserFromSession } from '@/lib/auth/authoptions';
import { authorize } from '@/errors/http/authorize';

grpc.setLogVerbosity(grpc.logVerbosity.DEBUG)
let client = new MediaTextClient(process.env.MEDIATEXT_GRPC_URI ?? "", grpc.credentials.createInsecure())

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const text = searchParams.get('text') ?? "";

  const result = await client.FindMediaAsync({ text: text });

  return NextResponse.json(result?.media ?? [])
}

export async function POST(request: Request) {
  console.log("POST media")
  const user = await getUserFromSession(authOptions);
  if (!user) {
    return NextResponse.json(authorize, { status: 401 })
  }

  const rawMedia: Media = await request.json()
  console.log("request.json", rawMedia)
  if (typeof rawMedia.text == "undefined" || typeof rawMedia.type == "undefined" || rawMedia.type != TextType.Text) {
    return NextResponse.json({ "error": "Invalid request" }, { status: 400 })
  }

  let res = await client.CreateMediaAsync({ text: rawMedia.text, type: rawMedia.type, originalLang: "en" })
  if (!res || !res.result) {
    return NextResponse.json({ "error": "Invalid request" }, { status: 400 })
  }

  res.result.createdAt = null

  return NextResponse.json(res.result)
}