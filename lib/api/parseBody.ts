export default function parseBody(body: string | object): object {
	try { return JSON.parse(body as string); }
	catch (e) { return body as object; }
}