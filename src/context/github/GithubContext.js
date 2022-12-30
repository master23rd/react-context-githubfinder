import { createContext, useState, useReducer } from 'react'
import githubReducer from './GithubReducer'

const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GithubProvider = ({ children }) => {
  //use state
  //   const [users, setUsers] = useState([])
  //   const [isLoading, setIsLoading] = useState(true)

  //use reducer
  const initialState = {
    users: [],
    isLoading: false, //if true there will be infinite spinner
  }

  const [state, dispatch] = useReducer(githubReducer, initialState)

  //phase 1 :fetch all users when load page
  //phase 2 :will trigger fetch user when search
  const fetchUsers = async () => {
    //refactoring loading true before fetch
    setLoading()

    const response = await fetch(`${GITHUB_URL}/users`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    })
    const data = await response.json()
    console.log(data)

    //state flow
    // setUsers(data)
    // setIsLoading(false)

    //reducer flow
    dispatch({
      type: 'GET_USERS',
      payload: data,
    })
  }

  const setLoading = () =>
    dispatch({
      type: 'SET_LOADING',
    })

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
        users: state.users,
        isLoading: state.isLoading,
        fetchUsers,
      }}
    >
      {children}
    </GithubContext.Provider>
  )
}

export default GithubContext
