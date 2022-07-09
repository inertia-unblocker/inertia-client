export default function handler(req, res) {
	let url = req.url;
	let params = new URL(`https://example.com/${url}`).searchParams;
	let title = (new URLSearchParams(params)).get('title');

	return res.status(200).send(`
		<!DOCTYPE html>
		<html lang="en">
			<head>
				<title>${title}</title>
			</head>
			<body>
				<h1>${title}</h1>
			</body>
		</html>
	`);
}