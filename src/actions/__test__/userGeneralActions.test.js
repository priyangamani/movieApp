import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as getUserActions from '../index'
const middlewares = [thunk]
const mockStore = configureStore(middlewares)
const store = mockStore({})

describe('User General Actions Tests', () => {
  it('should search movies terms correctly when executing handleUserSearchText() ', () => {
    const handleUserSearchText = getUserActions.handleUserSearchText('Titanic')
    expect(handleUserSearchText).toBeDefined();
  })

  it('should clearUserSearchText correctly ', () => {
    const clearUserSearchText = getUserActions.clearUserSearchText()
    expect(clearUserSearchText).toEqual({
      type: 'CLEAR_USER_SEARCH_TEXT',
      payload: '',
    })
  })
})
