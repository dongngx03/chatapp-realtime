import { createContext } from "react";
import { AppContexts } from "../../interface";

const Object: AppContexts = {
    user_id: "",
    user_name: "",
    token: ""
}

const AppContext = createContext<AppContexts>(Object);

export default AppContext