import './button.css';

function Button(props) {
	return (
		<button
			className={`button ${props.buttonText
				.replace(/\s+/g, '-')
				.toLowerCase()}`}
			onClick={props.onClick}
			disabled={props.disabled}
			type={props.type}
			title={props.title}
			data-testid={props.dataTestId}
		>
			{props.buttonText}
		</button>
	);
}

export default Button;
