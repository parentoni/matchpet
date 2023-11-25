import { AppStatsResponseSuccess } from "../../elements/hero/useGetStats";
import { Api } from "../services/Api";
import { Either, left, right } from "../shared/Result";

export class App {
  static async getStats(): Promise<Either<any, AppStatsResponseSuccess>> {
    const response = await Api.get('/app/stats')
    if (response.isLeft()) {
      return left(response.value)
    }

    return right(response.value as AppStatsResponseSuccess)
  }
}