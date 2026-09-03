import { useQuery } from "@tanstack/react-query";
import { axiosAdmin } from "@/services/api";

export const useGetActivityLogs = (params) => {
	return useQuery({
		queryKey: ["activity-logs", params],
		queryFn: () => {
			const queryParams = new URLSearchParams();
			if (params.page) queryParams.append("page", params.page);
			if (params.limit) queryParams.append("limit", params.limit);
			if (params.search) queryParams.append("search", params.search);
			if (params.category) queryParams.append("category", params.category);
			if (params.action) queryParams.append("action", params.action);
			if (params.startDate) queryParams.append("startDate", params.startDate);
			if (params.endDate) queryParams.append("endDate", params.endDate);
			
			return axiosAdmin.get(`/logs?${queryParams.toString()}`);
		},
		keepPreviousData: true,
	});
};
