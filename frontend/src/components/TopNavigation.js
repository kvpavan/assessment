import React, { Component } from 'react';
import { MDBIcon, MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBBtn } from 'mdbreact';

import Select, { components }  from 'react-select';

const DropdownIndicator = props => {
    return (
      components.DropdownIndicator && (
        <components.DropdownIndicator {...props}>
          <MDBIcon icon="search"
            aria-hidden="true"
          />
        </components.DropdownIndicator>
      )
    );
  };

  const ValueContainer = ({ children, ...props }) => {
    return (
      components.ValueContainer && (
        <components.ValueContainer {...props}>
          {!!children && (
             <MDBIcon icon="language" 
              style={{ position: 'absolute', margin:'10px', left: 8 }}
            />
          )}
          {children}
        </components.ValueContainer>
      )
    );
  };

  const styles = {
    valueContainer: base => ({
      ...base,
      paddingLeft: 24,        
      width: 250,
      height: 24,
      marginTop : '12px'
    })
  }


class TopNavigation extends Component {
    state = {
        collapse: false,
        active: this.props.active,
        languages: [{value:"english", label:"English" }, { value: "telugu", label: "Telugu"}],
        lang: "english"
    }

    handleChange = (e) => { 
        if(e.value){
          console.log(e)                       
         this.setState({lang: e.value})
        }       
    }

    setActive = (path) => {
      this.props.setActive(path);
      this.onClick();
    }


    render() {
      const { signOut, history } = this.props
      
      const d = new Date();
      const n = d.toString();

        return (
          <div className="flexible-navbar">
            <MDBNavbar className="flexible-navbar" light expand="md" scrolling>
                <MDBNavbarBrand href="/" onClick={() => this.setActive("dash")}>
                    
                </MDBNavbarBrand>
                <MDBNavbarToggler onClick = { this.onClick } />
                <MDBCollapse isOpen = { this.state.collapse } navbar>
                    <MDBNavbarNav left>
                      <MDBNavItem>                          
                            <Select options={this.state.languages} 
                            className="md-8 md-form form-group"
                            components={{ DropdownIndicator, ValueContainer }}
                            styles={styles}
                            placeholder="select a language"
                            value={this.state.lang} 
                            onChange={(e) => this.handleChange(e)}
                            />
                        </MDBNavItem>
                    </MDBNavbarNav>       
                    <MDBNavbarNav right>
                        <MDBNavItem>
                          <div style={{backgroundColor:"gray", padding:'10px'}}>Hyderabad</div>
                        </MDBNavItem>
                    </MDBNavbarNav>
                    <MDBNavbarNav right>
                        <MDBNavItem>
                          <div style={{width:"50px"}}>{n.substr(0, 10)}</div>
                        </MDBNavItem>
                    </MDBNavbarNav>
                    <MDBNavbarNav right>
                        <MDBNavItem>
                          <MDBBtn
                            color="primary"
                            onClick={() => {
                              signOut(history)
                            }}>
                              Sign Out
                            </MDBBtn>
                        </MDBNavItem>
                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBNavbar>
          </div>
        );
    }
}

export default TopNavigation;
