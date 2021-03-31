import React from 'react';
import { connect } from 'react-redux';
import { validateEmail } from '../helpers'
import { Loading } from '../components/Loading'
import image from '../assets/bg.png';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';

class Forgot extends React.Component {
  state = {
    email: '',
    submitted: false,
    forgotError: '',
    isLoading: false
    
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

  submitForgot = (e) => {
    e.preventDefault()
    this.setState({ forgotError: '', submitted: true, isLoading: true})
    fetch("http://"+process.env.REACT_APP_HOST+"/api/users/forgot",{
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.state.email
      })
    })
    .then(response => response.json())
    .then(json => {
      //console.log(json)
      if(json.error){
        this.setState({ isLoading: false, forgotError: json.error})
      }
      else{
        alert('Mail sent with a reset link')
        window.location = '/login';
      }
    })
    .catch(error => {
      this.setState({ forgotError: 'Unable to send mail', isLoading: false})

      console.error('Error during loading:', error);
    });

  }

  render() {
    const { email, submitted, isLoading, forgotError } = this.state

    return (
      <MDBContainer>
      <img src={image} id="bg" alt="login img"/>
        <MDBRow className='login-comp'>
          <MDBCol md="5" className="offset-md-7">
            <MDBCard className="login-card">
              <MDBCardBody>
                  <form>
                    <p className="h3 text-center py-3">Company Name</p>
                    <p className="h5 text-center py-3">Forgot Password?</p>
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
                        {forgotError && !isLoading ? <div className="text-success"> { forgotError } </div> : null}
                        
                        <a href="/login">Login?</a>

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
                            onClick={(e) => this.submitForgot(e)}>
                            Send
                            </MDBBtn>
                        </MDBCol>
                      </MDBRow>
                    </div>
                  }
                  </form>
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
)(Forgot);
