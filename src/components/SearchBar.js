import React, { useState } from 'react';
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { StyleSheet } from 'react-native'
import colors from '../commonUtils/color'

import { SearchBar } from 'react-native-elements'
import {
  handleUserSearchText,
} from '../actions/index';

const SearchBarField = ({ clearInput}) => {

   const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const [searchVal, setSearchVal] = useState();

  const updateSearch = (text) => {
    setSearchVal(text);
    if(searchVal>3){
      dispatch(handleUserSearchText(text))
    }
  }

  return (
    <>
      <SearchBar
        placeholder="Search..."
        onChangeText={text =>updateSearch(text)}
        onClear={() => clearInput()}
        value={user.moviesFromUserSearchText}
        clearIcon={{
          iconStyle: { margin: 10 },
          containerStyle: { margin: -10 },
        }}
        containerStyle={styles.searchbarContainer}
        inputContainerStyle={styles.inputContainer}
      />
    </>
  )
}

const styles = StyleSheet.create({
  searchbarContainer: {
    backgroundColor: 'white',
    borderWidth: 1,
  },
  inputContainer: {
    backgroundColor: colors().COLORS.DARKGREY,
    borderWidth: 1,
    borderRadius: 10,
  },
})

SearchBarField.propTypes = {
  user: PropTypes.object,
  handleUserSearchText: PropTypes.func,
}

export default SearchBarField
