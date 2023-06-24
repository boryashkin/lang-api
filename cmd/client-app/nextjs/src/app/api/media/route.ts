import { MediaTextClient } from '@/clients/Mediatext';
import { Media } from '@/proto/generated/Media';
import { NextResponse } from 'next/server';
import * as grpc from '@grpc/grpc-js';

const URI_PREFIX = (process.env.MEDIA_PREFIX_CDN ?? "").replace(/\/$/, '')

grpc.setLogVerbosity(grpc.logVerbosity.DEBUG)
let client = new MediaTextClient(process.env.MEDIATEXT_GRPC_URI ?? "", grpc.credentials.createInsecure())

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const text = searchParams.get('text') ?? "";


  const result = await client.FindMediaAsync({ text: text });
  const results = (result?.media ?? []).map((value: Media) => {
    value.uri = URI_PREFIX + "/" + value.uri
    value.uriThumbnail = URI_PREFIX + "/" + value.uriThumbnail
    return value
  })
  

  return NextResponse.json(results)
}
