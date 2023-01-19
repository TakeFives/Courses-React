export function formatDate(date) {
	const today = date;
	const yyyy = today.getFullYear();
	let mm = today.getMonth() + 1;
	let dd = today.getDate();

	const formattedToday = dd + '/' + mm + '/' + yyyy;
	return formattedToday;
}
