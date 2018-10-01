import React, { PureComponent } from 'react'
import { connect } from "react-redux";

import { searchUsers, clearSearched } from "actions/searchedUsers";
import { checkConversation } from "actions/conversation";
import Autocomplete from "components/Autocomplete";

class AutocompleteContainer extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            searchValue: '',
        };
    }

    handleChange = event => {
        const { value } = event.target;
        const { searchUsers, loading, clearSearched } = this.props;
        this.setState({
            searchValue: value,
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
            searchValue: '',
        });
        clearSearched()
    };

    render() {
        const { searchedUsers, checkConversation, searchUsers, clearSearched } = this.props;
        return (
            <Autocomplete searchedUsers={ searchedUsers }
                          handleChange={ this.handleChange }
                          selectUser={ this.selectUser }
                          searchValue={ this.state.searchValue }
            />
        );
    }
}

const mapStateToProps = (state, props) => ({
    ...props,
    searchedUsers: state.searchedUsers.users,
    loading: state.searchedUsers.loading,
});

const mapDispatchToProps = (dispatch) => ({
    searchUsers: (searchValue) => dispatch(searchUsers(searchValue)),
    checkConversation: (companionId) => dispatch(checkConversation(companionId)),
    clearSearched: () => dispatch(clearSearched())
});

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(AutocompleteContainer);

