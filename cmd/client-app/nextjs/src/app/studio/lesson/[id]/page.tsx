import { Media } from '@/proto/generated/Media';
import MediaListWithCreator from '@/components/media/MediaList';
import { LessonElement } from '@/proto/generated/LessonElement';
import { LessonClient, MediaTextClient } from '@/clients/Mediatext';
import * as grpc from '@grpc/grpc-js';
import { Lesson } from '@/proto/generated/Lesson';
import { TextType } from '@/interfaces/Text';
import { authOptions, getUserFromSession } from '@/lib/auth/authoptions';
import { notFound } from 'next/navigation';

let client = new LessonClient(process.env.MEDIATEXT_GRPC_URI ?? "", grpc.credentials.createInsecure())
let mediaClient = new MediaTextClient(process.env.MEDIATEXT_GRPC_URI ?? "", grpc.credentials.createInsecure())

async function getMedia(text: string, limit: number, offset: number): Promise<Media[]> {
  console.log("getMedia", text)
  const res = await mediaClient.FindMediaAsync({text: text, type: TextType.Video, pagination: {limit: limit, offset: offset}})

  if (!res || !res.media) {
    throw new Error('Failed to fetch data');
  }

  return res.media.map((item) => {
    item.createdAt = null
    return item
  })
}
async function getLesson(lessonId: string): Promise<Lesson> {
  console.log("getLesson", lessonId)
  
  const res = await client.FindLessonsAsync({id: lessonId})

  if (!res || !res.items) {
    throw new Error('Failed to fetch data');
  }
  if (res.items.length != 1) {
    throw new Error('Failed to find the lesson');
  }

  let lessons = res.items.map((item: Lesson) => {
    item.createdAt = null // next.js can't pass objects with methods from server to client 

    return item
  }) ?? []

  return lessons[0]
}
async function getLessonElements(lessonId: string): Promise<LessonElement[]> {
  console.log("getLessonElements", lessonId)
  
  const res = await client.FindElementsAsync({lessonId: lessonId})

  if (!res || !res.items) {
    throw new Error('Failed to fetch data');
  }

  return res.items.map((item: LessonElement) => {
    if (item.media && item.media.createdAt) {
      item.media.createdAt = null
    }
    
    return item
  }) ?? []
}

export default async function Page({
  searchParams, params
}: {
  searchParams: { [key: string]: string | string[] | undefined },
  params: { id: string }
}) {
  console.log("/Page rerender", params.id, searchParams.text)
  let user = await getUserFromSession(authOptions)
  if (!user) {
    return <div>Error: Authorize</div>
  }
  
  let query = ""
  let offset = 0
  let limit = 0
  if (typeof searchParams.text == "object") {
    query = searchParams.text[0] ?? ""
  }
  if (typeof searchParams.text == "string") {
    query = searchParams.text
  }
  if (typeof searchParams.limit == "string") {
    let limitRaw = parseInt(searchParams.limit)
    if (!isNaN(limitRaw)) {
      limit = limitRaw
    }
  }
  if (typeof searchParams.offset == "string") {
    let offsetRaw = parseInt(searchParams.offset)
    if (!isNaN(offsetRaw)) {
      offset = offsetRaw
    }
  }

  const lesson = await getLesson(params.id);
  if (!lesson) {
    notFound();
  }
  if (lesson.ownerId != user.id) {
    return <div>Error: Unauthorized to edit the lesson</div>
  }

  const mediaItems = await getMedia(query, limit, offset);
  const lessonElements = await getLessonElements(params.id);

  return (
    <MediaListWithCreator lesson={lesson} queriedItems={mediaItems} lessonElements={lessonElements} />
  );
}
