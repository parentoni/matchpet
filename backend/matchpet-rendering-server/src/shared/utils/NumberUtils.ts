
export class NumberUtils {
    public static checkLength(num : number) {
        try {
            // Rounds number to 2 decimal places

            const fixedNumber = num.toFixed(2)
            // Checks if number is bigger than 0
            if (Number(fixedNumber) > 0) {
                return fixedNumber
            }

        }catch {
            return null
        }
    }
}