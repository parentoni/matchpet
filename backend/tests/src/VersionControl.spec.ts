import {VersionControl} from '../../src/shared/core/VersionControl'

describe("Version control utils", () => {
    const mockRegister = {'1.0.0': 'testing', '2.0.0': 'testing', '3.0.0':'testing'}

    it("Check the contains method with a valid value", () => {
        expect(VersionControl.contains('1.0.0', mockRegister)).toBe(true)
    })

    it("Check the contains method with a invalid value", () => {
        expect(VersionControl.contains('99.0.0', mockRegister)).toBe(false)
    })

    it("Check the constains method with a invalid register", () => {
        expect(() => VersionControl.contains('1.0.0', {})).toThrow(TypeError)
    })

    it("Gets the max value in register", () => {
        expect(VersionControl.max(mockRegister)).toBe('3.0.0')
    })

    it("Checks the max value with invalid register", () => {
        expect(() => VersionControl.max({})).toThrow(TypeError)
    })
})

describe("Version control register ", () => {
    const mockRegister = {'1.0.0': 'testing'}
    
    it("Register a valid V version on the register", () => {

        VersionControl.register('2.0.0', mockRegister, 'testing')
        expect(VersionControl.contains('2.0.0', mockRegister)).toBe(true)

    })

    it ("Try to register an invalid Version on the register", () => {
        expect(() => VersionControl.register('testing', mockRegister, 'testing')).toThrow(TypeError)
    })

    it ("Try to register a duped value", () => {
        expect(() => VersionControl.register('2.0.0', mockRegister, 'testing')).toThrow(RangeError)
    })
    
})