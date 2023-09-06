import { useState } from "react"
import { PageLayout } from "../../elements/PageLayout"
import { MatchCard } from "./MatchCards/MatchCards"
import { MatchCardsContainer } from "./MatchCards/MatchCardsContainer"

export const Listing = () => {

    const [count, setCount] = useState(5)
    return (
        <PageLayout>
            <h1 className="text-xl font-thin font-normal">Teste de preferência</h1>
            <p className="text-sm">Lorem ipsum sit dolor samet,<br></br>consectur penatibus.</p>
            <MatchCardsContainer>
                {[...Array(count).keys()].map(() => <MatchCard />)}

                {/* <MatchCard /> */}


            </MatchCardsContainer>
            <div className="flex w-full mt-5 justify-between">
                <div className="brute-border w-10 h-10 rounded-full" onClick={() => setCount(count - 1)}></div>
                <div className="brute-border w-10 h-10 rounded-full" onClick={() => setCount(count + 1)}></div>

            </div>
        </PageLayout>
    )
}