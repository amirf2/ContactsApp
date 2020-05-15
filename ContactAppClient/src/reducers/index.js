import {combineReducers} from 'redux';

const defaultNewContact = {
    contact: {},
    avatarImage: "",
    update: false,
    disabled: ""
}


const contactsReducer = (contacts = [], action) => {

    if (action.type === "GET_CONTACTS_FROM_DB"){
        return action.payload.contacts; 
    }

    if (action.type === "CREATE_CONTACT"){
        if (action.payload.contact)
            return [...contacts,action.payload.contact];
    }

    if (action.type === "DELETE_CONTACT"){
        const { contactID } = action.payload;
        return contacts.filter(contact => contact.id !== parseInt(contactID));
    }

    return contacts;
}

const newContactReducer = (contactData = defaultNewContact, action) => {

    if (action.type === "RESET_FORM"){
        return defaultNewContact
    }

    if (action.type === "GET_RANDOM_AVATAR_IMAGE"){
        const {avatarImage} = action.payload;
        return {...contactData, avatarImage}
    }

    if (action.type === "FOUND_CONTACT"){
       return action.payload
    }

    if (action.type === "NOT_FOUND"){
        const { disabled } = action.payload;
        return {...contactData, disabled}
    }

    if (action.type === "NEW_CONTACT_FORM"){
        return action.payload;
    }
    
    return contactData
}


export default combineReducers({
    contacts: contactsReducer,
    contactData: newContactReducer
})
