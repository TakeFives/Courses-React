import './input.css';

function Input(props) {
	const { labelText, inputError } = props;
	let label;
	let error;

	if (labelText) {
		label = (
			<label htmlFor={props.name} className={props.required ? 'required' : ''}>
				{labelText}
			</label>
		);
	}
	if (inputError) {
		error = <span className='input-error'>{inputError}</span>;
	}

	return (
		<div className='input-container'>
			{label}
			<input
				type={props.type}
				name={props.name}
				id={props.id}
				placeholder={props.placeholder ? props.placeholder : null}
				className={`input ${props.className ? props.className : ''}`}
				onChange={props.onChange}
				required={props.required}
				value={props.value}
				data-testid={props.dataTestId}
			/>
			{error}
		</div>
	);
}

export default Input;
