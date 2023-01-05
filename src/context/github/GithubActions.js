import axios from 'axios'

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN
const github = axios.create({
  baseURL: GITHUB_URL,
  headers: { Authorization: `token ${GITHUB_TOKEN}` },
})

//phase 2 :will trigger fetch user when search
export const searchUsers = async (text) => {
  const params = new URLSearchParams({
    q: text,
  })

  //axios - doesn't need headers
  const response = await github.get(`/search/users?${params}`)
  return response.data.items

  //old fetch
  //   const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
  //     headers: {
  //       Authorization: `token ${GITHUB_TOKEN}`,
  //     },
  //   })

  //should check response if error or not
  //   const { items } = await response.json()
  //   console.log('cek response')
  //   console.log(items)

  //state flow
  // setUsers(data)
  // setIsLoading(false)

  //reducer flow
  //   dispatch({
  //     type: 'GET_USERS',
  //     payload: items,
  //   })

  //   return items
}

// using one function
export const getUserAndRepos = async (login) => {
  //run multi function same time
  const [user, repos] = await Promise.all([
    github.get(`/users/${login}`),
    github.get(`/users/${login}/repos`),
  ])

  return { user: user.data, repos: repos.data }
}

// single request - will abondend
// export const getUser = async (loginUser) => {
//   if (loginUser.length < 0) {
//   }

//   const response = await fetch(`${GITHUB_URL}/users/${loginUser}`, {
//     headers: {
//       Authorization: `token ${GITHUB_TOKEN}`,
//     },
//   })

//   if (response.status === '404') {
//     window.location = '/notfound'
//   } else {
//     const data = await response.json()

//     return data
//   }
// }

// //get user's repos
// export const getUserRepos = async (login) => {
//   const params = new URLSearchParams({
//     sort: 'created',
//     per_page: 10,
//   })

//   const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`, {
//     headers: {
//       Authorization: `token ${GITHUB_TOKEN}`,
//     },
//   })

//   //should check response if error or not
//   const data = await response.json()
//   console.log('cek response')
//   console.log(data)

//   //state flow
//   // setUsers(data)
//   // setIsLoading(false)

//   return data
// }
