import { useRouter } from "next/navigation";
import { InferResponseType } from "hono/client";
import { toast } from "sonner";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<(typeof client.api.auth.login)["$post"]>;

export const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.auth.logout.$post();

      if (!response.ok) {
        throw new Error("Failed to log out");
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Logged out successfully");
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ["user"] });
      router.push("/sign-in");
    },
    onError: () => {
      toast.error("Failed to log out");
    },
  });

  return mutation;
};

export default useLogout;
