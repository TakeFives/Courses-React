import './welcome.css';

function Welcome(props) {
	if (props.username) {
		return (
			<div className='welcome-text-container'>
				<p>
					Welcome, <span>{props.username}!</span>
				</p>
			</div>
		);
	}
	return (
		<div className='welcome-text-container'>
			<p>
				Welcome, <span>stranger!</span>
			</p>
		</div>
	);
}

export default Welcome;
