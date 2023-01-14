import './App.css';

import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar';
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";

export default class App extends Component {
  state =
    {
      progress: 0
    }
  setProgress = (progress) => {
    this.setState({ progress: progress })
  }
  render() {

    return (

      <div>
        <BrowserRouter>
          <NavBar />
          <LoadingBar
            height={3}
            color='#2fcca2'
            progress={this.state.progress}

          />
          <Switch>
            <Route exact path="/">
              <News setProgress={this.setProgress} key="7" pageSize='15' country='us' category='general' title="Home" />
            </Route>
            <Route exact path="/business">
              <News setProgress={this.setProgress} key="6" pageSize='15' country='us' category='business' title="Business" />
            </Route>
            <Route exact path="/entertainment">
              <News setProgress={this.setProgress} key="5" pageSize='12' country='us' category='entertainment' title="Entertainment" />
            </Route>
            <Route exact path="/health">
              <News setProgress={this.setProgress} key="4" pageSize='12' country='us' category='health' title="Health" />
            </Route>
            <Route exact path="/science">
              <News setProgress={this.setProgress} key="3" pageSize='12' country='us' category='science' title="Science" />
            </Route>
            <Route exact path="/sports">
              <News setProgress={this.setProgress} key="2" pageSize='12' country='us' category='sports' title="Sports" />
            </Route>
            <Route exact path="/technology">
              <News setProgress={this.setProgress} key="1" pageSize='12' country='us' category='technology' title="Technology" />
            </Route>

          </Switch>
        </BrowserRouter>
      </div>

    )
  }
}
