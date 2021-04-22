export const textCut = (str: string, maxLen: number) => {
  return str.length > maxLen - 3 ? str.slice(0, maxLen - 3) + '...' : str
}