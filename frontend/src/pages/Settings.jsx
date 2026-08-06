import MainLayout from "../layouts/MainLayout";

export default function Settings() {
  return (
    <MainLayout>

      <h1 className="text-3xl font-bold mb-6">
        Settings
      </h1>

      <div className="bg-zinc-900 p-8 rounded-xl">

        <p>Theme</p>

        <p className="mt-4">Account</p>

      </div>

    </MainLayout>
  );
}