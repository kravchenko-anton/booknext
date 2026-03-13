import api from '@/api'
import { useReadingProgressStore } from '@/store/reader/progress-store'
import { QueryKeys } from '@/utils/query-keys'
import { useQuery } from '@tanstack/react-query'

export const useStatisticsWithSync = () => {
  const {
    data: statistics,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: QueryKeys.userStatistics,
    queryFn: () =>
      api.user.statistics(
      ),
    select: (data) => data.data,
    staleTime: 0
  });
  const { syncHistory} = useReadingProgressStore();
  console.log(statistics)

  return { isLoading,syncHistory, statistic: statistics, refetch };
};
