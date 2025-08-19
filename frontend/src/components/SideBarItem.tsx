import { ReactElement } from "react";

interface SideBarItemProps {
    text: string,
    icon: ReactElement,
    onClick?: () => void,
}

export function SideBarItem(props: SideBarItemProps) {
    return (
        <div className="flex text-gray-700 py-2 cursor-pointer rounded-lg transition-all duration-300 
                        hover:bg-gray-200 hover:shadow-sm hover:scale-105 w-full max-w-56 pl-3 sm:pl-4">
            <div className="pr-2 flex-shrink-0">
                {props.icon}
            </div>
            <div className="font-medium text-sm sm:text-base">
                {props.text}
            </div>
        </div>
    )
}