import { ReactElement } from "react"

type Varients = "primary" | "secondary";

export interface ButtonProps {
    varient: Varients,
    size?: "sm" | "md" | "lg",
    text: string,
    startIcon?: ReactElement,
    onClick?: () => void,
    loading?: boolean,
    fullWidth?: boolean,
}

const varientStyles: Record<Varients, string> = {
    "primary": "bg-purple-600 text-white hover:bg-purple-700",
    "secondary": "bg-purple-200 text-purple-600 hover:bg-purple-300"
}

const sizeStyles = {
    "sm": "px-2 py-1 text-sm",
    "md": "px-4 py-2",
    "lg": "px-6 py-3 text-lg"
}

const defaultStyles = "rounded-md font-light flex items-center transition-colors duration-200";

export const Button = (props: ButtonProps) => {
    const sizeClass = sizeStyles[props.size || "md"];
    
    return (
        <button 
            className={`${varientStyles[props.varient]} ${defaultStyles} ${sizeClass} ${props.fullWidth ? "w-full justify-center" : ""} ${props.loading ? "opacity-45" : ""}`}  
            disabled={props.loading} 
            onClick={props.onClick}
        >
            <div className="flex items-center">
                {props.startIcon && (
                    <div className="flex-shrink-0">
                        {props.startIcon}
                    </div>
                )}
                <div className={props.startIcon ? "pl-2" : ""}>
                    {props.text}
                </div>
            </div>
        </button>
    )
}