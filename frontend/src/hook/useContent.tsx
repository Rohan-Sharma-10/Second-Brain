import { useEffect } from "react";
import { BACKEND_URL } from "../config";
import { useRecoilState } from "recoil";
import { contentsState } from "../atoms/Atom";
import axiosInstance from "../api/axiosInstance";

export function useContent() {
    const [contents, setContents] = useRecoilState(contentsState);

    async function refresh() {
        axiosInstance.get(`${BACKEND_URL}/api/content/getContent`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            }
        }).then((response) => {
            setContents(response.data.content)
        }).catch((error) => {
            console.error("Error fetching content: ", error)
        })
    }

    async function deleteContent(contentId: string) {
        await axiosInstance.delete(`${BACKEND_URL}/api/content/deleteContent/${contentId}`, {
            data: { contentId },
            headers: {
                "Authorization": localStorage.getItem("accessToken")
            }
        }).then(() => {
            setContents((prev) => prev.filter(content => content._id !== contentId)) // prev refers to the previous state of contents before updating.
        }).catch((error) => {
            console.error("Error deleting content", error)
        }) 
    }

    useEffect(() => {
        refresh();
        
        let interval = setInterval(() => {
            refresh();
        }, 10 * 1000)

        return () => {
            clearInterval(interval);
        }
    }, [])

    return {contents, refresh, deleteContent } ;
}
