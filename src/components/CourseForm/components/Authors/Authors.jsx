import { useSelector } from 'react-redux';
import Button from '../../../../common/Button/Button';
import { getAuthors } from '../../../../selectors';

function Authors({ selectedAuthors, setSelectedAuthors }) {
	const authors = useSelector(getAuthors).filter((author) => {
		return !selectedAuthors.includes(author);
	});

	function handleAddAuthor(author) {
		setSelectedAuthors((prev) => {
			return [...prev, author];
		});
	}

	return (
		<>
			<strong>Authors</strong>
			<div data-testid='authors-list' className='authors-list'>
				{authors.map((author) => {
					return (
						<div
							className='select-author-item'
							key={author.name}
							data-testid='authors-list-item'
						>
							<span>{author.name}</span>
							<Button
								buttonText='Add author'
								type='button'
								dataTestId={'select-author-' + author.name}
								onClick={() => handleAddAuthor(author)}
							/>
						</div>
					);
				})}
			</div>
		</>
	);
}
export default Authors;
