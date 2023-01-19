import Input from '../../../../common/Input/Input';
import { formatDuration } from '../../../../helpers/pipeDuration';

function Duration({ duration, setDuration }) {
	const durationInHours = formatDuration(duration);

	return (
		<>
			<strong>Duration</strong>
			<Input
				type='number'
				value={duration}
				labelText='Duration'
				placeholder='Enter duration in minutes...'
				onChange={(event) => setDuration(event.target.value)}
			/>
			<span className='duration-text'>
				Duration: <strong>{durationInHours}</strong> hours
			</span>
		</>
	);
}
export default Duration;
