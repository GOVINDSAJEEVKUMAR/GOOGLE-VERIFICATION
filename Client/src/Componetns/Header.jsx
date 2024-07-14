import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
  const [userdata, setUserdata] = useState({});

  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:8440/login/success", {
        withCredentials: true
      });
      console.log("response", response);
      setUserdata(response.data.user);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

 const logout = () => {
  window.open("http://localhost:8440/logout","_self")
 }





  useEffect(() => {
    getUser(); 
  }, []);

  return (
    <div>
      <header>
        <nav className='flex bg-blue-500 items-center justify-between'>
          <div className='left'>
            <h1 className='logo'>Mern</h1>
          </div>
          <div className='right flex'>
            <ul className='flex p-3 gap-[5rem]'>
              <li><NavLink to='/'>Home</NavLink></li>
              {Object.keys(userdata).length > 0 ? (
                <>
                  <li className='text-black'>{userdata.displayname}</li>
                  <li>
                    <img className=" rounded-full w-10 h-10" src={userdata.image} alt="" />
                  </li>
                  <li><NavLink to='/dashboard'>Dashboard</NavLink></li>
                  <li onClick={logout} >Logout</li>
                </>
              ) : (
                <>
                  <li><NavLink to='/login'>Login</NavLink></li>
                  <li><NavLink to='/error'>Error</NavLink></li>
                </>
              )}
            </ul>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
