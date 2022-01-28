/* eslint-disable @typescript-eslint/no-explicit-any */
export const lastItemInMap = <T>(map: T[]): T => Array.from(map).pop()!;
// export const lastKeyInMap = <T>(map: T[]): T => Array.from(map.keys()).pop();
export const lastValueInMap = (map: any): any => Array.from(map.values()).pop()!;
