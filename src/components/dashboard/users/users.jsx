import React, {useEffect, useState} from 'react'
import Styles from "./users.module.css"
import Row from "./row.jsx"
import { getUsersWithInfo } from '@/lib/dashboard'


const users = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);

  const getUsers = async()=>{
    const data = await getUsersWithInfo(fullname, email);
    setUsers(data);
  }
  
  const submit = async (e)=>{
    e.preventDefault();
    await getUsers();
  }

  useEffect(()=>{
    getUsers();
  },[])

  return (
    <section className={Styles.users}>
      <h1 className={Styles.title}>Users</h1>
      <form onSubmit={submit} className={Styles.form} action="">
        <input value={fullname} onChange={(e)=>setFullname(e.target.value)} type="text" placeholder='Fullname..' />
        <input value={email} onChange={(e)=>setEmail(e.target.value)} type="text" placeholder='Email...' />
        <button>Search</button>
      </form>
      <ul className={Styles.list}>
        <li>
          <article>
            <h3>
              Name
            </h3>
            <h3>
              Email
            </h3>
            <h3>Number of Posts</h3>
            <h3>Admin</h3>
          </article>
        </li>
        {users?.map((user)=>{
          return <Row id={user.id} getUsers={getUsers} email={user.email} fullname={user.fullname} />
        })}
        <Row />
      </ul>
    </section>
  )
}

export default users