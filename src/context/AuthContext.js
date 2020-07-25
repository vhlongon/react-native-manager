import createDataContext from './createDataContext';

export const SIGN_IN = 'SIGN_IN';
export const ADD_ERROR = 'ADD_ERROR';
export const RESET = 'RESET';
export const RESTORE_SESSION = 'RESTORE_SESSION';
export const SIGN_OUT = 'SIGN_OUT';
export const SIGNING_IN = 'SIGNING_IN';
export const CLEAR_ERROR = 'CLEAR_ERROR';

const initialState = { isSignedIn: false, loading: true, token: null, error: null, user: {} };

const authReducer = (state, { type, payload }) => {
  switch (type) {
    case SIGN_IN: {
      const { token, user } = payload;
      return { ...state, isSignedIn: true, loading: false, token, user };
    }
    case ADD_ERROR: {
      return { ...state, error: payload, isSignedIn: false, loading: false };
    }
    case SIGN_OUT: {
      return { ...state, error: null, isSignedIn: false, loading: false, token: null, user: {} };
    }
    case RESTORE_SESSION: {
      const { user, token } = payload;
      return { ...state, loading: false, isSignedIn: true, token, user };
    }
    case RESET: {
      return { initialState, loading: false };
    }
    case SIGNING_IN: {
      return { ...state, loading: true };
    }
    case CLEAR_ERROR: {
      return { ...state, error: null };
    }
    default: {
      return state;
    }
  }
};

const { Provider, useContextState, useContextDispatch } = createDataContext(
  authReducer,
  initialState,
);
const useAuthContext = () => [useContextState(), useContextDispatch()];

export { Provider, useAuthContext };
