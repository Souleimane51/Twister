// Libraries
import React, { useContext, useEffect } from 'react';
import classes from './Home.module.css';
import { UserContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';
import routes from '../../config/routes';

// Components
import Layout from '../../HOC/Layout/Layout';
import Addtwist from './Addtwist/Addtwist';
import TwistPreview from '../../Components/TwistPreview/TwistPreview';

function Home() {

  const navigate = useNavigate();
  const { user } = useContext(UserContext);


  useEffect(() => {
    if (user === null) {
      navigate(routes.Login)
    }
  }, [user])

  return (
    <Layout widgets={true} pageName={'Home'}>
        <Addtwist />
        <TwistPreview/>
    </Layout>
  )



}

export default Home