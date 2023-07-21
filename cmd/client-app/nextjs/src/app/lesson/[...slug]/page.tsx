import { LessonClient } from '@/clients/Mediatext';
import LessonListContainer from '@/components/lesson/LessonHolder';
import Lesson from '@/interfaces/Lesson';
import Text, { TextType } from '@/interfaces/Text';
import { notFound, redirect } from 'next/navigation';
import * as grpc from '@grpc/grpc-js';
import { HydrateTextWithRules } from '@/helpers/LessonHelpers';
import { Metadata } from 'next';

let client = new LessonClient(process.env.MEDIATEXT_GRPC_URI ?? "", grpc.credentials.createInsecure())

export const metadata: Metadata = {
  title: 'My lesson',
  description: 'A lesson with highlighted text and media examples',
}

async function getLessonEnriched(slug: string): Promise<Lesson | undefined> {
  const lessons = await client.FindLessonsAsync({ slug: slug })
  if (!lessons || !lessons.items || lessons.items.length != 1) {
    return undefined
  }
  console.log("getLessonEnriched", "FindLessonsAsync", lessons.items.length)
  const lessonRaw = lessons.items[0]
  const els = await client.FindElementsAsync({ lessonId: lessonRaw.id })
  console.log("getLessonEnriched", "FindElementsAsync", lessonRaw.id, els?.items?.length ?? 0)

  let lesson: Lesson = {
    slug: lessonRaw.slug ?? "",
    name: lessonRaw.name ?? "",
    description: lessonRaw.description ?? "",
    language: "todo",
    texts: []
  }

  if (!els || !els.items) {
    return lesson
  }

  lesson.texts = els.items.map((element) => {
    let text: Text = {
      id: element.id ?? "",
      slug: element.slug ?? "no-slug",
      posterUri: element.media?.uriThumbnail ?? "",
      mediaUri: element.media?.uri ?? "",
      title: element.name ?? "",
      text: element.media?.text ?? "",
      type: (element.media?.type ?? TextType.Text) as TextType,
      rules: []
    }

    return HydrateTextWithRules(text, element.rules ?? [])
  })

  return lesson;
}

export default async function Page({ params }: { params: { slug: string[] } }) {
  console.log("lesson/slug rerender", params)
  const lessonSlug = params.slug[0]
  const elementSlug = params.slug[1]

  if (!lessonSlug) {
    notFound();
  }

  const lesson = await getLessonEnriched(lessonSlug);
  if (!lesson || lesson.texts.length < 1) {
    return notFound()
  }

  let tmpIdx = 0
  if (!elementSlug) {
    lesson.texts.unshift({
      id: "intro",
      slug: "intro",
      posterUri: "",
      mediaUri: "",
      title: lesson.name,
      text: lesson.description,
      rules: [
        {
          ruleName: "",
          ruleDescription: "",
          text: lesson.description,
          color: "",
        }
      ],
      type: TextType.Text,
    })
  } else {
    tmpIdx = lesson.texts.findIndex((element: Text) => element.slug == elementSlug)
    if (tmpIdx < 0 || tmpIdx >= lesson.texts.length - 1) {
      redirect("/lesson/" + lesson.slug)
    }
  }
  let currentText = lesson.texts[tmpIdx]

  metadata.title = currentText.title
  if (metadata.title == "") {
    metadata.title = "Check my lesson"
  }
  metadata.description = "Learn about: " + currentText.text.substring(0, 120)
  metadata.openGraph = {
    title: metadata.title,
    description: metadata.description,
  }

  return (
    <div>
      <LessonListContainer currentText={currentText} tmpVideos={lesson.texts} />
    </div>
  );
}
