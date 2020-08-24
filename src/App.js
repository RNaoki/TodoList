import React, { Component } from 'react';
import { Route } from 'react-router'
import routesConfig from './routesConfig';
import './App.css';
import './style/todo.css'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      language: 'en'
    }
  }
  
  render() {
    return (
      <div>
        {routesConfig.map((value, key) => {
            return <Route
              key={key}
              path={value.path}
              render={(props) => (
                <value.component {...props} language={this.state.language}/>
              )}
              exact={value.exact}
            ></Route>
          })}
      </div>
    );
  }
}

export default App;
