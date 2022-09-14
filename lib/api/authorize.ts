import request from '../request';

export default async function authorize(id: string, token: string): Promise<boolean> {
	return (await request('POST', '/api/auth/authorize', { 'Authorization': `Bearer ${token}` }, { id })).authorized;
}