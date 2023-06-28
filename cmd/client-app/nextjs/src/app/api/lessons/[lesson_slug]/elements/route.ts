import { LessonClient } from '@/clients/Mediatext';
import { authorize } from '@/errors/http/authorize';
import { authOptions, getUserFromSession } from '@/lib/auth/authoptions';
import { StoreLessonElementRequest } from '@/proto/generated/StoreLessonElementRequest';
import * as grpc from '@grpc/grpc-js';
import { NextResponse } from 'next/server';

const client = new LessonClient(process.env.MEDIATEXT_GRPC_URI ?? "", grpc.credentials.createInsecure())

export async function POST(request: Request) {
  const user = await getUserFromSession(authOptions);
  if (!user) {
    return NextResponse.json(authorize, { status: 401 })
  }

  let rawEl: StoreLessonElementRequest = await request.json()
  if (
    typeof rawEl.lessonId == "undefined"
    || typeof rawEl.name == "undefined"
    || typeof rawEl.slug == "undefined"
    || !Array.isArray(rawEl.rules)
  ) {
    console.log(rawEl)

    return NextResponse.json({ "error": "Invalid request" }, { status: 400 })
  }

  let lesson = await client.FindLessonsAsync({id: rawEl.lessonId})
  if (!lesson || !lesson.items) {
    return NextResponse.json({ "error": "Lesson not found" }, { status: 404 })
  }
  if (lesson.items[0].ownerId != user.id) {
    return NextResponse.json({ "error": "You can't change this lesson" }, { status: 403 })
  }

  let resp = await client.StoreElementAsync(rawEl)

  return NextResponse.json(resp)
}

export async function GET(request: Request, { params }: { params: { lesson_slug: string } }) {
  const els = await client.FindElementsAsync({ lessonId: params.lesson_slug })

  return NextResponse.json(els)
}