import React from 'react';

const Search = ({ handelSearch }) => {
	return (
		<div className="form">
			<input className="input" type="text" onChange={handelSearch} placeholder="Search City..." />
		</div>
	);
};

export default Search;
