import React from 'react';
import api from '../../services/api';
import {Redirect} from 'react-router-dom';
import './css/main.css';
import './css/util.css';
import './caraio.css'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      password: '',
      errorM: null,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.signIn = this.signIn.bind(this);
  }

  signIn = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth', {
        cpf: this.state.text,
        password: this.state.password
      })
      const { clientUser, token } = await response.data
      await window.localStorage.setItem('@FoodPlanet:token', token);
      await window.localStorage.setItem('@FoodPlanet:user', JSON.stringify(clientUser));
      <Redirect to={{pathname:'/app',state:{from:props.location}}}/>
    } catch (response) {
      this.setState({ errorM: JSON.stringify(response) })
    }
  }


  handleChange(e) {
    this.setState({ text: e.target.value });
  }
  handleChange2(e) {
    this.setState({ password: e.target.value });
  }

  render() {
    return (
      <div className="login">
        <div className="form">
          <div className="limiter">
            <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
              <form className="login100-form validate-form">
                <span className="login100-form-title p-b-49">Login</span>
                <div className="wrap-input100 validate-input m-b-23" data-validate="Username is reauired">
                  <span className="label-input100">CPF</span>
                  <input className="input100" type="text" name="username" 
                  onChange={this.handleChange}
                  value={this.state.text} placeholder="Coloque seu cpf" />
                  <span className="focus-input100"></span>
                </div>

                <div className="wrap-input100 validate-input" data-validate="Password is required">
                  <span className="label-input100">Senha</span>
                  <input className="input100" type="password" name="pass"
                  onChange={this.handleChange2}
                  value={this.state.password}  placeholder="coloque sua senha"/>
                  <span className="focus-input100"></span>
                </div>

                <div className="text-right p-t-8 p-b-31">
                  <a href="google.com">Esqueceu a senha?</a>
                </div>

                <div className="container-login100-form-btn">
                  <div className="wrap-login100-form-btn">
                    <div className="login100-form-bgbtn"></div>
                      <button className="login100-form-btn"  onClick={this.signIn} >Entrar</button>
                    </div>
                  </div>

                  <div className="flex-col-c p-t-155">
                    <a href="google.com" className="txt2">Sign Up</a>
                  </div>
              </form>
            </div>
          </div>
        </div>
            {!!this.state.errorM && <p>{this.state.errorM.message}</p>}
      </div>
    );
  }
}
        
        export default Login;
