const reduxTiles = `
import { createTile } from 'redux-tiles';

const authTile = createTile({
  type: ['user', 'auth'],
  fn: ({ params, api }) => api.post('/login', params)
});
`;

const vanilla = `
const USER_AUTH_START = 'USER_AUTH_START';
const USER_AUTH_SUCCESS = 'USER_AUTH_SUCCESS';
const USER_AUTH_FAILURE = 'USER_AUTH_FALURE';

export function authUser(params) {
  return (dispatch, getState, { api }) => {
    dispatch({
      type: USER_AUTH_START
    });

    return api.post('/login', params)
      .then(data => dispatch({
        type: USER_AUTH_SUCCESS,
        payload: { data }
      }))
      .catch(error => dispatch({
        type: USER_AUTH_FAILURE,
        error
      }));
  }
}

export function reducer(state, action) {
  switch (action.type) {
    case USER_AUTH_START:
      return {
        isPending: true,
        fetched: false,
        data: null,
        error: null
      };
    case USER_AUTH_SUCCESS:
      return {
        isPending: false,
        fetched: true,
        data: { data: action.payload },
        error: null
      });
    case USER_AUTH_FAILURE:
      return {
        isPending: false,
        fetched: true,
        data: null,
        error: action.error
      });
    default:
      return state;
  }
}
`;

export default { reduxTiles, vanilla };