import { parseRandomContact } from './util'
import axios from 'axios';

export const createRandomContact = () => async dispatch => {
    const response = await fetch('https://randomuser.me/api/');
    let contact = await response.json();
    contact = parseRandomContact(contact);
    if (contact){
        const newContact = await axios.post(`http://localhost:8000/api/contacts`, contact);
        dispatch(createContact(newContact.data))
    }
};


export const resetForm = (contact) => {
	return {
		type: 'RESET_FORM'
	};
};

export const createContact = (contact) => {
	return {
		type: 'CREATE_CONTACT',
		payload: {
			contact
		}
	};
};


export const getContactsFromDB = () => async dispatch => {
    const response = await fetch('http://localhost:8000/api/contacts');
    const contacts = await response.json();
    dispatch({
        type: "GET_CONTACTS_FROM_DB",
        payload:{
            contacts
        }
    })
}

export const searchContacts = (name, amount) => {
    return {
        type: "SEARCH_CONTACTS",
        payload: {
            name: name
        }
    }
}

export const deleteContact = (contactID) => async dispatch => {
    await axios.delete(`http://localhost:8000/api/contacts/${contactID}`)
    dispatch( {
        type: "DELETE_CONTACT",
        payload: {
            contactID
        }
    })
}


export const getRandomAvatarImage = () => {
    const gender = Math.random()<0.5? "men" : "women";
    const imageNumber = Math.floor(Math.random() * 100); 
    const avatarImage = `https://randomuser.me/api/portraits/${gender}/${imageNumber}.jpg`;
    return {
        type: "GET_RANDOM_AVATAR_IMAGE",
        payload: {
            avatarImage
        }
    }
}


export const getContact = (id) => async dispatch => {
    const response = await fetch(`http://localhost:8000/api/contacts/${id}`);
    const contact = await response.json();
    if (contact.length>0){
        dispatch({
            type: "FOUND_CONTACT",
            payload: {
                update: true,
                contact: contact[0],
                avatarImage: contact[0].avatar,
                disabled: false
            }
        })
    } else {
        dispatch({
            type: "NOT_FOUND",
            payload : {
                disabled: true
            }
        })
    }
}


export const updateContact = (id, newContact, history) => async dispatch => {
    await axios.put(`http://localhost:8000/api/contacts/${id}`, newContact);
    dispatch({
        type: 'UPDATE_CONTACT'
    });
    history.push('/contacts');
}


export const createNewContact = (newContact, history) => async dispatch => {
    await axios.post(`http://localhost:8000/api/contacts`, newContact);
    // dispatch(createContact(newContact));
    history.push('/contacts');

}

export const newContactForm = () => async dispatch => {
    const gender = Math.random()<0.5? "men" : "women";
    const imageNumber = Math.floor(Math.random() * 100); 
    const avatarImage = `https://randomuser.me/api/portraits/${gender}/${imageNumber}.jpg`;
    dispatch({
        type: "NEW_CONTACT_FORM",
        payload: {
            contact: {},
            avatarImage,
            update: false,
            disabled: ""
        }
    });
}