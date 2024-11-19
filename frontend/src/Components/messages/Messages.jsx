import React from 'react'

import Message from './Message'

const Messages = () => {
  return (
    //over flow auto para auto scroll kung mo lapas sa container
    <div className='px-4 flex-1 overflow-auto'>   
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
    </div>
  )
}

export default Messages
