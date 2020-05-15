import React from 'react';
import {connect} from 'react-redux';
import { getRandomAvatarImage} from '../../actions';

function Avatar(props){
    const {avatarImage, disabled} = props.contactData;
    const divDisabled = disabled? "disabledDiv": undefined;
    const image = disabled? "/images/User-icon.png" : avatarImage;
    return (
        <div className="new-contact-avatar">
            <img src={image} alt="loading"/>
            <div className={divDisabled} onClick={props.getRandomAvatarImage} >
                <button><i className="fa fa-refresh" aria-hidden="true"></i></button>
            </div>
        </div>
    )
}


const mapStateToProps = state => {
	return {contactData: state.contactData};
}


export default connect(mapStateToProps, {getRandomAvatarImage})(Avatar);
