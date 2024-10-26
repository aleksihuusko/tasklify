import { redirect } from "next/navigation";

import { getUser } from "@/features/auth/actions";
import CreateWorkspaceForm from "@/features/workspaces/components/create-workspace-form";

export default async function HomePage() {
  const user = await getUser();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div className="bg-muted p-4">
      <h1 className="text-2xl font-semibold">Home</h1>
      <CreateWorkspaceForm />
    </div>
  );
}
