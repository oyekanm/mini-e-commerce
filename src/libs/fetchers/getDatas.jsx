import axios from "axios"
import useSWR from "swr"

export const FetchData = (url) => {


    const fetcher = async (url) => {
        const response = await axios.get(url)
        const resp = await response.data
        return resp
    }

    const { data, error, isLoading } = useSWR(url, fetcher, { refreshInterval: 1000 })

    return { data, error, isLoading }

}