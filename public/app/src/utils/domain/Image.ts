import { Api } from "../services/Api";
import { left, right } from "../shared/Result";

export enum IMAGE_TYPES {
  HOSTED = "HOSTED",
  FILE = 'FILE',
  UNDEFINED = "UNDEFINED"
}

export abstract class Image {
  data: any
  abstract type: IMAGE_TYPES;
  abstract display(): string;
  abstract getName(): string;

  static async upload (file: File, token: string)  {
    const formData = new FormData();
    formData.append("image", file);
    const response = await fetch(Api.baseUrl + "/app/image/upload", {
      body: formData,
      headers: {
        authorization: "Bearer " + token
      },
      method: "POST"
    });

    if (response.ok) {
      const data = await response.json();
      return right(data.location);
    }

    return left(response);
  }
}

export class ImageFile extends Image {

  private name: string
  type = IMAGE_TYPES.FILE
  constructor(data: File) {
    super();
    this.data = data;
    this.name = data.name;
  }

  display(): string {
    return URL.createObjectURL(this.data)
  }

  getName(): string {
    return this.name;
  }

}

export class HostedImage extends Image {

  private name: string
  type = IMAGE_TYPES.HOSTED;

  constructor(data: string) {
    super();
    this.data = data;
    this.name = (data.split('/').pop() || '').slice(37);
  }
  display(): string {
    return this.data
  }
  getName(): string {
    return this.name
  }

}


/**
 * 
 * @classdesc Defines a missing image. 
 *
 * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
 */
export class UndefinedImage extends Image {
    type = IMAGE_TYPES.UNDEFINED;

    /**
     * takes no arguments, since image is undefined
     * */
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor() {
      super() 
    }

    display(): string {
      return ''
    }
    getName(): string {
      return ''
    }
  
}
