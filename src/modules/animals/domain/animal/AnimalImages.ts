import { GuardError } from "../../../../shared/core/Guard";
import { Either, left, right } from "../../../../shared/core/Result";
import { ValidUrl, ValidUrlCreateResponse, ValidUrlProps } from "../../../../shared/core/ValidUrl";
import { WatchList } from "../../../../shared/domain/WatchList";

export class AnimalImages extends WatchList<ValidUrl> {
  constructor(images: ValidUrl[]) {
    super(images);
  }

  compareItems(a: ValidUrl, b: ValidUrl): boolean {
    return a.equals(b);
  }

  public static create(images: ValidUrl[]) {
    return new AnimalImages(images);
  }

  public static createFromPersistent(props: string[]): Either<GuardError, AnimalImages> {
    const urlsArray: ValidUrl[] = [];
    for (const image of props) {
      const createResult = ValidUrl.create({ value: image });
      if (createResult.isLeft()) {
        return left(createResult.value);
      }

      urlsArray.push(createResult.value);
    }

    return right(AnimalImages.create(urlsArray));
  }

  public get persistentValue() {
    const valueArray: string[] = [];
    for (const url of this.list) {
      valueArray.push(url.value);
    }

    return valueArray;
  }
}
