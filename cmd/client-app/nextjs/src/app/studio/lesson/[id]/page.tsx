import { Media } from '@/proto/generated/Media';
import MediaList from '@/components/media/MediaList';

async function getData(text: string): Promise<Media[]> {
  const res = await fetch('http://localhost:3000/api/media?text=' + text);

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const repo : Media[] = await res.json();

  return repo;
}

export default async function Page({
  searchParams, params
}: {
  searchParams: { [key: string]: string | string[] | undefined },
  params: { id: string }
}) {
  console.log("/Page rerender", params.id, searchParams.text)
  let query = ""
  if (typeof searchParams.text == "object") {
    query = searchParams.text[0] ?? ""
  }
  if (typeof searchParams.text == "string") {
    query = searchParams.text
  }
  const mediaItems = await getData(query);

  return (
    <MediaList lessonId={params.id} items={mediaItems} />
  );
}
