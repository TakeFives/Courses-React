import './input.css';

function Input(props) {
	let label;
	let error;
	let hint;

	if (props.labelText) {
		label = (
			<label htmlFor={props.name} className={props.required ? 'required' : ''}>
				{props.labelText}
			</label>
		);
	}
	if (props.inputError) {
		error = <span className='input-error'>{props.inputError}</span>;
	}
	if (props.inputHint) {
		hint = <span className='input-hint'>{props.inputHint}</span>;
	}

	return (
		<div className='input-container'>
			{label}
			<input
				type={props.type}
				name={props.name}
				id={props.id}
				placeholder={props.placeholder ? props.placeholder : null}
				className={props.className ? 'input ' + props.className : 'input'}
				onChange={props.onChange}
				required={props.required}
				value={props.value}
				data-testid={props.dataTestId}
				onBlur={props.onBlur}
			/>
			{!error ? hint : null}
			{error}
		</div>
	);
}

export default Input;
