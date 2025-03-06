import useSWR from "swr"

export default function Markets() {

    const fetcher = (...args: [string, RequestInit?]) => fetch(...args).then(res => res.json())
    const { data, error } = useSWR("https://api.bitpin.org/v1/mkt/markets/", fetcher)


    return (
        <div>markets page</div>
    )
}