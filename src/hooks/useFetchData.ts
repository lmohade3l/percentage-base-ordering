import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useFetchData<T>(
  endpoint: string,
  refreshInterval: number = 5000
) {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const fullUrl = `${baseUrl}${endpoint}`;

  const { data, error, isLoading } = useSWR<T>(fullUrl, fetcher, {
    refreshInterval,
  });

  return { data, error, isLoading };
}
