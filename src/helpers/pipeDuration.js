export function formatDuration(duration) {
	const hours =
		Math.floor(duration / 60) < 10
			? '0' + Math.floor(duration / 60)
			: Math.floor(duration / 60);
	const minutes = duration % 60 < 10 ? '0' + (duration % 60) : duration % 60;

	return `${hours}:${minutes}`;
}
