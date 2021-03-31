import React from 'react';
import { connect } from 'react-redux';
import { Loading } from '../components/Loading'
import image from '../assets/bg.png';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';

class Reset extends React.Component {
  state = {
    c_password: '',
    password: '',
    submitted: false,
    resetError: '',
    isLoading: false    
  }

  componentDidMount(){
    if(localStorage.getItem('user')){
      this.props.history.push('/')
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  submitReset = (e) => {
    e.preventDefault()
    
    let query =  new URLSearchParams(this.props.location.search);
    let token = query.get('token')
    this.setState({ resetError: '', submitted: true, isLoading: true})
    fetch("http://"+process.env.REACT_APP_HOST+"/api/users/reset",{
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: token,
        password: this.state.password,
        c_password: this.state.c_password
      })
    })
    .then(response => response.json())
    .then(json => {
      //console.log(json)
      if(json.error){
        this.setState({ isLoading: false, resetError: json.error})
      }
      else{
        alert('password reset succeful!!');
        //window.location = '/login';
      }
    })
    .catch(error => {
      this.setState({ resetError: 'Unable to reset', isLoading: false})
      console.error('Error during loading:', error);
    });

  }

  render() {
    const { password, c_password, submitted, isLoading, resetError } = this.state

    return (
      <MDBContainer>
      <img src={image} id="bg" alt="login img"/>
        <MDBRow className='login-comp'>
          <MDBCol md="5" className="offset-md-7">
            <MDBCard className="login-card">
              <MDBCardBody>
                  <form>
                    <p className="h3 text-center py-3">Company Name</p>
                    <p className="h5 text-center py-3">Set Password</p>
                    {isLoading ? <Loading /> :
                    <div>
                      <div className="grey-text">

                      <MDBInput
                          value={password}
                          onChange={(e) => this.handleChange(e)}
                          label="Password"
                          name="password"
                          icon="lock"
                          type="password"
                        >
                          {submitted && !password &&
                            <div className="text-danger">Password is required</div>
                          }
                        </MDBInput>

                        <MDBInput
                          value={c_password}
                          onChange={(e) => this.handleChange(e)}
                          label="Confirm Password"
                          icon="lock"
                          name="c_password"
                          type="password"
                        >
                          {submitted && !password &&
                            <div className="text-danger">Password is required</div>
                          }
                          {submitted && password !== c_password &&
                            <div className="text-danger">Password and Confirm password should same</div>
                          }
                        </MDBInput>

                      </div>
                      <MDBRow style={{paddingTop:"35px"}}>
                        <MDBCol md="6" style={{textAlign:"center"}}>
                            <MDBBtn
                                size="lg"
                                type="submit"
                                color="dark"
                                onClick={(e) => window.location='/login'}>
                                Cancel
                                </MDBBtn>                       
                        </MDBCol>
                        <MDBCol md="6"  style={{textAlign:"center"}}>
                            <MDBBtn
                            size="lg"
                            color="primary"
                            type="submit"
                            onClick={(e) => this.submitReset(e)}>
                            Sumbit
                            </MDBBtn>
                        </MDBCol>
                      </MDBRow>
                    </div>
                  }
                  </form>
                {resetError && !isLoading ? <div className="text-success"> { resetError } </div> : null}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
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
)(Reset);
