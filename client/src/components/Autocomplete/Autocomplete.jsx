import React from 'react';
import "./Autocomplete.scss";

const Autocomplete = ({
    searchedUsers,
    handleChange,
    selectUser,
    searchValue,
}) => (
    <div className="search">
        <input type="search" value={searchValue} onChange={handleChange} className='form-control' placeholder='Type email here...'/>
        {!!searchedUsers.length &&
            <ul className="search__users">
                {searchedUsers.map(user => (
                    <li key={user._id} onClick={() => selectUser(user._id)} className="search__user">
                        <img src={user.image || "http://www.drawingforall.net/wp-content/uploads/2018/01/chidi-drawing-lesson.jpg"}
                             className="search__user-image"/>

                        <span className="search__user-nickname">
                            {user.nickname}
                        </span>

                        <span>
                            {user.email}
                        </span>
                    </li>
                ))}
            </ul> }
    </div>
);

export default Autocomplete;