import LessonListContainer from '@/components/lesson/LessonHolder';
import Text, { TextType } from '@/interfaces/Text';
import Link from 'next/link';

const defaultText: Text = {
  id: "1",
  slug: "1",
  posterUri: "",
  mediaUri: "",
  title: "Сервис для изучения языков",
  text: "Учите английский на огромном количестве реальных примеров. Здесь вы можете отработать как правила языка, так и произношение.\n\nСмотрите видео, слушайте аудио и читайте тексты, а сервис подберет вам примеры в соответствии с выбранными фильтрами.\nНажмите Вперёд, чтобы продолжить.",
  rules: [
    { text: "Учите английский на огромном количестве ", ruleDescription: "", ruleName: "", color: "" },
    { text: "реальных примеров", ruleDescription: "Примеры взяты из сериалов, фильмов, блогов и подкастов", ruleName: "Описание", color: "red" },
    { text: ". Здесь вы можете отработать как правила языка, так и произношение. \n\nСмотрите видео, слушайте аудио и читайте тексты, а сервис подберет вам примеры в соответствии с ", ruleDescription: "", ruleName: "", color: "" },
    { text: "выбранными фильтрами", ruleDescription: "Например, можно выбрать времена (12 english tenses), части речи, языковые конструкции и т.п.", ruleName: "Функционал фильтров", color: "cyan" },
    { text: ".\n", ruleDescription: "", ruleName: "", color: "" },
    { text: "Нажмите Вперёд", ruleDescription: "Кнопка Вперёд перенесет вас на следующий пример", ruleName: "Механика", color: "" },
    { text: ", чтобы продолжить.", ruleDescription: "", ruleName: "", color: "" },
  ],
  type: TextType.Text,
};

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
