import React, { useEffect, useState } from 'react';
import axios from "axios";
const serverUrl = "https://crud-app-5tyu.onrender.com";

export const UserList = () => {
    const [userData, setUserData] = useState("");

    const fetchUsersData = async () => {
        const resp = await axios.get(`${serverUrl}/getUsers`);

        //if no user is there - dont set the value
        if (resp.data.users.length > 0) {
            setUserData(resp.data.users);
        }
    };

    useEffect(() => {
        fetchUsersData();
    }, [userData]);

    //Edit the user
    const handleEdit = async (id) => {
        const userName = prompt("Enter new name");
        const userEmail = prompt("Enter new email");

        if (!userName || !userEmail) {
            alert("Name and Email both are required");
        } else {
            const resp = await axios.put(`${serverUrl}/editUser/${id}`, { name: userName, email: userEmail });
        }
    }

    //Delete the user
    const handleDelete = async (userId) => {
        const resp = await axios.delete(`${serverUrl}/deleteUser/${userId}`);
        console.log(resp);
    }

    return (
        <section className="user-data">
            <div className="data">
                <h1 id="heading">All Users</h1>
                <div className="table-data">
                    <table>
                        <thead>
                            <tr>
                                <th>NAME</th>
                                <th>EMAIL</th>
                                <th>EDIT</th>
                                <th>DELETE</th>
                            </tr>
                        </thead>
                        <tbody id="tbody">
                            {userData && userData.map((user) => (
                                <tr className="userview">
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td><button className="edit-btn" onClick={() => { handleEdit(user._id) }}>Edit</button></td>
                                    <td><button className="delete-btn" onClick={() => { handleDelete(user._id) }}>Delete</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}

