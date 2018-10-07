import React from 'react';
import PropTypes from 'prop-types';
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
                    <li key={user._id} onClick={() => selectUser(user)} className="search__user">
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

Autocomplete.propTypes = {
    searchedUsers: PropTypes.array.isRequired,
    handleChange: PropTypes.func.isRequired,
    selectUser: PropTypes.func.isRequired,
    searchValue: PropTypes.string.isRequired,
};

export default Autocomplete;