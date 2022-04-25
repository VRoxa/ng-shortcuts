
export const isValidLifehookFn = (fn: unknown): fn is () => void => {
  return !!fn && typeof fn === 'function';
}