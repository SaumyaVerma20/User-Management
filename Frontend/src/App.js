import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import UserList from './UserList';
import AddEditUser from './AddEditUser';
import ViewUser from './ViewUser';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/" exact component={UserList} />
          <Route path="/add-user" component={AddEditUser} />
          <Route path="/edit-user/:id" component={AddEditUser} />
          <Route path="/view-user/:id" component={ViewUser} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
