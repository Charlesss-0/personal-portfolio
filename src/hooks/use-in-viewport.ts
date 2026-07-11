import { useEffect, useState } from "react";

export default function useInViewport(
	elementRef: React.RefObject<HTMLElement | null>,
	unobserveOnIntersect: boolean,
	options = {},
	shouldObserve = true,
): boolean {
	const [intersect, setIntersect] = useState(false);
	const [isUnobserved, setIsUnobserved] = useState(false);

	useEffect(() => {
		if (!elementRef?.current) return;

		const observer = new IntersectionObserver(([entry]) => {
			const { isIntersecting, target } = entry;

			setIntersect(isIntersecting);

			if (isIntersecting && unobserveOnIntersect) {
				observer.unobserve(target);
				setIsUnobserved(true);
			}
		}, options);

		if (!isUnobserved && shouldObserve) {
			observer.observe(elementRef.current);
		}

		return (): void => observer.disconnect();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		unobserveOnIntersect,
		isUnobserved,
		shouldObserve,
		elementRef.current,
		options,
	]);

	return intersect;
}
