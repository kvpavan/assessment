import React from 'react';
import { connect } from 'react-redux';
import { MDBCard, MDBCardBody, MDBRow, MDBCol } from 'mdbreact';
import { Doughnut } from 'react-chartjs-2';
import UsersTable  from '../components/UsersTable';
import UserModal  from '../components/UserModal';
import { validateEmail } from '../helpers'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reload : false, 
      modal: false,
      user : {name : "", email : "", password: "", save:"Create", type: "", age: "", salary : "", submitted: false }
    }
  }

  toggle = (data = false) => {
    var stateData = {user:{}};
    stateData.user.email = '';
    stateData.user.name = '';
    stateData.user.save = 'Create'
    stateData.user.password = '';
    stateData.user.confirm_password = '';
    stateData.user.type = '';
    stateData.user.parent_id = '';
    stateData.user.age = '';
    stateData.user.salary = '';
    if(data){
      if(data.type === 3){
        this.fetchZones(data.store)
      }
      data.save = 'Update';
      data.password = 'Password';
      data.confirm_password = 'Password';
      stateData.user = data;
    }
    stateData.modal = !this.state.modal
    this.setState(stateData);
  }
  
  handleSelectChange = (e) => {
    console.log(e)
    const { name, value } = e.target;
    var stateData = {}
    stateData.user = this.state.user;
    stateData.user[name] = value;
    if(name === 'type'){
      if(value === 5){
        stateData['store'] = '';
        stateData['zone'] = '';
      }
      if(value === 4){        
        stateData['zone'] = '';
      }
    }
    if(name === 'store'){
      this.fetchZones(value)
    }
    this.setState(stateData);
  }
  handleChange = (e) => {
    if(e == null){
      e = { target: { name : 'zone', value: [] } }
    }
    if(typeof e.length != 'undefined'){      
    
      var data = { target: { name: e[0].name, value: [] } };
      e.map(item=>{
        return data.target.value.push(item.value)
      })
      e = data;
    }
    if(e.type === 'select' ){
      e.target = e;
    }
    const { name, value } = e.target;
    var stateData = {}
    stateData.user = this.state.user;
    stateData.user[name] = value;
    
    this.setState(stateData);
  }

  submitUser = (e) => {
    e.preventDefault()
    var stateData = {}
    stateData.user = this.state.user;
    stateData.user.id = this.state.user.uuid;
    stateData.user.submitted = true;
    this.setState(stateData);
    const { name, email, password, confirm_password, type } = this.state.user;

    if(name && validateEmail(email) && (password === confirm_password) && type) {
      fetch("http://"+process.env.REACT_APP_HOST+"/api/users/"+this.state.user.save.toLocaleLowerCase(),{
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state.user)
      })
      .then(response => response.json())
      .then(json => {
        if(json.status === 'success'){
          this.toggle();
          this.setState({reload : !this.state.reload});
        } 
        return MySwal.fire(json.status, json.message, json.status)
      })
      .catch(error=>{
        return MySwal.fire(error.error)
      });
    }
  }

  render() {
    const dataDoughnut = {
        labels: ["Designer", "Developer", "Tester", "Manager"],
        datasets: [{
            data: [12, 12, 12, 12],
            backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1"],
            hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5"]
        }]
    };

    return (
      <div>
      
      <MDBRow className="mb-4">
        <MDBCol xl="4" md="4" className="mb-r">
          <MDBCard className="mb-4">
            <h4>Departments</h4>
            <MDBCardBody >
                <Doughnut data={dataDoughnut}  height={200} options={{responsive: true }} />
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol xl="8" md="8" className="mb-r">
        <h4>Employees</h4>
        <MDBRow className="mb-4">
            <MDBCol xl="3" md="3" className="mb-r">
              <MDBCard className="cascading-admin-card">
                  <div className="admin-up">
                    <div className="data">              
                      <h2>
                        <strong>23</strong>
                      </h2>
                      <p>Designers</p>
                    </div>
                  </div>
                </MDBCard>
            </MDBCol>
            <MDBCol xl="3" md="3" className="mb-r">
              <MDBCard className="cascading-admin-card">
                  <div className="admin-up">
                    <div className="data">              
                      <h2>
                        <strong>30</strong>
                      </h2>
                      <p>Developers</p>
                    </div>
                  </div>
                </MDBCard>
            </MDBCol>
            <MDBCol xl="3" md="3" className="mb-r">
              <MDBCard className="cascading-admin-card">
                  <div className="admin-up">
                    <div className="data">              
                      <h2>
                        <strong>13</strong>
                      </h2>
                      <p>Testers</p>
                    </div>
                  </div>
                </MDBCard>
            </MDBCol>
            <MDBCol xl="3" md="3" className="mb-r">
              <MDBCard className="cascading-admin-card">
                  <div className="admin-up">
                    <div className="data">              
                      <h2>
                        <strong>12</strong>
                      </h2>
                      <p>Managers</p>
                    </div>
                  </div>
                </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBCol>
      </MDBRow>
      <MDBRow className="mb-12">
        <UserModal toggle={this.toggle} submitUser={this.submitUser} handleChange={this.handleChange} users={this.state.users} zones={this.state.zones} modal={this.state.modal} user={this.state.user}/>
        <MDBCol md="12">
            <MDBCard>
                <MDBCardBody>
                  <UsersTable toggle={this.toggle} reload={this.state.reload}/>
                </MDBCardBody>
            </MDBCard>
        </MDBCol>
        
      </MDBRow>
    </div>
    );
  }
}

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
