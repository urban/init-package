/* @flow */
/* Flow declarations for stat, readFileSync and outputFileSync. */
declare module 'fs-extra' {
  declare function stat (path: string, callback?: (err: Error, stats: Object) => any): void
  declare function readFileSync (filename: string): string
  declare function readFileSync (filename: string, encoding: string): string
  declare function outputFileSync (filename: string, data: any): void
}
