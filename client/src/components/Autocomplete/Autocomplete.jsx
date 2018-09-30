import React, {PureComponent} from 'react';

import "./Autocomplete.css"

export default class Autocomplete extends PureComponent {
    constructor(props, context) {
        super(props, context);

        this.state = {
            searchValue: ''
        };
    }

    handleChange = event => {
        const { value } = event.target;
        const { searchUsers, loading, clearSearched } = this.props;
        this.setState({
            searchValue: value
        });

        if(value.length > 1 && !loading) {
            searchUsers(value);
        }

        if(!value.length){
            clearSearched()
        }
    };

    selectUser = (userId) => {
        const { checkConversation, clearSearched } = this.props;
        checkConversation(userId);
        this.setState({
            searchValue: ''
        });
        clearSearched()
    };

    render() {
        const { searchValue } = this.state;
        const { searchedUsers } = this.props;
        return (
            <div className="search">
                <input type="search" value={searchValue} onChange={this.handleChange} className='form-control'/>

                { searchValue && <ul className="search__users">
                    {searchedUsers.map(user => <li key={user._id} onClick={this.selectUser.bind(null, user._id)}>
                        {user.email} <span className="search__user-nickname">{user.nickname}</span></li>)}</ul> }
            </div>
        );
    }
}
