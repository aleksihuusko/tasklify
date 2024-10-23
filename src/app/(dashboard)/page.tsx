import { redirect } from "next/navigation";

import { getUser } from "@/features/auth/actions";

export default async function HomePage() {
  const user = await getUser();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold">Home</h1>
    </div>
  );
}
