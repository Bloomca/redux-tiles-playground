const reduxTiles = `
import { createTile } from 'redux-tiles';

const userDataTile = createTile({
  type: ['user', 'data'],
  fn: ({ api }) => api.get('/user/data'),
  caching: true
});
`;

const vanilla = `
const USER_DATA_FETCH_START = 'USER_DATA_FETCH_START';
const USER_DATA_FETCH_SUCCESS = 'USER_DATA_FETCH_SUCCESS';
const USER_DATA_FETCH_FAILURE = 'USER_DATA_FETCH_FAILURE';

CONST USER_FETCH_CACHING_ID = 'USER_FETCH_CACHING_ID';

export function fetchUserData() {
  return (dispatch, getState, { api, cache }) => {
    dispatch({
      type: USER_DATA_FETCH_START
    });

    if (cache[USER_FETCH_CACHING_ID]) {
      return cache[USER_FETCH_CACHING_ID];
    }

    const promise = api
      .get('/user/data')
      .then(data => dispatch({
        type: USER_DATA_FETCH_SUCCESS,
        payload: { data }
      }))
      .catch(error => dispatch({
        type: USER_DATA_FETCH_FAILURE,
        error
      }))
      .finally(() => {
        case[USER_FETCH_CACHING_ID] = null;
      });

    case[USER_FETCH_CACHING_ID] = promise;

    return promise;
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case USER_DATA_FETCH_START:
      return {
        isPending: true,
        fetched: false,
        data: null,
        error: null
      };
    case USER_DATA_FETCH_SUCCESS:
      return {
        isPending: false,
        fetched: true,
        data: action.payload,
        error: null
      });
    case USER_DATA_FETCH_FAILURE:
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
