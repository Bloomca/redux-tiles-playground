const reduxTiles = `
import { createTile } from 'redux-tiles';

const storyTile = createTile({
  type: ['user', 'auth'],
  fn: ({ params, api }) => api.post(\`/stories/\${params.id}\`),
  nesting: (params) => [params.id]
});
`;

const vanilla = `
const STORY_TILE_START = 'STORY_TILE_START';
const STORY_TILE_SUCCESS = 'STORY_TILE_SUCCESS';
const STORY_TILE_FAILURE = 'STORY_TILE_FAILURE';

export function fetchStory(params) {
  return (dispatch, getState, { api }) => {
    dispatch({
      type: STORY_TILE_START,
      payload: { id: params.id }
    });

    return api.post(\`/stories/\${params.id}\`)
      .then(data => dispatch({
        type: STORY_TILE_SUCCESS,
        payload: { data, id: params.id }
      }))
      .catch(error => dispatch({
        type: STORY_TILE_FAILURE,
        payload: { id: params.id },
        error
      }));
  }
}

export function reducer(state, action) {
  switch (action.type) {
    case STORY_TILE_START:
      return {
        ...state,
        [action.payload.id]: {
          isPending: true,
          fetched: false,
          data: null,
          error: null
        }
      };
    case STORY_TILE_SUCCESS:
      return {
        ...state,
        [action.payload.id]: {
          isPending: false,
          fetched: true,
          data: { data: action.payload },
          error: null
        }
      };
    case STORY_TILE_FAILURE:
      return {
        ...state,
        [action.payload.id]: {
          isPending: false,
          fetched: true,
          data: null,
          error: action.error
        }
      };
    default:
      return state;
  }
}
`;

export default { reduxTiles, vanilla };
