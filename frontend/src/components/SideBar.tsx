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
interface SideBarProps {
    setFilter: (filter: string) => void,
    onLogout?: () => void
}

export function SideBar(props: SideBarProps) {
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    const handleCloseModal = () => {
        setIsLogoutModalOpen(false); // Close the modal
    };

    return (
        <div className="h-screen border-r bg-white w-72 fixed top-0 left-0 pl-6 flex flex-col">
            {/* Top Section */}
            <div className="flex flex-col">
                <div className="flex pt-8 items-center text-purple-700 font-bold text-2xl">
                    <div className="pr-2 text-purple-600">
                        <Brain />
                    </div>
                    Second Brain
                </div>
                <div className="pt-8 pl-4">
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
            <div className="pl-4 pb-8 mt-auto">
                <button onClick={() => setIsLogoutModalOpen(true)} className="w-full">
                    <SideBarItem text="Logout" icon={<LogOut />} />
                </button>
            </div>
            {/* Logout Modal - Render only if open */}
      {isLogoutModalOpen && (
        <LogoutModal open={isLogoutModalOpen} onClose={handleCloseModal} />
      )}
        </div>
    );
}