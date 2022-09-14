import { useRouter } from 'next/router';

export default function GetDomain() {
	const router = useRouter();
	const { basePath } = router;
	return new URL(basePath).origin;
}