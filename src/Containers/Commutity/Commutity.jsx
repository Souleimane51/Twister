// Libraries
import React, { useContext, useEffect } from 'react';
import classes from './Commutity.module.css';
import { UserContext } from '../../context/userContext';

// Components
import Layout from '../../HOC/Layout/Layout';
import WhoToFollow from '../../Components/WhoToFollow/WhoToFollow';
import PrevUserInfo from '../../Components/PrevUserInfo/PrevUserInfo';
import { useNavigate } from 'react-router-dom';
import routes from '../../config/routes';

function Commutity() {

    const { users, user } = useContext(UserContext);

    
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
          navigate(routes.Login)
        }
    }, [user])

      // Put each user as an object in the 'usersArray' array to be able to map them
        const usersArray = [];
        for (const key in users) {
            // put user only if his email address is different of the current one
            if(user && user.email !== users[key].email) {
                usersArray.push({
                    id: key,
                    ...users[key]
                });
            }
        }

    return (
        <Layout widgets={false} pageName={'Discover new People'}>
            {
                usersArray.map(user => {

                    return (
                        <PrevUserInfo
                            key={user.id}
                            individualUser={user}
                            communityPage={true}
                        />
                    )
                })
                
            }
        </Layout>
    )
}

export default Commutity