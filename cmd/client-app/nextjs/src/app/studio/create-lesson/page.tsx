import LessonCreateForm from "@/components/lesson/LessonCreateNameForm";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {

  return (
    <div className="mx-auto container">
      <div className="relative sm:rounded-lg bg-white text-left shadow-xl transition-all m-auto">
        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row sm:px-6">
          <h3>Создание урока</h3>
        </div>
        <div className="bg-white px-4 pb-4 pt-0 sm:p-6 sm:pb-4 flex flex-wrap">
          Назовите урок
        </div>
        <div className="px-4 py-3 sm:flex sm:flex-row sm:px-6">
          <LessonCreateForm />
        </div>
        <div className="bg-white px-4 py-4 pb-4 sm:p-6 sm:pb-4 flex flex-wrap">
          Далее нужно будет выбрать контент
        </div>
      </div>
    </div>
  );
}
