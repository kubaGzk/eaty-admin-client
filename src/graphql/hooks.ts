import { useEffect, useReducer } from 'react';

interface UseQueryState<T = null> {
  data: T | null;
  error: string | null;
  isLoading: boolean;
}

enum Action {
  ERROR = 'ERROR',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
}

type ActionHandler<T> =
  | { type: Action.LOADING }
  | { type: Action.SUCCESS; data: T }
  | { type: Action.ERROR; error: string };

export const makeReducer =
  <T>() =>
  (state: UseQueryState<T>, action: ActionHandler<T>): UseQueryState<T> => {
    switch (action.type) {
      case Action.LOADING:
        return { ...state, data: null, error: null, isLoading: true };
      case Action.SUCCESS:
        return { ...state, data: action.data, error: null, isLoading: false };
      case Action.ERROR:
        return { ...state, error: action.error, isLoading: false };
      default:
        return state;
    }
  };

export const useQuery = <T, V>({
  query,
  variables,
  authToken,
  fetchOnInit,
  onStart,
  onData,
  onError,
}: {
  query: string;
  variables?: V;
  authToken?: string;
  fetchOnInit?: boolean;
  onStart?: () => void;
  onData?: (data: any) => void;
  onError?: (error: string) => void;
}) => {
  const initialState: UseQueryState<T> = {
    data: null,
    error: null,
    isLoading: false,
  };

  const reducer = makeReducer<T>();

  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchData = async (localVars?: V) => {
    dispatch({ type: Action.LOADING });
    onStart && onStart();

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/graphql`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: authToken ? `Bearer ${authToken}` : '',
          },
          body: JSON.stringify({
            query,
            variables: localVars || variables,
          }),
        },
      );

      const {
        data,
        // extensions,
        errors,
      }: { data: any; extensions?: any; errors?: any } = await response.json();

      if (!response.ok || errors) {
        const errMsg = [];

        for (const err of errors) {
          errMsg.push(err.message);
        }

        if (errMsg.length === 0) {
          errMsg.push('Unexpected error. Please try again.');
        }

        throw new Error(errMsg.join('/n'));
      }

      dispatch({ type: Action.SUCCESS, data: data });
      onData && onData(data);
    } catch (err) {
      let error: string;

      if (err.message.length > 0) {
        error = err.message;
      } else {
        error = 'Unexpected error. Please try again.';
      }

      dispatch({ type: Action.ERROR, error: error });
      onError && onError(error);
    }
  };

  useEffect(() => {
    fetchOnInit && fetchData();
  }, []);

  return { ...state, fetchData };
};
