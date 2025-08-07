import { Button } from "../components/Button";
import { PlusIcon } from "../icons/PlusIcon";
import { Card } from "../components/Card";
import { CreateContentModal } from "../components/CreateContentModal";
import { SideBar } from "../components/SideBar";
import { useState, useEffect } from "react";
import { useContent } from "../hook/useContent";

export default function DashBoard() {
    const [modalOpen, setModalOpen] = useState(false);
    const {contents, refresh, deleteContent} = useContent();
    const [filter, setFilter] = useState("All");

    useEffect(() => {
      refresh();
    }, [modalOpen, filter])

    const filteredContents = contents.filter(content => {
      if(filter === "All") return true;
      return content.type === filter
    })

  return (
    <div>
    <SideBar setFilter={setFilter} />
    <div className="p-4 ml-72 min-h-screen bg-gray-100 border-2">
      {/* component for adding new content */}
      <CreateContentModal open={modalOpen} onClose={() => setModalOpen(false)} />
    <div className="flex justify-end gap-4">
      {/* Button to open the 'Create Content' modal */}
      <Button varient="primary" text="Add Content" size="md" onClick={() => setModalOpen(true)} startIcon={<PlusIcon />} />
    </div>
    {/* Rendering the content cards dynamically from the 'contents' array */}
      <div className="pt-4 grid"
      style={{  
    display: 'grid',
    gridTemplateColumns: 'repeat(4, minmax(250px, 1fr))',
    gap: '10px'  // This sets the gap between grid items
  }}>
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
  )
}