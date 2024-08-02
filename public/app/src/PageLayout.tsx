import React, { ReactNode } from "react";

export const PageLayout = ({children}: React.PropsWithChildren<{}>) => {
    return(
        <div className="p-8 max-w-7xl w-full mx-auto">
            {children}
        </div>
    )
}
