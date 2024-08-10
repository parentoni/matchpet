import { GuardError } from "../../../../shared/core/Guard";
import { Either, left, right } from "../../../../shared/core/Result";
import { ValidUrl, ValidUrlCreateResponse, ValidUrlProps } from "../../../../shared/core/ValidUrl";
import { WatchList } from "../../../../shared/domain/WatchList";

export class AnimalImagesExport extends WatchList<ValidUrl> {
  constructor(images: ValidUrl[]) {
    super(images);
  }

  compareItems(a: ValidUrl, b: ValidUrl): boolean {
    return a.equals(b);
  }

  public static create(images: ValidUrl[]) {
    return new AnimalImagesExport(images);
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

  public static createFromPersistent(props: string[]): Either<GuardError, AnimalImagesExport> {
    const urlsArray: ValidUrl[] = [];

    for (let i=0;i<props?.length || 0;i++) {
      const createResult = ValidUrl.create({ value: props[i] as string });
      if (createResult.isLeft()) {
        return left(createResult.value);
      }

      urlsArray.push(createResult.value);
    }
    return right(AnimalImagesExport.create(urlsArray));
  }

  public get persistentValue() {
    const valueArray: string[] = [];
    for (const url of this.list) {
      valueArray.push(url.value);
    }

    return valueArray;
  }
}
