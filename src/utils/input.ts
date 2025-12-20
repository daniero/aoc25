export function readLinesOfNumbers(input: string) {
  return input
    .split('\n')
    .map((line) => line.match(/\d+/g)!.map((s) => parseInt(s)));
}
