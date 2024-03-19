import { EventEmitter } from "stream";

export class EventHandler {
  private nodeEvents = new EventEmitter();

  private static _instance: EventHandler;
  private constructor() {}

  public static getEventHandler(): EventHandler {
    if (this._instance) {
      return this._instance;
    }
    this._instance = new EventHandler();
    return this._instance;
  }

  public dispatchEvent(name: string, props: any): void {
    this.nodeEvents.emit(name, props);
  }

  public registerListener(name: string, func: () => void) {
    this.nodeEvents.addListener(name, func);
  }
}
