export const client = typeof window !== 'undefined';
export const firefox = client ? /Firefox/i.test(window.navigator.userAgent) : false;

export const html = {
	isInput: (input: HTMLElement | null): input is HTMLInputElement => input !== null && input.tagName === 'INPUT',
	isIframe: (input: HTMLElement | null): input is HTMLIFrameElement => input !== null && input.tagName === 'IFRAME',
	isDiv: (input: HTMLElement | null): input is HTMLDivElement => input !== null && input.tagName === 'DIV',
};