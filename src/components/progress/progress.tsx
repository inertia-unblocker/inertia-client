import { Progress as NextUIProgress } from '@nextui-org/react';
import { useState } from 'react';

import { Percentage } from '@utils/math';


export function UseProgress(max: number): [setStage: (newStage: number) => void, Progress: () => JSX.Element] {
	const [stage, setRawStage] = useState(0);
	const percentage = new Percentage(max);

	const setStage = (newStage: number) =>
		setRawStage(percentage.getRounded(newStage));

	const Progress = () =>
		<NextUIProgress value={stage} />;

	return [
		setStage,
		Progress
	];
}