import React from 'react';

function SearchBar(props) {
    return (
        <div className="search-input">
            <input type="text" id="searchBarText" name="searchBarText" placeholder="search in contacts..." onChange={(event) => props.handleSearchBarUpdate(event.target.value)}/>
            <div className="search-icon">
                <i className="fa fa-search" aria-hidden="true"></i>
            </div>
        </div>
    )
}


export default SearchBar;
