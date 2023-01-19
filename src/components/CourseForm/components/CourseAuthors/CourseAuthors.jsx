import Button from '../../../../common/Button/Button';

function CourseAuthors({ selectedAuthors, setSelectedAuthors }) {
	function handleDeleteAuthor(author) {
		setSelectedAuthors((prev) => {
			const index = prev.findIndex((a) => a.name === author.name);
			if (index > -1) {
				prev.splice(index, 1);
			}
			return [...prev];
		});
	}

	return (
		<>
			<strong>Course Authors</strong>
			<div data-testid='course-authors-list' className='course-authors-list'>
				{selectedAuthors.length > 0
					? selectedAuthors.map((author) => {
							return (
								<div className='selected-author-item' key={author.id}>
									<span>{author.name}</span>
									<Button
										buttonText='Delete author'
										type='button'
										dataTestId={'remove-author-' + author.name}
										onClick={() => handleDeleteAuthor(author)}
									/>
								</div>
							);
					  })
					: 'Author list is empty'}
			</div>
		</>
	);
}
export default CourseAuthors;
