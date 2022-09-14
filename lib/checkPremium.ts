import request from './request';

export default async function checkPremium(id, token): Promise<boolean> {
	const response = await request('GET', `/api/user/${id}/read/subscription`, {
		Authorization: `Bearer ${token}`
	});

	if (response.err) return false;
	return response.subscription as boolean;
}