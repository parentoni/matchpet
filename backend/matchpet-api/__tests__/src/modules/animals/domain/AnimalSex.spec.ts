import { ANIMAL_SEX, AnimalSex, AnimalSexProps } from "../../../../../src/modules/animals/domain/animal/AnimalSex"
describe("AnimalSex", () => {
  it("Creates successfuly with valid data", () => {
    const male = AnimalSex.create({ sex: ANIMAL_SEX.MALE })
    const female = AnimalSex.create({ sex: ANIMAL_SEX.FEMALE })

    expect(male.isLeft()).toBe(false)
    expect(female.isLeft()).toBe(false)
  })

  it("Fails to be created with invalid string", () => {
    const invalid = AnimalSex.create({sex: "invalid" as ANIMAL_SEX})

    expect(invalid.isLeft()).toBe(true)
  })

  it("Fails to be created with missing values/invalid non-strings", () => {
    
    const sexUndefined = AnimalSex.create({sex: undefined as unknown as ANIMAL_SEX})
    const sexNull = AnimalSex.create({sex: null as unknown as ANIMAL_SEX})
    const sexEmpty = AnimalSex.create({} as unknown as AnimalSexProps)
    const sexAsNonString = AnimalSex.create({sex: [] as unknown as ANIMAL_SEX})

    expect(sexUndefined.isLeft()).toBe(true)
    expect(sexNull.isLeft()).toBe(true)
    expect(sexEmpty.isLeft()).toBe(true)
    expect(sexAsNonString.isLeft()).toBe(true)
  })
})
