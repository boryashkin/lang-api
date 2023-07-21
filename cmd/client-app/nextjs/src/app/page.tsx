import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Languages learning platform',
  description: 'Learn languages with lots of examples. Lessons are highlighted and annotated.',
  openGraph: {
    title: "Languages learning platform",
    description: "Learn languages with lots of examples. Lessons are highlighted and annotated.",
  }
}

export default function Home() {

  return (
    <div className="mx-auto container">
      <div className="relative overflow-hidden sm:rounded-lg bg-white text-left shadow-xl transition-all m-auto">
        <div className="bg-white sm:px-4 pb-4 pt-0 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
              <h3 className="text-base font-semibold leading-6 text-gray-900 lg:text-2xl" id="modal-title">Сервис для изучения языков</h3>
              <div className="mt-2">
                <p className="text-sm lg:text-lg text-gray-500 whitespace-pre-wrap">
                Учите английский на огромном количестве реальных примеров. Здесь вы можете отработать как правила языка, так и произношение.
                <br/>Смотрите видео, слушайте аудио и читайте тексты, а сервис подберет вам примеры в соответствии с выбранными фильтрами.
                
                Нажмите Вперёд, чтобы продолжить.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <Link type="button" href="/lesson/intro/start" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Начать</Link>
        </div>
      </div>
    </div>
  )
}
