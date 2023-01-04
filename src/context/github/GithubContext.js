import { createContext, useState, useReducer } from 'react'
import { useParams } from 'react-router-dom'
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
    user: {},
    repos: [],
    isLoading: false, //if true there will be infinite spinner
  }

  const [state, dispatch] = useReducer(githubReducer, initialState)

  //phase 1 :fetch all users when load page
  //   const fetchUsers = async () => {
  //     //refactoring loading true before fetch
  //     setLoading()

  //     const response = await fetch(`${GITHUB_URL}/users`, {
  //       headers: {
  //         Authorization: `token ${GITHUB_TOKEN}`,
  //       },
  //     })
  //     const data = await response.json()
  //     console.log(data)

  //     //state flow
  //     // setUsers(data)
  //     // setIsLoading(false)

  //     //reducer flow
  //     dispatch({
  //       type: 'GET_USERS',
  //       payload: data,
  //     })
  //   }

  //phase 2 :will trigger fetch user when search
  const searchUsers = async (text) => {
    if (text.length < 0) {
      clearUsers()
    }
    //refactoring loading true before fetch
    setLoading()

    const params = new URLSearchParams({
      q: text,
    })

    const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    })

    //should check response if error or not
    const { items } = await response.json()
    console.log('cek response')
    console.log(items)

    //state flow
    // setUsers(data)
    // setIsLoading(false)

    //reducer flow
    dispatch({
      type: 'GET_USERS',
      payload: items,
    })
  }

  // get detail of user
  const getUser = async (loginUser) => {
    setLoading()

    if (loginUser.length < 0) {
    }

    const response = await fetch(`${GITHUB_URL}/users/${loginUser}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    })

    if (response.status === '404') {
      window.location = '/notfound'
    } else {
      const data = await response.json()

      dispatch({
        type: 'GET_USER',
        payload: data,
      })
    }
  }

  //get user's repos
  const getUserRepos = async (login) => {
    //refactoring loading true before fetch
    setLoading()

    const params = new URLSearchParams({
      sort: 'created',
      per_page: 10,
    })

    const response = await fetch(
      `${GITHUB_URL}/users/${login}/repos?${params}`,
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
        },
      }
    )

    //should check response if error or not
    const data = await response.json()
    console.log('cek response')
    console.log(data)

    //state flow
    // setUsers(data)
    // setIsLoading(false)

    //reducer flow
    dispatch({
      type: 'GET_REPOS',
      payload: data,
    })
  }

  const setLoading = () =>
    dispatch({
      type: 'SET_LOADING',
    })

  const clearUsers = () =>
    dispatch({
      type: 'CLEAR_USERS',
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
        user: state.user,
        repos: state.repos,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,
      }}
    >
      {children}
    </GithubContext.Provider>
  )
}

export default GithubContext
