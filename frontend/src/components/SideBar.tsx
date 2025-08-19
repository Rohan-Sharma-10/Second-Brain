import { useState } from "react";
import { DocumentIcon } from "../icons/Document";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SideBarItem } from "./SideBarItem";
import { LogoutModal } from "./LogoutModal";
import { LinkIcon } from "../icons/LinkIcon";
import { LogOut } from "../icons/Logout";
import { Brain } from "../icons/BrainIcon";
import { Layout } from "../icons/LayoutIcon";
import { useIsMobile } from "../hook/useMobile";
interface SideBarProps {
    setFilter: (filter: string) => void,
    onLogout?: () => void,
    isOpen: boolean,
    onClose: () => void    
}

export function SideBar(props: SideBarProps) {
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const isMobile = useIsMobile();

    const handleCloseModal = () => {
        setIsLogoutModalOpen(false); // Close the modal
    };

    return (
        <>
            {/* Mobile Backdrop */}
            {isMobile && props.isOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={props.onClose}
                />
            )}
            
            {/* Sidebar */}
            <div className={`
                ${isMobile 
                    ? `fixed top-0 left-0 z-50 transform transition-transform duration-300 ease-in-out ${props.isOpen ? 'translate-x-0' : '-translate-x-full'}`
                    : 'fixed top-0 left-0'
                }
                h-screen border-r bg-white w-72 pl-4 sm:pl-6 flex flex-col
            `}>
                {/* Top Section */}
                <div className="flex flex-col">
                    <div className="flex pt-6 sm:pt-8 items-center text-purple-700 font-bold text-xl sm:text-2xl">
                        <div className="pr-2 text-purple-600">
                            <Brain />
                        </div>
                        <span className="hidden sm:inline">Second Brain</span>
                        <span className="sm:hidden">Brain</span>
                    </div>
                    <div className="pt-6 sm:pt-8 pl-2 sm:pl-4">
                        <button onClick={() => props.setFilter("All")} className="w-full">
                            <SideBarItem text="All" icon={<Layout />} />
                        </button>
                        <button onClick={() => props.setFilter("Youtube")} className="w-full">
                            <SideBarItem text="Youtube" icon={<YoutubeIcon />} />
                        </button>
                        <button onClick={() => props.setFilter("Twitter")} className="w-full">
                            <SideBarItem text="Twitter" icon={<TwitterIcon />} />
                        </button>
                        <button onClick={() => props.setFilter("Document")} className="w-full">
                            <SideBarItem text="Document" icon={<DocumentIcon />} />
                        </button>
                        <button onClick={() => props.setFilter("Link")} className="w-full">
                            <SideBarItem text="Link" icon={<LinkIcon />} />
                        </button>
                    </div>
                </div>

                {/* Bottom Section - Logout */}
                <div className="pl-2 sm:pl-4 pb-6 sm:pb-8 mt-auto">
                    <button onClick={() => setIsLogoutModalOpen(true)} className="w-full">
                        <SideBarItem text="Logout" icon={<LogOut />} />
                    </button>
                </div>
                
                {/* Logout Modal */}
                {isLogoutModalOpen && (
                    <LogoutModal open={isLogoutModalOpen} onClose={handleCloseModal} />
                )}
            </div>
        </>
    );
}