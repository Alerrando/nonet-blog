import { useQuery } from "@tanstack/react-query";

import { useBlog } from "@/provider/BlogProvider";
import { getAllItems } from "@/services/indexedDB";

export function useQueryAllArticles() {
  const { setArticles } = useBlog();

  const {
    isLoading: isLoadingGetAllArticles,
    error: errorGetAllArticles,
    refetch: refetchGetAllArticles,
  } = useQuery({
    queryKey: ["get-all-articles"],
    queryFn: async () => {
      const response = await getAllItems();
      setArticles(response);
      return response;
    },
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60 * 24,
  });

  return { isLoadingGetAllArticles, errorGetAllArticles, refetchGetAllArticles };
}
