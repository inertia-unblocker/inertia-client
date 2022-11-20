import { DetailedHTMLProps, HTMLAttributes } from 'react';

export const InertiaLogo = () => (
	<svg
		fill="none"
		height="36"
		viewBox="0 0 201.5 201.5"
		width="36"
		xmlns="http://www.w3.org/2000/svg"
	>
		<defs>
			<linearGradient gradientTransform="rotate(90)" id="inertiaGradient">
				<stop offset="20%" stopColor="#f5a623" />
				<stop offset="80%" stopColor="#f21361" />
			</linearGradient>
		</defs>

		<path
			d="M 124.12146,2.5969153 C 142.82618,54.219543 114.76912,130.10479 2.5407457,130.10479 H 198.94038 Z"
			fill="url('#inertiaGradient')"
			stroke="url('#inertiaGradient')"
			strokeLinejoin="round"
			strokeWidth="10"
		/>

		<path
			d="M 196.3485,196.21785 V 148.28296 H 5.2715806 v 47.93489 z"
			fill="#555555"
			stroke="#555555"
			strokeLinejoin="round"
			strokeWidth="10"
		/>

		<ellipse
			cx="145"
			cy="170.6"
			fill="#17c964"
			rx="10"
			ry="10"
		/>

		<ellipse
			cx="178"
			cy="172.25"
			fill="#f21361"
			rx="10"
			ry="10"
		/>
	</svg>
);