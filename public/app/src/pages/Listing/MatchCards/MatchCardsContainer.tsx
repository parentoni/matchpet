import React, { Attributes, Children, useEffect, useRef, useState } from "react"
import { MatchCard } from "./MatchCards"

type MatchCardContainerProps = React.PropsWithChildren<{}>
export const MatchCardsContainer = (props: MatchCardContainerProps) => {

    const containerRef =  useRef<HTMLDivElement>(null)
    const [refLoaded, setRefLoaded] = useState<boolean>(false)
    //todo make this cleaner
    useEffect(() => {
        if (containerRef.current) {
            setRefLoaded(true)
        }
    }, [])

    return (
    <div className="mt-8 w-full aspect-[4/5]" ref={containerRef}>
        {refLoaded && React.Children.map(props.children, (child, index) => {
            console.log(index, containerRef.current)
            if (React.isValidElement(child)) {
                const MARGIN = 28
                const amountOfChildren = Children.count(props.children)
                const topCoordinates = containerRef.current?.getBoundingClientRect().top as number - index * (MARGIN / amountOfChildren)
                const leftCoordinates = containerRef.current?.getBoundingClientRect().left as number + index * (MARGIN / amountOfChildren) / 2
                const width = containerRef.current?.offsetWidth as number - index * (MARGIN / amountOfChildren)
                const height = width * 5/4
                const zIndex = amountOfChildren - index
                const opacity = index * 1/amountOfChildren
                return (
                <div style={{position: "absolute", top: topCoordinates, left: leftCoordinates, width: width, height: height, zIndex: zIndex, borderRadius: 16}} className="transition-all duration-75">
                    <div className="absolute top-0 left-0 w-full h-full bg-black rounded-2xl" style={{opacity}}></div>
                    {React.cloneElement(child, {...child.props})}
                </div>
                )
            }
        })}
    </div>)
}