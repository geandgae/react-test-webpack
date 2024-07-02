const initialState = {
  count: 0,
  todos: []
};

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 };
    case 'DECREMENT':
      return { ...state, count: state.count - 1 };
    case 'ADD_TODO':
      return { ...state, todos: [...state.todos, { text: action.payload.text }] };
    default:
      return state;
  }
};

export default counterReducer;