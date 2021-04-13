export function flattenArray <T> (array: T[][]): T[] {
    return array.reduce((result, innerArray) => {
        result.push(...innerArray);
        return result;
    }, []);
}
