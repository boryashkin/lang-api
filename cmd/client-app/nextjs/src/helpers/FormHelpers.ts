export function getStringFromFromValue(value: FormDataEntryValue | null): string {
    if (typeof value == "string") {
        return value
    }

    return ""
}
export function getNumberFromFromValue(value: FormDataEntryValue | null): number {
    return parseInt(getStringFromFromValue(value))
}