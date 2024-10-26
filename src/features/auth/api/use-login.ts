import { InferRequestType, InferResponseType } from "hono/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<(typeof client.api.auth.login)["$post"]>;
type RequestType = InferRequestType<(typeof client.api.auth.login)["$post"]>;

export const useLogin = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.auth.login.$post({ json });

      if (!response.ok) {
        throw new Error("Failed to log in");
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Logged in successfully");
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ["user"] });
      router.push("/");
    },
    onError: () => {
      toast.error("Failed to log in");
    },
  });

  return mutation;
};

export default useLogin;
