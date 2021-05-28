import React from 'react';
// switch is to prevent the wildc`rd routing. it will only show one route for any given path that matches
import { Router, Route, Switch } from 'react-router-dom';
import Header from './Header';
import history from '../history';
import StreamCreate from './streams/StreamCreate';
import StreamEdit from './streams/StreamEdit';
import StreamDelete from './streams/StreamDelete';
import StreamShow from './streams/StreamShow';
import StreamList from './streams/StreamList';


// the keyword 'exact' makes that the component is only shown if the url is 
// exactly that. If you leave that out it will show all components that have the string of the url
// is the same as exact={true}
const App = () => {
    // the history prop in the Router is so we keep track ourselves of the
    // history of the user in terms of navigation. This is so we can more easily reuse it around components
    // Normally you would use browserRouter
    return (
        <div className="ui container">
            <Router history={history}>
            <div>
                <Header></Header>
                <Switch>
                    <Route path="/" exact component={StreamList}/> 
                    <Route path="/streams/new" exact component={StreamCreate}/>
                    <Route path="/streams/edit/:id" exact component={StreamEdit}/>
                    <Route path="/streams/delete/:id" exact component={StreamDelete}/>
                    <Route path="/streams/:id" exact component={StreamShow}/>
                </Switch>
                </div>
            </Router>
        </div>
    );
}

export default App;