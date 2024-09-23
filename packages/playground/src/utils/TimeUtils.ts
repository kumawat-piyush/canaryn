export const getDuration = (startTime?: number, endTime?: number): number => {
  if (!endTime || !startTime) return 0
  if (startTime > endTime) return 0
  return endTime - startTime
}
