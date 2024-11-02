import { BASE_URL } from "@/constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const moveSectionApi = async (data) => {
  const courseId = localStorage.getItem("courseId");
  const cohortId = localStorage.getItem("cohortId");

  const url = `${BASE_URL}/courses/${courseId}/cohorts/${cohortId}/move-section`;
  const token = Cookies.get("adminToken");

  return axios.put(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const useMoveRecordedSectionUp = () => {
  const queryClient = useQueryClient();

  const { mutate: moveSectionUp, isPending: isMovingUp } = useMutation({
    mutationFn: moveSectionApi,
    onSuccess: ({ data }) => {
      toast.success(data.message);
      queryClient.invalidateQueries("get-single-cohort");
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });
  return { moveSectionUp, isMovingUp };
};

export const useMoveRecordedSectionDown = () => {
  const queryClient = useQueryClient();

  const { mutate: moveSectionDown, isPending: isMovingDown } = useMutation({
    mutationFn: moveSectionApi,
    onSuccess: ({ data }) => {
      toast.success(data.message);
      queryClient.invalidateQueries("get-single-cohort");
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });
  return { moveSectionDown, isMovingDown };
};

export const useMoveRecordedSectionToTop = () => {
  const queryClient = useQueryClient();

  const { mutate: moveSectionToTop, isPending: isMovingToTop } = useMutation({
    mutationFn: moveSectionApi,
    onSuccess: ({ data }) => {
      toast.success(data.message);
      queryClient.invalidateQueries("get-single-cohort");
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });
  return { moveSectionToTop, isMovingToTop };
};

export const useMoveRecordedSectionToBottom = () => {
  const queryClient = useQueryClient();

  const { mutate: moveSectionToBottom, isPending: isMovingToBottom } =
    useMutation({
      mutationFn: moveSectionApi,
      onSuccess: ({ data }) => {
        toast.success(data.message);
        queryClient.invalidateQueries("get-single-cohort");
      },
      onError: (error) => {
        toast.error(error.response.data.message);
      },
    });
  return { moveSectionToBottom, isMovingToBottom };
};
