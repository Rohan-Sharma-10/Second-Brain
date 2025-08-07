import { useRef, useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { motion, AnimatePresence } from "framer-motion";
import axiosInstance from "../api/axiosInstance";


interface CreateContentModalProps {
    open: boolean;
    onClose: () => void;
}

enum ContentType {
    Youtube = "Youtube",
    Twitter = "Twitter",
    Document = "Document",
    Link = "Link",
}

export function CreateContentModal(props: CreateContentModalProps) {
    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const [type, setType] = useState(ContentType.Youtube);
    const [file, setFile] = useState<File | null>(null);

    async function addContent() {
        const title = titleRef.current?.value || "";
        const link = linkRef.current?.value || "";

        await axiosInstance.post(`${BACKEND_URL}/api/content/add`,{
            title, link, type
        }, {
            headers: {
                "Authorization": `${localStorage.getItem("accessToken")}`,
            }
        });
        props.onClose();
    }

    async function addFile() {
        const title = titleRef.current?.value || "";

        if (!file) {
            console.error("No file selected");
            return;
        }
        const formData = new FormData();
        formData.append("file", file);
        formData.append("title", title || "");
        formData.append("type", type || "");

        await axios.post(`${BACKEND_URL}/api/content/uploadFile`, formData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                "Content-Type": "multipart/form-data",
            },
        });
        props.onClose();
    }

    return (
        <AnimatePresence> {/* ✨ Magic for mounting/unmounting animations */}
            {props.open && (
                <div className="fixed top-0 left-0 w-screen h-screen z-50">
                    {/* backdrop */}
                    <motion.div
                        className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.6 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    />
                    
                    {/* modal */}
                    <div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center">
                        <motion.div
                            className="bg-white opacity-100 p-4 rounded-md fixed"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.3, type: "spring" }}
                        >
                            {/* Cross button */}
                            <div className="flex justify-end">
                                <div onClick={props.onClose} className="cursor-pointer">
                                    <CrossIcon />
                                </div>
                            </div>

                            {/* Inputs */}
                            <div>
                                <Input ref={titleRef} placeholder="Title" />
                                {type !== ContentType.Document ? (
                                    <Input ref={linkRef} placeholder="Link" />
                                ) : (
                                    <input
                                        type="file"
                                        name="uploadFile"
                                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                                        className="p-2 border max-w-[14.4rem]"
                                    />
                                )}
                            </div>

                            {/* Type Buttons */}
                            <div>
                                <h1>Type</h1>
                                <div className="grid grid-cols-2 gap-4 pb-2">
                                    {Object.values(ContentType).map((contentType) => (
                                        <Button
                                            key={contentType}
                                            text={contentType}
                                            varient={type === contentType ? "primary" : "secondary"}
                                            onClick={() => setType(contentType)}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Submit button */}
                            <div className="flex justify-center">
                                <Button
                                    onClick={type === ContentType.Document ? addFile : addContent}
                                    varient="primary"
                                    text="Submit"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            )}
        </AnimatePresence>
    );
}
