import Button from '../../../../common/Button/Button';
import Input from '../../../../common/Input/Input';

import './searchbar.css';

function SearchBar(props) {
	return (
		<div className='search-container'>
			<Input
				type='text'
				placeholder='Enter course name...'
				className='search-input'
				onChange={props.searchInputHandler}
			/>
			<Button buttonText='Search' onClick={props.searchClickHandler}></Button>
		</div>
	);
}

export default SearchBar;
