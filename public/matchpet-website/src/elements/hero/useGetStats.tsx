import { useEffect, useState } from "react"
import { App } from "../../utils/domain/App"

export type AppStatsResponseSuccess = {
  in_adoption:number,
  completed_adoptions:number
}

export const useGetStats = () => {
  const [stats, setStats] = useState<AppStatsResponseSuccess>()

  useEffect(() => {
  App.getStats().then(response => {
    if (response.isRight()) {
      setStats(response.value)
    }
  })
  
  }, [])

  return stats
}