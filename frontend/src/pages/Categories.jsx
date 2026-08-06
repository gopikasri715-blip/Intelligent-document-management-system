import MainLayout from "../layouts/MainLayout";

export default function Categories() {
  return (
    <MainLayout>

      <h1 className="text-3xl font-bold mb-6">
        Categories
      </h1>

      <div className="grid grid-cols-4 gap-4">

        <div className="bg-zinc-900 p-6 rounded-xl">
          Finance
        </div>

        <div className="bg-zinc-900 p-6 rounded-xl">
          Academic
        </div>

        <div className="bg-zinc-900 p-6 rounded-xl">
          HR
        </div>

        <div className="bg-zinc-900 p-6 rounded-xl">
          Personal
        </div>

      </div>

    </MainLayout>
  );
}