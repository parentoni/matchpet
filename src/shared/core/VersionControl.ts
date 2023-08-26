import semver from "semver";
import { Guard, GuardResponse } from "./Guard";
import { Either, left, right } from "./Result";
import { GenericError, IBaseError } from "./Response/Error";

export type VersionControlRegister<T> = {
  [x in string]: T;
};

export class VersionControl<T> {
  public register: VersionControlRegister<T> = {};
  protected defaultVersion: string;

  public constructor(defaultVersion?: string) {
    this.defaultVersion = defaultVersion || "latest_stable";
  }

  public addToRegister(version: string, value: T) {
    const clean = semver.valid(version);
    const check = Guard.againstNullOrUndefined(clean, "version");
    if (check.isRight()) {
      const guardAlreadyInRegister = Guard.inArray(version, Object.keys(this.register), "version");

      if (guardAlreadyInRegister.isRight()) {
        this.register[version] = value;
      } else {
        //In case of register error application must raise error.
        throw new RangeError(`[VersionRegister(register)]: ${guardAlreadyInRegister.value.error.errorMessage}`);
      }
    } else {
      //In case of register error application must raise error.
      throw new TypeError(`[VersionRegister(register)]: ${check.value.error.errorMessage}`);
    }
  }

  public getVersion(version?: string): Either<GenericError<IBaseError>, T> {
    if (version) {
      const searchResult = this.findVersionInRegister(version);

      if (searchResult.isLeft()) {
        return left(searchResult.value);
      } else {
        return right(searchResult.value);
      }
    } else {
      if (this.defaultVersion !== "latest_stable") {
        const deafultSearchResult = this.findVersionInRegister(this.defaultVersion);
        if (deafultSearchResult.isLeft()) {
          return left(deafultSearchResult.value);
        } else {
          return right(deafultSearchResult.value);
        }
      }

      const highestVersion = this.max();

      if (highestVersion.isLeft()) {
        return left(highestVersion.value);
      } else {
        return right(this.register[highestVersion.value]);
      }
    }
  }

  private findVersionInRegister(version: string): Either<GenericError<IBaseError>, T> {
    const cachedVersionData = this.register[version];

    const check = Guard.againstNullOrUndefined(cachedVersionData, "Cached version data");
    if (check.isRight()) {
      return right(cachedVersionData);
    }

    return left(check.value);
  }

  public set default(version: string) {
    const clean = semver.clean(version);
    const check = Guard.againstNullOrUndefined(clean, "Default version");
    if (check.isRight()) {
      this.defaultVersion = version;
      return;
    }

    throw new Error("Invalid version provided: " + version);
  }

  //TODO: CHECK IF VERSION IS IN PRODUCTION

  public max(): Either<GenericError<IBaseError>, string> {
    const checkEmpty = Guard.againstEmpty(Object.keys(this.register), "Version register");

    if (checkEmpty.isRight()) {
      let max: string = "0.0.0";
      for (let i = 0; i < Object.keys(this.register).length; i++) {
        const v = Object.keys(this.register)[i];

        if (semver.gt(v, max)) {
          max = v;
        }
      }

      return right(max);
    }

    return left(
      GenericError.create({
        errorMessage: "Version Control is empty",
        location: `${VersionControl.name}.${this.max.name}`
      })
    );
  }

  public contains(v: string): boolean {
    const checkEmpty = Guard.againstEmpty(Object.keys(this.register), "Version register");
    if (checkEmpty.isRight()) {
      if (Object.keys(this.register).includes(v)) {
        return true;
      }

      return false;
    } else {
      throw new TypeError(`[VersionRegister(contains)]: ${checkEmpty.value.error.errorMessage}`);
    }
  }
}
