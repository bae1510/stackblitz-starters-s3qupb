import React, { createContext, useContext, useReducer } from 'react';

const UserContext = createContext();

const initialState = {
  users: [],
};

const ADD_USER = 'ADD_USER';
const UPDATE_USER = 'UPDATE_USER';
const DELETE_USER = 'DELETE_USER';

const reducer = (state, action) => {
  switch (action.type) {
    case ADD_USER:
      return { ...state, users: [...state.users, action.payload] };
    case UPDATE_USER:
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        ),
      };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
      };
    default:
      throw new Error('Unsupported action type');
  }
};

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => useContext(UserContext);

const UserList = () => {
  const { state, dispatch } = useUser();

  return (
    <div>
      <h2>User List</h2>
      {state.users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul>
          {state.users.map((user) => (
            <li key={user.id}>
              {user.name} - {user.email}
              <button
                onClick={() =>
                  dispatch({ type: DELETE_USER, payload: user.id })
                }
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const UserForm = () => {
  const { dispatch } = useUser();

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const id = Date.now().toString();
    if (name && email) {
      const user = { id, name, email };
      dispatch({ type: ADD_USER, payload: user });
      e.target.reset();
    }
  };

  return (
    <div>
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" required />
        <input type="email" name="email" placeholder="Email" required />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

const App = () => {
  return (
    <UserProvider>
      <UserList />
      <UserForm />
    </UserProvider>
  );
};

export default App;
