import React from 'react';
import { Routes } from './components'
import { Navigation, Footer } from './components'
import { history } from './helpers'
import { signOut } from './actions/authActions';

const ThisComp = () => {
  if(localStorage.getItem('user')){
    return (
      <div className="flexible-content">
        <Navigation history={history} signOut={signOut}/>
        <main id="content" className="p-5">
          <Routes />
        </main>
        <Footer />
      </div>
    );
  }else{
    return(
      <div className="flexible-content">
        <Routes />
      </div>
    );
  }
}

class App extends React.Component {
  render(){
    return (
      <div className="flexible-content">
        <ThisComp />
      </div>
    );
  }
}

export default App;
