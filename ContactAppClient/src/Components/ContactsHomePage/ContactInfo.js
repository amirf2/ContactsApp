import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteContact } from '../../actions';

function ContactInfo({name, phone, avatar, id, deleteContact}){
    return (
            <div className="contact">
                <div className="contact-avatar">
                    <img src={avatar} alt="loading"/>
                </div>
                    <div className="contact-details">
                        <Link className="special-link" to={{pathname: `/contacts/${id}`}} style={{textDecoration: 'none'}}>
                            <div className="contact-name special-link">{name}</div>
                        </Link>
                        <div className="contact-phone">{phone}</div>
                    </div>
                <div className="contact-buttons">
                    <button><i className="fa fa-phone" aria-hidden="true"></i></button>
                </div>
                <div className="contact-button-close" name={id} onClick={(event) => deleteContact(event.target.getAttribute('name'))}>
                    <i id={id} className="fa fa-times" aria-hidden="true" onClick={(event) => {deleteContact(event.target.id)}}></i>
                </div>
            </div>
    )
}

export default connect(null,{ deleteContact })(ContactInfo);

