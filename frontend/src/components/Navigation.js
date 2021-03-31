import React, { Component } from 'react';
import { default as TopNavigation } from './TopNavigation';
import { default as SideNavigation } from './SideNavigation';

class Navigation extends Component {
    constructor(props) {
      super(props);
      this.state = { active: window.location.href.split('/').pop() ? window.location.href.split('/').pop() : 'notifications' };
      this.setActive = this.setActive.bind(this);
  
    }
  
    setActive = function(active) {
      this.setState({ active: active });
    }
  
    render() {
      var { signOut, history } = this.props;
        return (  
          <div>        
            <TopNavigation history={history} signOut={signOut} active={this.state.active} setActive={this.setActive}/>
            <SideNavigation history={history} signOut={signOut} setActive={this.setActive}/>
          </div>
        );
    }
}

export default Navigation;
