export const isClientSide = typeof window !== 'undefined';
export const browserIsFirefox = isClientSide ? /Firefox/i.test(window.navigator.userAgent) : false;