import { useRouter } from "next/navigation";
import { InferResponseType } from "hono/client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<(typeof client.api.auth.login)["$post"]>;

export const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.auth.logout.$post();
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      router.refresh();
    },
  });

  return mutation;
};

export default useLogout;
