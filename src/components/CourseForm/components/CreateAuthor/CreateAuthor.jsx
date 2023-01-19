import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from '../../../../common/Button/Button';
import Input from '../../../../common/Input/Input';
import { fetchCreateAuthorThunk } from '../../../../store/authors/thunk';

function CreateAuthor() {
	const [newAuthor, setNewAuthor] = useState('');
	const dispatch = useDispatch();

	// function handleNewAuthorChange(event) {
	// 	setNewAuthor(event.target.value);
	// }
	function handleCreateAuthor() {
		if (newAuthor) {
			dispatch(fetchCreateAuthorThunk(newAuthor));
		}
	}

	return (
		<>
			<strong>Add author</strong>
			<Input
				type='text'
				value={newAuthor}
				labelText='Author name'
				placeholder='Enter author name...'
				dataTestId='add-author-input'
				onChange={(event) => setNewAuthor(event.target.value)}
			/>
			<Button
				buttonText='Create author'
				type='button'
				dataTestId='add-author-button'
				onClick={handleCreateAuthor}
			/>
		</>
	);
}
export default CreateAuthor;
