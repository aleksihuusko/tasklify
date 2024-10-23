import { redirect } from "next/navigation";

import { getUser } from "@/features/auth/actions";
import { SignInCard } from "@/features/auth/components/sign-in-card";

export default async function SignInPage() {
  const user = await getUser();

  if (user) redirect("/");

  return <SignInCard />;
}
