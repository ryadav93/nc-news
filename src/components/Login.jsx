import { useEffect, useState } from "react"
import { getUsers } from "../utils/api"
import { useContext } from "react";
import { UserContext } from "../contexts/Theme.jsx";

const Login = () => {
    const {user, setUser} = useContext(UserContext);
    const [users, setUsers] = useState([])
    const [message, setMessage] = useState(null)

    useEffect(() => {
      getUsers().then((fetchedUsers) => {
        setUsers(fetchedUsers);
      });
    }, []);

    const handleSubmit = (username) => {
        setUser(username)
        setMessage(`Logged in as ${username}`)
        return username
  
    }
  
    return (
      <div>
        <h2>Users</h2>
        {<div>{message}</div>}
        <ul className="users-list">
            {users.map(({ username, avatar_url, name }) => {
                return <li className="user-card" key={username}>
                    <p>{username}</p>
                    <img className='user-img'src={avatar_url} alt={`img of ${name}`} />
                    <button onClick={()=> {handleSubmit(username)}} type="login">Login</button>
                    
                </li>
            })}
        </ul>
        
      </div>
    );
}


export default Login 