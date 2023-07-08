import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";
import { toast } from "react-hot-toast";

export default function useUpdateSetting() {
  const queryClient = useQueryClient();
  const { isLoading: isUpdating, mutate: updateSetting } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success("Settings updated successfully!");
      queryClient.invalidateQueries({
        queryKey: ["Settings"],
      });
    },
    onError: (err) => {
      toast.error(err);
    },
  });
  return { isUpdating, updateSetting };
}
