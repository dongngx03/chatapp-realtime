import React from 'react'

interface propsMessage {
  content: string,
  created_at: string
}

const MyMessage: React.FC<propsMessage> = (props) => {
  const {content, created_at} = props
  return (
    <div className='tw-w-full tw-h-auto tw-p-5 d-flex tw-justify-end'>
      <div className="tw-w-1/2 tw-p-4 tw-overflow-hidden tw-bg-[#3B82F7] tw-rounded-lg">
        <div>
          <span className="tw-break-all tw-text-white tw-font-bold tw-font-mono">{content}</span>
        </div>
        <span className='tw-text-xs tw-text-white'>{created_at}</span>
      </div>
    </div>
  )
}

export default MyMessage