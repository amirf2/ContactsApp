import React from 'react';
import ContactsHomePage from './Components/ContactsHomePage/Home';
import CreateNewContactPage from './Components/CreateNewContactPage/Home';
import {BrowserRouter, Switch, Route} from "react-router-dom";

function App() {
  return (
    <BrowserRouter >
        <Switch>
        <Route exact path="/">
            <ContactsHomePage />
        </Route>
        <Route exact path="/contacts">
            <ContactsHomePage />
        </Route>
        <Route exact path="/contacts/new">
            <CreateNewContactPage />
        </Route>
        <Route exact path="/contacts/:id">
            <CreateNewContactPage />
        </Route>
        <Route component={ContactsHomePage}/>
        </Switch>
  </BrowserRouter >
  );
}

export default App;
