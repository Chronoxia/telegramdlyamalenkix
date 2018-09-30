import React, { PureComponent } from 'react'
import { connect } from "react-redux";
import { searchUsers, clearSearched } from "actions/searchedUsers";
import { checkConversation } from "actions/conversation";

import Autocomplete from "components/Autocomplete";

class AutocompleteContainer extends PureComponent {
    render() {
        const { searchedUsers, checkConversation, searchUsers, clearSearched } = this.props;
        return (
            <Autocomplete searchedUsers={searchedUsers}
                          searchUsers={searchUsers}
                          checkConversation={checkConversation}
                          clearSearched={clearSearched}
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
)(AutocompleteContainer)

