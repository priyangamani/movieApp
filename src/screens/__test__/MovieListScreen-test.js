import React from 'react'
import renderer from 'react-test-renderer'
import PropTypes from 'prop-types'
import { mount, shallow } from 'enzyme'
import expect from 'expect'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import MovieListScreen from '../MovieListScreen'
import SearchBar from '../../components/SearchBar'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
const store = configureStore()({})
test('renders correctly', () => {
  const tree = renderer.create(<SearchBar />).toJSON()
  expect(tree).toMatchSnapshot()
})
