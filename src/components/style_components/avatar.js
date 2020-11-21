import React from 'react';

const Avatar = props => {
    let { src, onClick } = props
    return (
        <div className="avatar">
            <div className="avatar__pic-wrapper">
                    <img onClick={onClick} alt="profile__picture" src={src}/>
            </div>
        </div>
    )
}

export default Avatar;