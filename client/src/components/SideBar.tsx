import React from 'react'
import { Button } from 'antd'
import AddFriend from './AddFriend'
import OtherFriends from './OtherFriends'
import { SearchOutlined, UsergroupAddOutlined } from '@ant-design/icons'



const SideBar: React.FC = () => {

  return (
    <div className='tw-w-full tw-h-full'>
      <form action="" className='tw-w-full tw-h-[3.5rem] d-flex justify-content-center align-items-center tw-gap-2'>
        <input
          type="text"
          className='tw-w-full tw-h-2/3 tw-rounded-lg tw-border tw-border-[#7E8687] tw-bg-[#374151] tw-px-5 tw-text-[#7E8687]'
          placeholder='Nhập mã phòng của bạn'

        />
        <Button
          htmlType='submit'
          className='tw-h-2/3 tw-border tw-border-[#7E8687] tw-text-[#7E8687] d-flex justify-content-center align-items-center'
        >
          <SearchOutlined />
        </Button>
        <Button
          htmlType='submit'
          className='tw-h-2/3 tw-border tw-border-[#7E8687] tw-text-[#7E8687] d-flex justify-content-center align-items-center'
        >
          <UsergroupAddOutlined />
        </Button>
      </form>

      {/* search */}
      <AddFriend />

      {/* other friends */}
      <OtherFriends />

    </div>
  )
}

export default SideBar