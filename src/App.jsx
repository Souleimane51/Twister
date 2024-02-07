// Libraries
import React, { useEffect, useContext } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import routes from './config/routes';
import { app } from './config/firebase';
import axios from './config/axiosFirebase';

// Components
import { UserContext } from './context/userContext';
import { TwistContext } from './context/twistContext';
import { ToastContainer } from 'react-toastify';
import Signup from './Containers/Signup/Signup';
import Login from './Containers/Login/Login';
import Home from './Containers/Home/Home';
import Twist from './Containers/Twist/Twist';
import Explore from './Containers/Explore/Explore';
import Commutity from './Containers/Commutity/Commutity';
import Profile from './Containers/Profile/Profile';
import MyTwists from './Components/MyTwists/MyTwists';
import MyRetwists from './Components/MyRetwists/MyRetwists';
import MyDrafts from './Components/MyDrafts/MyDrafts';


function App() {

  
    // Context
    const { user, setUser, setUsers } = useContext(UserContext);
    const { setTwists } = useContext(TwistContext);


  // To store our user
    useEffect(() => {
      app.auth().onAuthStateChanged(user => {
        if (user) {
          console.log(user.email);
          axios.get('/users.json?orderBy="email"&equalTo="' + user.email + '"')
            .then(response => {
              console.log(response);
                for (const key in response.data) {
                  setUser({...response.data[key], id: key});
                };
            })
            .catch(error => {
              console.log(error);
            })

          axios.get('/users.json')
            .then(response => {
              console.log(response);
              setUsers(response.data);
            })
        }
        else {
          setUser(null);
          setUsers(null);
        }
      });
    }, []);

    
  useEffect(() => {

    if (user) {
        axios.get('/twists.json')
        .then(response => {

            const twistsArray = [];

            for (const twistKey in response.data) {
                twistsArray.push({
                    firebasetwistId: twistKey,
                    ...response.data[twistKey],
                });
            } 
            
            setTwists(twistsArray.reverse());

        })
    }
  }, [user])
 

  return (
      
        <div className='App'>
          <Routes>
            <Route path={routes.Home} element={<Home />} />
            <Route path={routes.Twist} element={<Twist/>} />
            <Route path={routes.Explore} element={<Explore/>} />
            <Route path={routes.Profile} element={<Profile/>} >
              <Route path={routes.Profile} element={<MyTwists/>}/>
              <Route path='myretwists' element={<MyRetwists/>}/>
              <Route path='mydrafts' element={<MyDrafts/>}/>
            </Route>
            <Route path={routes.Community} element={<Commutity/>} />
            <Route path={routes.Signup} element={<Signup />} />
            <Route path={routes.Login} element={<Login />} />
            <Route path="*" element={<Home/>} />
          </Routes>
          <ToastContainer position={'top-right'} autoClose={5000} pauseOnHover={false}/>
        </div>   

  )
}

export default App;