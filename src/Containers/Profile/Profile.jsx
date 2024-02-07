// Libearies
import React, {useContext, useEffect} from 'react';
import classes from './Profile.module.css';
import { UserContext } from '../../context/userContext';

// Components
import Layout from '../../HOC/Layout/Layout';
import ProfileCard from '../../Components/ProfileCard/ProfileCard';
import Loader from '../../Components/UI/Loader/Loader';
import SubNav from '../../Components/SubNav/SubNav';
import { Outlet, useNavigate } from 'react-router-dom';

function Profile() {

    const { user, setUser } = useContext(UserContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
          navigate(routes.Login)
        }
      }, [user])


    return user ? (
        <Layout pageName={user.fullName} goBackOption>
            <ProfileCard 
                user={user}
                setUser={setUser}
                personalProfile={true}
            />
            <SubNav/>
            <div style={{marginBottom: "2.5rem"}}>
               <Outlet/> 
            </div>
            
        </Layout>
    )
    :
    (
        <Layout>
            <Loader/>
        </Layout>
        
    )
}

export default Profile