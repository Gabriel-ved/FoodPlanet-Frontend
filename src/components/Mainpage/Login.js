import React from 'react';
import api from '../../services/api';
import './css/main.css';
import './css/util.css';
import './caraio.css';
import {Redirect} from 'react-router-dom';
import Register from './Register';

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      password: '',
      label:'CPF',
      client:true,
      errorM: null,
      registrar:false,
      redirect: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.clientAccount = this.clientAccount.bind(this);
    this.storeAccount = this.storeAccount.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.signIn = this.signIn.bind(this);
  }

  clientAccount(e){
    e.preventDefault();
    this.setState({client:true,label:"CPF"})
  }
  storeAccount(e){
    e.preventDefault();
    this.setState({client:false,label:"CNPJ"})
  }


  signIn = async (e) => {
    e.preventDefault();
    try {
      if(this.state.client === true){
        const response = await api.post('/auth', {
        cpf: this.state.text,
        password: this.state.password
        })
        const { clientUser, token } = await response.data
        await window.localStorage.setItem('@FoodPlanet:token', token);
        await window.localStorage.setItem('@FoodPlanet:user', JSON.stringify(clientUser));
        
      }else{
        const response = await api.post('/auth', {
          cnpj: this.state.text,
          password: this.state.password
          })
          const { storeUser, token } = await response.data
          await window.localStorage.setItem('@FoodPlanet:token', token);
          await window.localStorage.setItem('@FoodPlanet:user', JSON.stringify(storeUser));
      }
      this.setState({redirect:true})
    } catch (response) {
      this.setState({ errorM: JSON.stringify(response) })
    }
  }
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/app/' />
    }
  }


  handleChange(e) {
    this.setState({ text: e.target.value });
  }
  handleChange2(e) {
    this.setState({ password: e.target.value });
  }
  handleLogin(e){
    e.preventDefault();
    this.setState({registrar:false})
  }
  handleRegister(e){
    e.preventDefault();
    this.setState({registrar:true})
  }

  render() {
    return (
      <div className="login">
        <div className="form">
          <div className="limiter">
            <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
              { this.state.registrar ?
                (
                  <div>
                    <button style={{float: 'left'}} onClick={this.handleLogin}><img style={{height:35}}src="https://img.icons8.com/ios/50/000000/back--v1.png" alt="botão voltar para o Login"/></button>
                    <Register/>
                  </div>
                )
                :
                (
                <form className="login100-form validate-form">
                  <span className="login100-form-title p-b-49">Login</span>
                  <div className="wrap-input100 validate-input m-b-23" data-validate="Username is required">
                    <span className="label-input100">{this.state.label}</span>
                    <input className="input100" type="text" name="username"
                    onChange={this.handleChange}
                    value={this.state.text} placeholder={`Coloque seu ${this.state.label}`} />
                    <span className="focus-input100"></span>
                  </div>

                  <div className="wrap-input100 validate-input" data-validate="Password is required">
                    <span className="label-input100">Senha</span>
                    <input className="input100" type="password" name="pass"
                    onChange={this.handleChange2}
                    value={this.state.password}  placeholder="Coloque sua senha"/>
                    <span className="focus-input100"></span>
                  </div>
                  {this.renderRedirect()}
                  <div className="text-right p-t-8 p-b-31">
                    <a href=".">Esqueceu a senha?</a>
                  </div>

                  <div className="">
                    <div className="btn-group btn-group-toggle d-flex m-3 justify-content-between" data-toggle="buttons">
                      <label className="btn btn-secondary active" onClick={this.clientAccount} >
                        <input type="radio" name="options" id="option1" autoComplete="off" defaultChecked/> Client
                      </label>
                      <label className="btn btn-secondary" onClick={this.storeAccount}>
                        <input type="radio" name="options" id="option2"  autoComplete="off"/> Store
                      </label>
                    </div>
                  </div>

                  <div className="container-login100-form-btn">
                    <div className="wrap-login100-form-btn">
                      <div className="login100-form-bgbtn"></div>
                        <button className="login100-form-btn"  onClick={this.signIn} >Entrar</button>
                      </div>
                    </div>

                    <div className="flex-col-c p-t-155">
                      <a onClick={this.handleRegister} href='.' className="txt2">Sign Up</a>
                    </div>
                </form>
                )
            }

            </div>
          </div>
        </div>
            {!!this.state.errorM && <p>{this.state.errorM.message}</p>}
      </div>
    );
  }
}

export default Login;
