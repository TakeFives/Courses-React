import './textarea.css';

function Textarea(props) {
	let label;
	if (props.labelText) {
		label = <label htmlFor={props.name}>{props.labelText}</label>;
	}

	return (
		<div className='textarea-container'>
			{label}
			<textarea
				name={props.name}
				placeholder={props.placeholder ? props.placeholder : null}
				className={`textarea ${props.className ? props.className : ''}`}
				value={props.value}
				onChange={props.onChange}
				data-testid={props.dataTestId}
			></textarea>
		</div>
	);
}

export default Textarea;
