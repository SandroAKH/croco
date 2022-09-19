import { createContext, useState, useEffect } from "react";
import { API } from "./Api"
const UserContext = createContext()
export const UserListProvider = ({ children }) => {
    const [data, setData] = useState();
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 5,
        },
    });

    useEffect(() => {
        fetchUser()
    }, [])

    const fetchUser = async () => {
        const response = await fetch(API)
        const data = await response.json()
        setData(data.reverse());
        setTableParams({
            ...tableParams,
            pagination: {
                ...tableParams.pagination,
                total: data.length,
            },
        });
    }

    const deleteUser = async (id) => {
        await fetch(`${API}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        setData(data.filter((item) => item.id !== id));
    };

    const addUser = async (newUser) => {

        const response = await fetch(API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                newUser
            )

        })
        const resp = await response.json()
        setData([resp, ...data]);

    };

    const updateUser = async (id, updatedItem) => {
        const response = await fetch(`${API}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                updatedItem
            )

        })
        const resp = await response.json()
        setData(data.map(el => el.id === id ? { ...el, ...resp } : el));
    };


    return (
        <UserContext.Provider value={{ data, tableParams, setTableParams, addUser, deleteUser, updateUser }}>
            {children}
        </UserContext.Provider>
    )

}
export default UserContext;