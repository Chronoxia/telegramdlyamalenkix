import React from 'react';
import "./Autocomplete.css";

const Autocomplete = ({
    searchedUsers,
    handleChange,
    selectUser,
    searchValue,
}) => (
    <div className="search">
        <input type="search" value={searchValue} onChange={handleChange} className='form-control'/>
        {searchValue &&
            <ul className="search__users">
                {searchedUsers.map(user => (
                    <li key={user._id} onClick={() => selectUser(user._id)}>
                        <span>
                            {user.email}
                        </span>
                        <span className="search__user-nickname">
                            {user.nickname}
                        </span>
                    </li>
                ))}
            </ul> }
    </div>
);

export default Autocomplete;