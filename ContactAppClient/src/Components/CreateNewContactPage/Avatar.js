import React from 'react';

function Avatar(props){
    const {image, updateAvatarImage, disabled} = props;
    const divDisabled = disabled? "disabledDiv": undefined;
    const avatrImage = disabled? "/images/User-icon.png" : image;
    return (
        <div className="new-contact-avatar">
            <img src={avatrImage} alt="loading"/>
            <div className={divDisabled} onClick={updateAvatarImage} >
                <button><i className="fa fa-refresh" aria-hidden="true"></i></button>
            </div>
        </div>
    )
}

export default Avatar;
