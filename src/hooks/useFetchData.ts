import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useFetchData<T>(url: string, refreshInterval: number = 5000) {
  const { data, error, isLoading } = useSWR<T>(url, fetcher, {
    refreshInterval,
  });

  return { data, error, isLoading };
}
