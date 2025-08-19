import { forwardRef } from "react"

interface InputProps {
    placeholder: string,
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({placeholder}, ref) => {
    return (
        <input 
            className="w-full px-4 py-2 border rounded m-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm sm:text-base" 
            placeholder={placeholder} 
            type="text" 
            ref={ref}
        />
    )
})