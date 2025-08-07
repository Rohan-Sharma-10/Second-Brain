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
    "primary": "bg-purple-600 text-white",
    "secondary": "bg-purple-200 text-purple-600"
}

const defaultStyles = "px-4 py-2 rounded-md font-light flex items-center";

export const Button = (props: ButtonProps) => {
    return (
        <button className = {`${varientStyles[props.varient]} ${defaultStyles} ${props.fullWidth ? " w-full flex justify-center items-center" : ""} ${props.loading ? "opacity-45" : ""}`}  
        disabled={props.loading} onClick={props.onClick}>
            <div className="flex items-center" >
            {props.startIcon} 
            <div className="pl-2 pr-2">
                {props.text}
            </div>
            </div>
        </button>
    )
}