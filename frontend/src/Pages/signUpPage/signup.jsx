import React from 'react'

import GenderCheckBox from './genderCheckBox'

const Signup = () => {
  return (
    <div>
       <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <h1 className='text-3xl font-semibold text center text-gray-100'>
          SignUp
          <span className='text-blue-500'> ChatApp</span>
          </h1>
       
        <from>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Fullname</span>
            </label>
            <input type='text' placeholder='James Lim' className='w-full input input-bordered h-10' />
          </div>

          <div>
            <label className='label p-2'>
            <span className='text-base label-text'>Username</span>
            </label>
            <input type='text' placeholder='JamesLim' className='w-full input input-bordered h-10' />
          </div>

          <div>
            <label className='label p-2'>
            <span className='text-base label-text'>Password</span>
            </label>
            <input type='password' placeholder='Enter Password' className='w-full input input-bordered h-10' />
          </div>

          <div>
            <label className='label p-2'>
            <span className='text-base label-text'>Confirm  Password</span>
            </label>
            <input type='password' placeholder='Confirm  Password' className='w-full input input-bordered h-10' />
          </div>

          <GenderCheckBox />

          <a href='#' className='text-m hover:underline hover:text-blue-600 mt-2 inline-block'>
            Already have an account?
          </a>

          <div>
            <button className='btn btn-block btn-sm mt-2'>Signup</button>
          </div>
        </from>

      </div>
    </div>
    </div>
  )
}

export default Signup
