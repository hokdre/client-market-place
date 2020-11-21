import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Profile = props => {
  let {name, link, avatar } = props
  
    return (
        <div className="dashboard-profile">
            <div className="dashboard-profile__avatar">
                <Link to={link}>
                    <img alt="dashboard-picture" src={avatar}/>
                </Link>
            </div>
    <h2 className="dashboard-profile__name heading-secondary"> <Link to={link}>{name}</Link></h2>
        </div>
    )
}

export default Profile