import { ReactNode } from "react";

interface IComponentProps {
	children: ReactNode;
}

export default function AuthLayout({ children }: IComponentProps) {
	return (
		<section className="h-screen flex">
			<div className="m-auto">{children}</div>
		</section>
	);
}
