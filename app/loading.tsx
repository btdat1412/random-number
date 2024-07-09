import React from "react";

import { Loader2 } from "lucide-react";

const Loading = () => {
    return (
        <div className="mt-6 flex justify-center">
            <div className="animate-bounce">
                <Loader2 className="h-32 w-32 animate-spin text-primary xl:h-40 xl:w-40" />
            </div>
        </div>
    );
};

export default Loading;
