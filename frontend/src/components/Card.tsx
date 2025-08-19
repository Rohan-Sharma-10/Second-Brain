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
    
      

    return (
        <div className="w-full">
            <div className="p-3 sm:p-4 bg-white rounded-md border-gray-200 w-full border min-h-48 flex flex-col">
                <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center text-sm sm:text-md pb-2 flex-1 min-w-0">
                        <div className="text-gray-500 pr-2 flex-shrink-0">
                            {props.type === "Youtube" && <YoutubeIcon />}
                            {props.type === "Twitter" && <TwitterIcon />}
                            {props.type === "Document" && <DocumentIcon />}
                            {props.type === "Link" && <LinkIcon />}
                        </div>
                        <span className="truncate">{props.title}</span>
                    </div>

                    <div className="flex items-center flex-shrink-0 ml-2">
                        <div className="pr-2 pb-2 text-gray-500">
                            <a href={props.link} target="_blank" rel="noopener noreferrer">
                                <ExternalLink />    
                            </a>   
                        </div>
                        <div className="text-gray-500 pb-2 cursor-pointer" onClick={props.onDelete}>
                            <DeleteIcon />
                        </div>
                    </div>
                </div>
                
                <div className="flex-1">
                    {props.type === "Youtube" && (
                        <div className="relative w-full h-0 pb-[56.25%] overflow-hidden">
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
                                title="document"
                            />
                        </div>
                    )}
                    {props.type === "Link" && (
                        <div className="w-full overflow-hidden">
                            <a
                                href={props.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline break-all text-sm"
                            >
                                {props.link}
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}