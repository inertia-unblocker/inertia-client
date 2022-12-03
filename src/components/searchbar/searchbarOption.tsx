import { Checkbox } from '@nextui-org/react';


interface SearchbarOptionProps {
	option: string;
	checked: boolean;
	onChange: (option: boolean) => void;
	premium?: boolean;
}

export function SearchbarOption({ option, checked, onChange }: SearchbarOptionProps) {
	return (
		<Checkbox defaultChecked={checked} onChange={onChange}>
			{option}
		</Checkbox>
	);
}