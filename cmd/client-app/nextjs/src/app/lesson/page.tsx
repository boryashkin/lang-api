//https://dummyjson.com/products/1
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import Link from 'next/link';

type Repo = {
  name: string;
};

async function getData(): Promise<Repo> {
  const res = await fetch('https://api.github.com/repos/vercel/next.js');
 
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const repo = await res.json(); 
  
  return repo;
}

export default async function Page() {
  const data = await getData();

  return <div><h1>Hello, {data.name}!</h1><Link href='/'>Back home</Link></div>;
}
