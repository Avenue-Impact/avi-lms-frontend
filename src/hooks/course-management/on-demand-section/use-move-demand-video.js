import { BASE_URL } from "@/constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const moveVideo = async ({ data, section, courseId }) => {
  const token = Cookies.get('adminToken')


  const url = `${BASE_URL}/courses/${courseId}/on-demand/sections/${section}/move-video`


  return await axios.put(
    url,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
}

export const useMoveDown = () => {
  const queryClient = useQueryClient()

  const { mutate: moveDown, status: moveDownStatus } = useMutation({
    mutationFn: moveVideo,
    onSuccess: (data) => {
      toast.success(data.data.message)

      queryClient.invalidateQueries({ queryKey: ["get-demand-course"] });
    },
    onError: (e) => toast.error(e.response.data.message || 'something went wrong'),


  })
  return { moveDown, moveDownStatus }
}

export const useMoveUP = () => {
  const queryClient = useQueryClient()

  const { mutate: moveUP, status } = useMutation({
    mutationFn: moveVideo,
    onSuccess: (data) => {
      toast.success(data.data.message)

      queryClient.invalidateQueries({ queryKey: ["get-demand-course"] });
    },
    onError: (e) => toast.error(e.response.data.message || 'something went wrong'),


  })
  return { moveUP, status }
}



export const useMoveTop = () => {

  const queryClient = useQueryClient()

  const { mutate: moveTop, status: moveTopStatus } = useMutation({
    mutationFn: moveVideo,
    onSuccess: (data) => {
      toast.success(data.data.message)

      queryClient.invalidateQueries({ queryKey: ["get-demand-course"] });
    },
    onError: (e) => toast.error(e.response.data.message || 'something went wrong'),


  })
  return { moveTop, moveTopStatus }
}


export const useMoveBottom = () => {
  const queryClient = useQueryClient()

  const { mutate: moveToBottom, status: moveBottomStatus } = useMutation({
    mutationFn: moveVideo,
    onSuccess: (data) => {
      toast.success(data.data.message)

      queryClient.invalidateQueries({ queryKey: ["get-demand-course"] });
    },
    onError: (e) => toast.error(e.response.data.message || 'something went wrong'),

  })
  return { moveToBottom, moveBottomStatus }
}

export const useReorderOndemandVideos = () => {
  const queryClient = useQueryClient();

  const { mutate: reorderVideos, isPending: isReordering } = useMutation({
    mutationFn: async ({ courseId, section, videoIds }) => {
      const token = Cookies.get("adminToken");
      const url = `${BASE_URL}/courses/${courseId}/on-demand/sections/${section}/reorder-recordings`;
      return await axios.patch(
        url,
        { videoIds },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    },
    onSuccess: (data) => {
      toast.success(data.data.message);
      queryClient.invalidateQueries({ queryKey: ["get-demand-course"] });
    },
    onError: (e) => toast.error(e.response?.data?.message || "something went wrong"),
  });

  return { reorderVideos, isReordering };
};