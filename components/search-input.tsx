"use client"

import { useState, useEffect } from "react"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SearchInputProps {
    placeholder?: string
    value?: string
    onChange?: (value: string) => void
    onClear?: () => void
    className?: string
}

export function SearchInput({
    placeholder = "Search...",
    value = "",
    onChange,
    onClear,
    className
}: SearchInputProps) {
    const [localValue, setLocalValue] = useState(value)

    useEffect(() => {
        setLocalValue(value)
    }, [value])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value
        setLocalValue(newValue)
        onChange?.(newValue)
    }

    const handleClear = () => {
        setLocalValue("")
        onChange?.("")
        onClear?.()
    }

    return (
        <div className={cn("relative", className)}>
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
                type="text"
                placeholder={placeholder}
                value={localValue}
                onChange={handleChange}
                className="pl-10 pr-10"
            />
            {localValue && (
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClear}
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-slate-100"
                >
                    <X className="h-4 w-4" />
                </Button>
            )}
        </div>
    )
}


