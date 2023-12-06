import { Either } from "../../../core/Result"

export abstract class CronController {
  readonly abstract cronTime: string
  protected abstract name: string

  abstract execute (): Promise<Either<any, any>>

  public async onTick(): Promise<void> {
    const startTime = new Date()

    console.log(`[CronController]: Job ${this.name} started: ${startTime.toString()}`)
    try {
      const response = await this.execute()
      if (response.isLeft()) {
        console.log(`[CronController]: Job ${this.name} failed: ${response.value}`)
      } else {
        console.log(`[CronController]: Success executing ${this.name}.`)
        
      }
    } catch (error) {
      console.log(`[CronController]: Job ${this.name} failed with unhandled exception: ${error}`)
    }

    console.log(`[CronController]: Job ${this.name} finished. Taken: ${new Date().getTime() - startTime.getTime()}`)

  }

}