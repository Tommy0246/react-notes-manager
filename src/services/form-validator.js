export class ValidatorService {
    static min(value, min) {
        if (value.length < min) {
            return `veuillez tapez au moins ${min} lettre(s)`;
        }
    }
    static max(value, max) {
        if (value.length > max) {
            return `veuillez tapez au plus ${max} lettre(s)`;
        }
    }
}
