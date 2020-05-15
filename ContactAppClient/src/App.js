import React from 'react';
import ContactsHomePage from './Components/ContactsHomePage/Home';
import CreateNewContactPage from './Components/CreateNewContactPage/Home';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import reducers from './reducers'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'

function App() {
  const store = createStore(reducers, applyMiddleware(thunk));
  return (
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                <Route exact path="/" component={ContactsHomePage}/>
                <Route exact path="/contacts" component={ContactsHomePage}/>
                <Route exact path="/contacts/new" component={CreateNewContactPage}/>
                <Route exact path="/contacts/:id" component={CreateNewContactPage}/>
                <Route component={ContactsHomePage}/>
                </Switch>
            </BrowserRouter >
        </Provider>
  );
}
 
export default App;
