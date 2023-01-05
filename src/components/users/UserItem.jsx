import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

function UserItem({ user: { login, avatar_url } }) {
  //direct print
  //   return <div>{user.login}</div>

  //using deconstruct object login
  return (
    <div className='card shadow-md compact side bg-base-100'>
      <div className='flex-row items-center space-x-4 card-body'>
        <div>
          <div className='avatar'>
            <div className='rounded-full shadow w-14 h-14'>
              <img src={avatar_url} alt='profile' />
            </div>
          </div>
        </div>
        <div>
          <h2 className='card-title'>{login}</h2>
          <Link
            className='text-base-content text opacity'
            to={`/user/${login}`}
          >
            visit profile
          </Link>
        </div>
      </div>{' '}
    </div>
  )
}

UserItem.prototype = {
  user: PropTypes.object.isRequired,
}

export default UserItem
