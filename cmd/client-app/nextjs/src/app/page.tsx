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

// todo: move to https://www.tailwindawesome.com/resources/simple-light/demo
export default function Home() {

  return (
    <div className="mx-auto container">
      <div className="relative overflow-hidden text-left">
        <div className="sm:px-4 pb-4 pt-0 sm:p-6 sm:pb-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

            <div className="col-span-2 p-4 shadow-md sm:shadow-xl transition-all bg-white sm:rounded-lg  mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
              <h3 className="text-xl font-semibold leading-6 text-gray-900 lg:text-2xl" id="modal-title">Уроки и презентации от профессионалов</h3>
              <div className="mt-2">
                <p className="text-sm lg:text-lg text-gray-500 whitespace-pre-wrap">
                  Учите <span className="border-dashed border-b" title="И не только"><i>английский</i></span> на огромном количестве реальных примеров. Здесь вы можете отработать как правила языка, так и произношение.
                  <br />Смотрите видео, слушайте аудио и читайте тексты, а сервис подберет вам примеры в соответствии с выбранными фильтрами.

                  Нажмите Вперёд, чтобы продолжить.
                </p>
              </div>
            </div>

            <div className="col-span-1 p-4 shadow-md sm:shadow-xl transition-all bg-white sm:rounded-lg mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
              <h3 className="font-semibold leading-6 text-gray-900 text-xl lg:text-2xl mb-2" id="modal-title">Попробуйте!</h3>
              <form>
                <input name="email" className="w-full px-2 py-4 border rounded-md border-gray-200 mb-4" placeholder="Enter an email" />
                <button className="w-full z-50 relative block justify-center rounded-md bg-opacity-50 bg-white px-w py-4 text-xs font-light text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Войти</button>
              </form>
            </div>

            <div></div>

            <div></div>

            <div className="col-span-1 p-4 shadow-md sm:shadow-xl transition-all bg-white sm:rounded-lg mt-2 text-center sm:ml-4 sm:mt-0 sm:text-left">
              <h3 className="text-base font-semibold leading-6 text-gray-900 lg:text-xl" id="modal-title">Лёгкий просмотр</h3>
              <div className="sm:flex sm:flex-auto gap-x-4">
                <ul className="">
                  <li>Функциональный дизайн</li>
                  <li>Работает на мобильных</li>
                  <li>Быстро грузится</li>
                  <li>Легко делиться</li>
                  <li>Можно пересматривать</li>
                </ul>
                <video className="sm:w-1/2" src="/media/langapi_ad_5.mp4" autoPlay={true} loop={true} muted={true}></video>
              </div>
            </div>

          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <Link type="button" href="/lesson/intro/start" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Начать 50₽</Link>
        </div>
      </div>
    </div>
  )
}
