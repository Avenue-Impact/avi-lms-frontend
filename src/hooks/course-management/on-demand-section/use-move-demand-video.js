import { BASE_URL } from "@/constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const moveVideo = async ({ data, section }) => {
  const courseId = localStorage.getItem('courseId')
  const token = Cookies.get('adminToken')

  console.log({
    data,
    section
  })
  const url = `${BASE_URL}/courses/${courseId}/on-demand/sections/${section}/move-video`

  // https://avi-lms-backend.onrender.com/api/v1/admins/courses/:courseId/on-demand/sections/:section/move-video
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
      console.log(data);
      toast.success(data.data.message)

      queryClient.invalidateQueries("get-demand-course")
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
      console.log(data);
      toast.success(data.data.message)

      queryClient.invalidateQueries("get-demand-course")
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
      console.log(data);
      toast.success(data.data.message)

      queryClient.invalidateQueries("get-demand-course")
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
      console.log(data);
      toast.success(data.data.message)

      queryClient.invalidateQueries("get-demand-course")
    },
    onError: (e) => toast.error(e.response.data.message || 'something went wrong'),

  })
  return { moveToBottom, moveBottomStatus }
}