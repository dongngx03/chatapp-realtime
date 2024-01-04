import { createContext, Dispatch, SetStateAction } from "react";

type newFriend = {
    user_id: string,
    username: string,
    email: string
}

// Định nghĩa giao diện cho context
interface ChatRoomCT {
   setEmail: Dispatch<SetStateAction<string>>,
   handleSearchFriend: (e: React.FormEvent<HTMLFormElement>) => Promise<void> // Đã sửa tên thành handleSerchFriend
   newFriend : newFriend
}

// Tạo context với giá trị mặc định trống
const ChatRoomContext = createContext<ChatRoomCT>({
  setEmail: () => {}, // Mặc định setEmail là một hàm trống
  handleSearchFriend: async () => {}, // Mặc định handleSerchFriend là một hàm trống trả về Promise không có giá trị
  newFriend: {
    user_id: '',
    username: '',
    email: '',
  }
});

export default ChatRoomContext;
