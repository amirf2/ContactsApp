import React from 'react';
import {Link} from "react-router-dom";


function NewContact(props) {
    const {createRandomContact} = props;
    return (
    <div className="contact-new">
        <Link to="/contacts/new">
            <button>
                <i className="fa fa-user-plus" aria-hidden="true"></i>
            </button>
        </Link>
        <button onClick={createRandomContact}>
            <i className="fa fa-random" aria-hidden="true" style={{marginLeft: '15px'}}></i>
        </button>
    </div>	
    )
}


export default NewContact;
