import { getServerSession } from 'next-auth';
import './globals.css'
import { Inter } from 'next/font/google'
import { authOptions, getUserFromSession } from '@/lib/auth/authoptions';
import { LoginButton } from '@/components/auth/LoginButton';
import { AdapterSession } from 'next-auth/adapters';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Lang API - master languages by examples',
  description: 'Watch examples from a huge library of media',
}

function LanguageSelector() {
  return (
    <div className="flex lg:flex-1">
      <div className="relative mt-2">
        <button type="button" className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6" aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label">
          <span className="flex items-center">
            <img src="/world.png" alt="" className="h-5 w-5 flex-shrink-0 rounded-full" />
            <span className="ml-3 block truncate">English</span>
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
            <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clipRule="evenodd" />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getUserFromSession(authOptions);

  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={inter.className + " text-gray-900"}>
        <div className="bg-white min-h-screen">
          <header id="main-header" className="absolute inset-x-0 top-0 z-10">
            <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
              <div className="flex lg:flex-1">
                <a href="/" className="-m-1.5 p-1.5">
                  <span className="sr-only">Lang API</span>
                  <img className="h-8 w-auto" src="/language_1.png" alt="" />
                </a>
              </div>
              <LanguageSelector />
              { user ? 
              <a href="/studio/create-lesson" className="mx-4 relative cursor-default rounded-md bg-white py-1.5 pl-3 pr-3 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">Create a lesson</a>
              : <LoginButton />}

              <div className="lg:flex lg:gap-x-12">
                <a href="https://t.me/borischan" className="text-sm font-semibold leading-6 text-gray-900">Blog</a>
              </div>
            </nav>
          </header>

          <div className="relative isolate px-0 pt-10 lg:px-8">
            <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
              <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" ></div>
            </div>
            <div className="py-10 z-50">
              {children}
            </div>
            <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
              <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" ></div>
            </div>
          </div>
        </div>
        
        <div className="bg-white bg-opacity-0 min-h-screen">
          <div className="px-0 pt-10 lg:px-8">
            <div className="mx-auto container">
              <div className="shadow-xl overflow-hidden sm:rounded-t-lg bg-white  text-left m-auto py-4">
                <div className="bg-white bg-opacity-80 px-4 pb-4 pt-0 p-6 text-white-400 text-lg">
                  <h1 className="text-3xl lg:text-5xl font-semibold mb-4">Практикуй язык на примерах</h1>
                  Сервис для изучения языков на основе множества примеров. Смотрите видео, слушайте аудио и читайте тексты, а сервис подберет вам примеры в соответствии с выбранными фильтрами.
                  <br />
                  Подробности можно узнать на <a className="t text-blue-600" href="http://t.me/borischan">Telegram @borischan</a>
                  <br />
                  <br />
                  <br />
                  <a className="text-black text-sm" href="https://www.flaticon.com/free-icons/translate" title="translate icons">Translate icons created by RA_IC0N21 - Flaticon</a>
                  <a className="text-black text-sm" href="https://www.flaticon.com/free-icons/language" title="language icons">Language icons created by Freepik - Flaticon</a>
                  <a className="text-black text-sm" href="https://www.flaticon.com/free-icons/communications" title="communications icons">Communications icons created by Freepik - Flaticon</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
