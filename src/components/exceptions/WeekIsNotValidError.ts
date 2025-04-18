class WeekIsNotValidError extends Error {
    private wrongFields;

    constructor(msg: string, fields: string[]) {
        super(msg);
        this.wrongFields = fields;

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, WeekIsNotValidError.prototype);
    }

    getWrongFields() {
        return this.wrongFields;
    }
}
export default WeekIsNotValidError;