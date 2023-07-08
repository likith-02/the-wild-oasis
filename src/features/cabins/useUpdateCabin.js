import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import { toast } from "react-hot-toast";

export default function useUpdateCabin() {
  const queryClient = useQueryClient();
  const { isLoading: isUpdating, mutate: updateCabin } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("Cabin updated successfully!");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => {
      toast.error(err);
    },
  });
  return { isUpdating, updateCabin };
}
