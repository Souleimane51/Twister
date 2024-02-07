// Libraries
import React, { useContext, useEffect } from 'react';
import classes from './Explore.module.css';
import routes from '../../config/routes';
import { useNavigate } from 'react-router-dom';

// Components
import Layout from '../../HOC/Layout/Layout';
import TwistPreview from '../../Components/TwistPreview/TwistPreview';
import { UserContext } from '../../context/userContext';



function Explore() {

  const {user} = useContext(UserContext)

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate(routes.Login)
    }
  }, [user])

  return (
  <Layout widgets={true} pageName={'Trends For You'}>
    <TwistPreview/>
  </Layout>
  )
}

export default Explore;