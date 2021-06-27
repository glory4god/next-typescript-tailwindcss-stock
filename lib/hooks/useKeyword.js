import useSWR from 'swr';

const fetcher2 = (...args) => fetch(...args).then((res) => res.json());

export function useKeyword(topic) {
  const { data, error } = useSWR(
    `http://localhost:8080/api/v1/news/pop-url/${topic}`,
    fetcher2,
  );

  return {
    keywordList: data,
    isLoading: !error && !data,
    isError: error,
  };
}
