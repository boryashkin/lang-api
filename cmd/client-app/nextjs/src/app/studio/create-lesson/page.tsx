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
          <h3>Create a lesson</h3>
        </div>
        <div className="bg-white px-4 pb-4 pt-0 sm:p-6 sm:pb-4 flex flex-wrap">
          Firstly, give it a name
        </div>
        <div className="px-4 py-3 sm:flex sm:flex-row sm:px-6">
          <LessonCreateForm />
        </div>
        <div className="bg-white px-4 py-4 pb-4 sm:p-6 sm:pb-4 flex flex-wrap">
          Then you will add the content
        </div>
      </div>
    </div>
  );
}
