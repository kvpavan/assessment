import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from '../actions/authActions';
import { validateEmail } from '../helpers'
import { Loading } from '../components/Loading'
import image from '../assets/bg.png';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    submitted: ''
  }

  componentDidMount(){
    if(localStorage.getItem('user')){
      this.props.history.push('/')
    }
  }

  handleChange = (e) => {
    const { type, value } = e.target;
    this.setState({ [type]: value });
  }

  submitLogin = (e, action) => {
    e.preventDefault()

    this.setState({ submitted: true });
    const { email, password } = this.state;

    if(validateEmail(email) && password) {
      this.props.authActions.submitLogin(email, password, this.props.history, action)
    }
  }

  render() {
    const { email, password, submitted } = this.state
    const { isLoading, loginError } = this.props

    return (
      <MDBContainer>
      <img src={image} id="bg" alt="login img"/>
        <MDBRow className='login-comp'>
          <MDBCol md="5" className="offset-md-7">
            <MDBCard className="login-card">
              <MDBCardBody>
                  <form>
                    <p className="h3 text-center py-3">Company Name</p>
                    <p className="h5 text-center py-3">Register / Login to Dashboard</p>
                    {isLoading ? <Loading /> :
                    <div>
                      <div className="grey-text">

                        <MDBInput
                          value={email}
                          onChange={(e) => this.handleChange(e)}
                          label="Email"
                          icon="envelope"
                          type="email"
                        >
                          {submitted && !validateEmail(email) &&
                              <div className="text-danger">Email must be valid and not empty</div>
                          }
                        </MDBInput>

                        <MDBInput
                          value={password}
                          onChange={(e) => this.handleChange(e)}
                          label="Password"
                          icon="lock"
                          type="password"
                        >
                          {submitted && !password &&
                            <div className="text-danger">Password is required</div>
                          }
                        </MDBInput>
                        <a href="/forgot">Forgot Password?</a>

                      </div>
                      <MDBRow style={{paddingTop:"35px"}}>
                        <MDBCol md="6" style={{textAlign:"center"}}>
                            <MDBBtn
                                size="lg"
                                type="submit"
                                color="dark"
                                onClick={(e) => this.submitLogin(e, 'create')}>
                                New Signup
                                </MDBBtn>                       
                        </MDBCol>
                        <MDBCol md="6"  style={{textAlign:"center"}}>
                            <MDBBtn
                            size="lg"
                            color="primary"
                            type="submit"
                            onClick={(e) => this.submitLogin(e, 'login')}>
                            Login
                            </MDBBtn>
                        </MDBCol>
                      </MDBRow>
                    </div>
                  }
                  </form>
                {loginError && !isLoading ? <div className="text-danger"> { loginError } </div> : null}
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
    isLoading: state.auth.isLoading,
    loginError: state.auth.loginError
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators(authActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
