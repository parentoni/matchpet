import { FILTER_MODES } from "../../elements/Animals/filters";
import { ANIMAL_STATUS, IAnimalDTO } from "../services/dtos/AnimalDTO";
import { Api } from "../services/Api";
import { Either, left, right } from "../shared/Result";
import {differenceInDays} from 'date-fns'
import { ISpecieDTO } from "../services/dtos/SpecieDTO";
export interface CreateAnimalListingDTO {
  name: string;
  image: string[];
  specie_id: any;
  traits: { _id: string; value: string }[];
  description: string;
  sex: SEX
  status?: ANIMAL_STATUS;
  contact?: {
    contact_type: string
    contact_value: string
  }[]

}
export enum SEX {
  MALE = "MALE",
  FEMALE = "FEMALE"
}
export class Animal {
  public props: IAnimalDTO;

  constructor(props: IAnimalDTO) {
    this.props = props;
  }

  public getExpiringDate() {
    const date = new Date(this.props.last_modified_at)
    date.setDate(date.getDate() + 35)
    return date
  }

  public canRenovate () {
    return !!(differenceInDays(new Date(), this.props.last_modified_at) >= 7)
  }

  public getSex (): SEX {
    return this.props.sex
  }
  public static create(props: IAnimalDTO) {
    return new Animal(props);
  }

  public static async getSpecific(animalId: string, click: boolean = true): Promise<Either<Response, Animal>> {
    const response = await Api.get(`/animals/${animalId}?click=${click}`);
    if (response.isLeft()) {
      return left(response.value);
    }

    return right(this.create(response.value));
  }

  public static async getAll(
    page: number,
    filters: Record<string, { mode: FILTER_MODES; comparation_value: any }[]>,
    countViews: boolean,
    coordinates?: [number, number][],
  ): Promise<Either<Response, { animals: IAnimalDTO[]; count: number }>> {
    // Filter only pending animals
    const formatedFilters = [];

    
    for (const key of Object.keys(filters)) {
      for (const method of filters[key]) {
        if (!key.includes("trait")) {
          formatedFilters.push({ mode: method.mode, comparation_value: method.comparation_value, key: key });
        } else {
          formatedFilters.push({ mode: method.mode, comparation_value: method.comparation_value, key: "traits.value" });
        }
      }
    }
    
    const response = await Api.post(
      `/animals/filter?view=${countViews? "true": "false"}`,
      JSON.stringify(
        coordinates
          ? coordinates.length > 0
            ? { page: page, filter: formatedFilters, coordinates: [coordinates] }
            : { page: page, filter: formatedFilters }
          : { page: page, filter: formatedFilters }
      )
    );
    if (response.isLeft()) {
      return left(response.value);
    }

    return right({ animals: response.value["animals"] as IAnimalDTO[], count: response.value["count"] as number });
  }

  public static async count(
    filters: Record<string, { mode: FILTER_MODES; comparation_value: any }[]>,
    coordinates?: [number, number][],
    status?: ANIMAL_STATUS
  ): Promise<Either<Response, { animals: IAnimalDTO[]; count: number }>> {

    
    // Filter only pending animals
    const formatedFilters = [];

    if (status) {
      formatedFilters.push({ mode: "$eq", comparation_value: status, key: "status" });
    }
    
    for (const key of Object.keys(filters)) {
      for (const method of filters[key]) {
        if (!key.includes("trait")) {
          formatedFilters.push({ mode: method.mode, comparation_value: method.comparation_value, key: key });
        } else {
          formatedFilters.push({ mode: method.mode, comparation_value: method.comparation_value, key: "traits.value" });
        }
      }
    }

    const response = await Api.post(
      "/animals/filter/count",
      JSON.stringify(
        coordinates
          ? coordinates.length > 0
            ? {filter: formatedFilters, coordinates: [coordinates] }
            : { filter: formatedFilters }
          : {filter: formatedFilters }
      )
    );
    if (response.isLeft()) {
      return left(response.value);
    }

    return right({ animals: response.value["animals"] as IAnimalDTO[], count: response.value["count"] as number });
  }

  public getTraitById(id: string) {
    const response = this.props.traits.find((el) => el._id === id);
    if (response) {
      return response;
    }
  }

  public static async uploadAnimalImage(file: File, token: string): Promise<Either<Response, string>> {
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

  public static async newAnimal(data: CreateAnimalListingDTO, token: string) {
    const response = await Api.post("/animals/new", JSON.stringify(data), token);
    if (response.isLeft()) {
      return left(response);
    }

    return right(response.value);
  }

  public static async editAnimal(data: CreateAnimalListingDTO, token: string, animalId: string): Promise<Either<Response, IAnimalDTO>> {
    const response = await Api.put("/animals/" + animalId, JSON.stringify({ edit: data }), token);
    if (response.isLeft()) {
      return left(response.value);
    }

    return right(response.value);
  }

  public static async renovatePost(animalId:string, token:string) {
    const response = await Api.post('/animals/renovate', JSON.stringify({animalId: animalId}), token)
    if (response.isLeft()) {
      return left(response.value)
    }

    return right('ok')
  }

  public static async animalComplaint (animalId:string, text:string, contact?: {name: string, phone:string}) {
    const response = await Api.post(`/animals/${animalId}/complaint`, JSON.stringify({complaint: text, contact_info: contact}))
    return response
  }
}
