import { useRef, useEffect } from "react";
import { DeleteIcon } from "../icons/DeleteIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { DocumentIcon } from "../icons/Document";
import { LinkIcon } from "../icons/LinkIcon";
import { ExternalLink } from "../icons/ExternalLinkIcon";

interface CardProps {
    _id: string,
    title: string,
    link: string,
    file?: string,
    type: "Youtube" | "Twitter" | "Document" | "Link",
    onDelete: () => void
}

declare global {
    interface Window {
      twttr: any;
    }
  }

export function Card(props: CardProps) {
    const getYoutubeVideos = (url: string) => {
        const regex = /(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/|.*embed\/|.*watch\?v=))([^&?/]+)/;
        const match = url.match(regex);
        return match ? match[1] : null;
    }
    const videoId = props.link ? getYoutubeVideos(props.link) : null;


    const twitterEmbedRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (!twitterEmbedRef.current) return;
    
        // Clear previous embed to prevent duplicates
        twitterEmbedRef.current.innerHTML = "";
    
        // Create a new blockquote for embedding
        const blockquote = document.createElement("blockquote");
        blockquote.className = "twitter-tweet";
        const anchor = document.createElement("a");
        anchor.href = props.link.replace("x.com", "twitter.com");
        blockquote.appendChild(anchor);
        twitterEmbedRef.current.appendChild(blockquote);
    
        // Load Twitter script only once
        if (!window.twttr) {
            const script = document.createElement("script");
            script.src = "https://platform.twitter.com/widgets.js";
            script.async = true;
            script.onload = () => {
                window.twttr?.widgets.load();
            };
            document.body.appendChild(script);
        } else {
            window.twttr.widgets.load();
        }
    }, [props.link]); // Runs only when props.link changes
    
      

    return <div>
        <div className="p-4 bg-white rounded-md border-gray-200 max-w-72 min-w-72 border min-h-48">
            <div className="flex justify-between">
                <div className="flex items-center text-md pb-2">
                    <div className="text-gray-500 pr-2">
                    {props.type === "Youtube" && <YoutubeIcon />}
                    {props.type === "Twitter" && <TwitterIcon />}
                    {props.type === "Document" && <DocumentIcon />}
                    {props.type === "Link" && <LinkIcon />}
                </div>
                {props.title}
                </div>

                <div className="flex items-center">
                    <div className="pr-2 pb-2 text-gray-500">
                        <a href={props.link} target="_blank" >
                            <ExternalLink />    
                        </a>   
                    </div>
                    <div className="text-gray-500 pb-2" onClick={props.onDelete}>
                    <DeleteIcon />
                    </div>
                </div>
            </div>
            <div>
                {props.type === "Youtube" &&(
                        <div className="relative w-100 h-0 pb-[56.25%] overflow-hidden ">
                            <iframe
                                className="absolute top-0 left-0 w-full h-full rounded-md"
                                src={`https://www.youtube.com/embed/${videoId}?modestbranding=1&rel=0&fs=1`}
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                                title="video"
                            />
                        </div>
                    )}
                    {props.type === "Twitter" && <div ref={twitterEmbedRef}></div>}
                    {props.type === "Document" && (
                        <div className="relative w-full h-0 pb-[56.25%] overflow-hidden">
                            <iframe
                                className="absolute top-0 left-0 w-full h-full rounded-md"
                                src={props.link}
                                allow="autoplay; encrypted-media"
                            />
                        </div>
                    )}
                    {props.type === "Link" && (
                        <div className="w-full overflow-x-auto">
                            <a
                                href={props.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline whitespace-nowrap"
                            >
                                {props.link}
                            </a>
                        </div>
                    )}
            </div>
        </div>
    </div>
}