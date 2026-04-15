
import { X, Loader2 } from "lucide-react";

export function LoadingSpinner() {
    return(
    <div className="absolute inset-0 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
    </div>
    )
}