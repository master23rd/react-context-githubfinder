import { createContext, useState, useReducer } from 'react'
import githubReducer from './GithubReducer'

const GithubContext = createContext()

//github url and token move to githubaction

export const GithubProvider = ({ children }) => {
  //use state
  //   const [users, setUsers] = useState([])
  //   const [isLoading, setIsLoading] = useState(true)

  //use reducer
  const initialState = {
    users: [],
    user: {},
    repos: [],
    isLoading: false, //if true there will be infinite spinner
  }

  const [state, dispatch] = useReducer(githubReducer, initialState)

  // search user move to githubactions
  // get detail of user move to githubactions
  // get user repo move to githubactions

  return (
    <GithubContext.Provider
      //state flow
      //   value={{
      //     users,
      //     isLoading,
      //     setUsers,
      //     setIsLoading,
      //     fetchUsers,
      //   }}

      //reducer flow
      value={{
        ...state,
        dispatch,
        // users: state.users,
        // isLoading: state.isLoading,
        // user: state.user,
        // repos: state.repos,
        // searchUsers,
        // clearUsers,
        // getUsers,
        // searchUsers,
        // getUser,
        // setLoading,
      }}
    >
      {children}
    </GithubContext.Provider>
  )
}

export default GithubContext
