import React, { createContext, useContext, useReducer } from 'react';

export const initialState = {
  isAuthenticated: false,
  user: null,
};

export const userReducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload, isAuthenticated: true };
    case 'UNSET_USER':
      return { ...state, user: null, isAuthenticated: false };
    default:
      return state;
  }
};

export const UserContext = createContext();

export const UserProvider = ({ initialState, reducer, children }) => {
  return (
    <UserContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
