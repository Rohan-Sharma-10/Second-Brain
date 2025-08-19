import { Button } from "../components/Button";
import { PlusIcon } from "../icons/PlusIcon";
import { Card } from "../components/Card";
import { CreateContentModal } from "../components/CreateContentModal";
import { SideBar } from "../components/SideBar";
import { useState, useEffect } from "react";
import { useContent } from "../hook/useContent";
import { MenuIcon } from "../icons/MenuIcon";
import { useIsMobile } from "../hook/useMobile";

export default function DashBoard() {
    const [modalOpen, setModalOpen] = useState(false);
    const {contents, refresh, deleteContent} = useContent();
    const [filter, setFilter] = useState("All");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const isMobile = useIsMobile();

    useEffect(() => {
      refresh();
    }, [modalOpen, filter])

    const filteredContents = contents.filter(content => {
      if(filter === "All") return true;
      return content.type === filter
    })

  return (
        <div className="min-h-screen bg-gray-100">
            <SideBar 
                setFilter={setFilter} 
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />
            
            <div className={`${isMobile ? 'ml-0' : 'ml-72'} min-h-screen`}>
                {/* Mobile Header */}
                {isMobile && (
                    <div className="bg-white border-b px-4 py-3 flex items-center justify-between">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="p-2 rounded-md hover:bg-gray-100"
                        >
                            <MenuIcon />
                        </button>
                        <h1 className="text-lg font-semibold text-purple-700">Second Brain</h1>
                        <div className="w-10"></div> {/* Spacer for centering */}
                    </div>
                )}

                <div className="p-3 sm:p-4 lg:p-6">
                    <CreateContentModal open={modalOpen} onClose={() => setModalOpen(false)} />
                    
                    {/* Add Content Button */}
                    <div className="flex justify-end mb-4 sm:mb-6">
                        <Button 
                            varient="primary" 
                            text={isMobile ? "Add" : "Add Content"} 
                            size={isMobile ? "sm" : "md"} 
                            onClick={() => setModalOpen(true)} 
                            startIcon={<PlusIcon />} 
                        />
                    </div>
                    
                    {/* Content Grid */}
                    <div className="grid gap-3 sm:gap-4 lg:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {filteredContents.map((content) => (
                            <Card 
                                key={content._id} 
                                _id={content._id}  
                                title={content.title} 
                                link={content.link} 
                                type={content.type} 
                                onDelete={() => deleteContent(content._id)}  
                            />
                        ))}
                    </div>
                    
                    
                </div>
            </div>
        </div>
    );
}