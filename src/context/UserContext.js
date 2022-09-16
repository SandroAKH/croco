import { createContext, useState, useEffect } from "react";

import { API } from "./Api"
const UserContext = createContext()
export const UserListProvider = ({ children }) => {
    const [user, setUser] = useState([])

    useEffect(() => {
        fetchUser()
    }, [])
    const fetchUser = async () => {
        const response = await fetch(API)
        const data = await response.json()
        console.log(data)
        setUser(data)
    }

    return (
        <UserContext.Provider value={{}}>
            {children}
        </UserContext.Provider>
    )

}
export default UserContext;