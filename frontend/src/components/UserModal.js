import React, {Component} from 'react';
import { MDBModal, MDBContainer, MDBBtn, MDBIcon, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBInput, MDBCol, MDBRow } from 'mdbreact';

import { validateEmail } from '../helpers';
import Select from 'react-select';


const userTypes = [
  { value: 5, label: 'Developer', name: 'type', type: 'select' },
  { value: 4, label: 'Designer', name: 'type', type: 'select' },
  { value: 3, label: 'Manager', name: 'type', type: 'select' }
];


class UserModal extends Component {
    constructor() {
        super();
    
        this.state = {
          value: '',
          suggestions: []
        };    
      }
    
      
    render() {
        const { name, email, password, confirm_password, type, age, salary, submitted, save } = this.props.user;
                        
        return (
            <MDBContainer>                   
                <MDBRow> 
                  <MDBCol className="mb-3"> 
                    <h4>List of Employees</h4>
                  </MDBCol>
                  <MDBCol className="mb-2 offset-7"> 
                      <MDBBtn  color="primary" onClick={()=>this.props.toggle(false)}>
                          <MDBIcon icon="plus" />&nbsp;&nbsp; Add Users
                      </MDBBtn>
                  </MDBCol>
                </MDBRow>
                    
                
                
                <MDBModal isOpen={this.props.modal} toggle={this.props.toggle}>
                    <MDBModalHeader toggle={this.toggle}>{save + " User" }</MDBModalHeader>
                <MDBModalBody>                    
                    <MDBInput label="Name" value={name} name="name" onChange={(e) => this.props.handleChange(e)}>
                        {submitted && !name &&
                              <div className="text-danger">Name not empty</div>
                        }
                    </MDBInput>
                    <MDBInput label="Email" value={email } name="email" onChange={(e) => this.props.handleChange(e)}>
                        {submitted && !validateEmail(email) &&
                              <div className="text-danger">Email must be valid and not empty</div>
                          }    
                    </MDBInput>
                    <MDBInput label="Password"  group type="password" name="password" validate value={password} onChange={(e) => this.props.handleChange(e)}>
                        {submitted && (!password || (password !== confirm_password)) &&
                              <div className="text-danger">Check Password and Confirm Password</div>
                        }
                    </MDBInput>
                    <MDBInput label="Confirm Password"  group type="password" name="confirm_password" validate value={confirm_password} onChange={(e) => this.props.handleChange(e)}>
                        {submitted && (!confirm_password || (password !== confirm_password)) &&
                              <div className="text-danger">Check Password and Confirm Password</div>
                        }
                    </MDBInput>
                    <Select options={userTypes}   
                      className="md-form form-group"
                      placeholder="select a user type"                  
                      value={userTypes.find(option => option.value === type)} 
                      onChange={(e) => this.props.handleChange(e)}/>
                    {submitted && !type &&
                              <div className="text-danger">Select a type</div>
                        }
                    <MDBInput label="Age" type="number" value={age} name="age" onChange={(e) => this.props.handleChange(e)}>
                        {submitted && !age &&
                              <div className="text-danger">Age not empty</div>
                        }
                    </MDBInput>
                        
                    <MDBInput label="Salary" type="number" value={salary} name="salary" onChange={(e) => this.props.handleChange(e)}>
                        {submitted && !salary &&
                              <div className="text-danger">Salary not empty</div>
                        }
                    </MDBInput>
                      
                </MDBModalBody>
                <MDBModalFooter>
                    <MDBBtn color="secondary" onClick={this.props.toggle}>Close</MDBBtn>
                    <MDBBtn type="submit" onClick={(e) => this.props.submitUser(e)} color="primary">{this.props.user.save}</MDBBtn>
                </MDBModalFooter>
                </MDBModal>
            </MDBContainer>);
    }
}


export default UserModal;