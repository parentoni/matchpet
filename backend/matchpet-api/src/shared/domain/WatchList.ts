export abstract class WatchList<T> {
  private items: T[];

  constructor(intialItems?: T[]) {
    this.items = intialItems || [];
  }

  abstract compareItems(a: T, b: T): boolean;

  public add(item: T) {
    this.items.push(item);
  }

  public get list(): T[] {
    return this.items;
  }
}
