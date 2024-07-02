export const increment = () => ({
  type: 'INCREMENT'
});

export const decrement = () => ({
  type: 'DECREMENT'
});

export const addTodo = (text) => ({
  type: 'ADD_TODO',
  payload: { text }
});
