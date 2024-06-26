import { GuardError } from "../../../../shared/core/Guard";
import { Either, left, right } from "../../../../shared/core/Result";
import { ValidUrl, ValidUrlCreateResponse, ValidUrlProps } from "../../../../shared/core/ValidUrl";
import { WatchList } from "../../../../shared/domain/WatchList";
import { CommonUseCaseResult } from "../../../../shared/core/Response/UseCaseError";

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

  getImages() {
    // Gets only images and excludes videos
    const validImages : ValidUrl[] = []
    for (const url of this.list) {
      if (url.value.match(/\.(jpeg|jpg|png|pdf|webp|tiff|ai|raw|indd|psd)$/) !== null) {
        validImages.push(url)
      }
    }
    return validImages
  }

  public static createFromPersistent(props: string[]): Either<GuardError, AnimalImages> {
    const urlsArray: ValidUrl[] = [];
    if (!props || !(props.length > 0)) {
      return left(CommonUseCaseResult.InvalidValue.create({
        location: `${AnimalImages.name}.${AnimalImages.createFromPersistent}`,
        variable: "ANIMAL_IMAGE",
        errorMessage: "Animal must have images"
      }))
    }
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
