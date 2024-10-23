import { cookies } from "next/headers";
import { Account, Client } from "node-appwrite";

import { AUTH_COOKIE } from "./constants";

export async function getUser() {
  try {
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

    const cookieStore = await cookies();
    const session = cookieStore.get(AUTH_COOKIE)?.value;

    if (!session) return null;

    const account = new Account(client);

    client.setSession(session);

    return await account.get();
  } catch {
    return null;
  }
}
