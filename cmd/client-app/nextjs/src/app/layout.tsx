import './globals.css'
import { Inter } from 'next/font/google'


const prefix = (process.env.ASSET_PREFIX_CDN ?? "").replace(/\/$/, '')

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'LangAPI - master languages by examples',
  description: 'Watch examples from a huge library of media',
}

function LanguageSelector() {
  return (
    <div className="flex lg:flex-1">
      <div className="relative mt-2">
        <button type="button" className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6" aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label">
          <span className="flex items-center">
            <img src={prefix + "/world.png"} alt="" className="h-5 w-5 flex-shrink-0 rounded-full"/>
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="bg-white min-h-screen">
          <header className="absolute inset-x-0 top-0 z-50">
            <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
              <div className="flex lg:flex-1">
                <a href="/" className="-m-1.5 p-1.5">
                  <span className="sr-only">Lang API</span>
                  <img className="h-8 w-auto" src={prefix + "/language_1.png"} alt=""/>
                </a>
              </div>
              <LanguageSelector/>
              
              <div className="lg:flex lg:gap-x-12">
                <a href="https://t.me/borischan" className="text-sm font-semibold leading-6 text-gray-900">Blog</a>
              </div>
            </nav>
          </header>

          <div className="relative isolate px-0 pt-10 lg:px-8">
          <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
              <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" ></div>
          </div>
          <div className="py-10">
          {children}
          </div>
          <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
              <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" ></div>
            </div>  
          </div>
        </div>
        <div className="bg-white bg-opacity-10 min-h-screen">
          <div className="relative isolate px-0 pt-10 lg:px-8">
            <div id="lesson_container" className="mx-auto container">
              <div className="relative overflow-hidden sm:rounded-t-lg bg-white bg-opacity-0 text-left transition-all m-auto py-4">
                <div className="bg-white bg-opacity-0 px-4 pb-4 pt-0 p-6 text-white-400 text-lg">
                  <h1 className="text-3xl lg:text-5xl font-semibold mb-4">Практикуй язык на примерах</h1>
                  Сервис для изучения языков на основе множества примеров. Смотрите видео, слушайте аудио и читайте тексты, а сервис подберет вам примеры в соответствии с выбранными фильтрами.
                  <br/>
                  Подробности можно узнать на <a className="t text-blue-600" href="http://t.me/borischan">Telegram @borischan</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
