import React from 'react'

const OtherMessage:React.FC = () => {
  return (
    <div className='tw-w-full tw-h-auto tw-p-5 d-flex flex-column tw-justify-start '>
        <div className="tw-w-1/2 tw-p-4 tw-overflow-hidden tw-border tw-border-[#2F3949] tw-rounded-lg ">
          <div>
            <span className="tw-break-all tw-text-[#5D7991] tw-font-bold tw-font-mono">hello</span>
          </div>
          <span className='tw-text-xs tw-text-[#5D7991]'>12.00am 30/02/2024</span>
        </div>
    </div>
  )
}

export default OtherMessage