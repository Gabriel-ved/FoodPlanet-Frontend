import React from 'react';
import api from '../../services/api';
import './css/main.css';
import './css/util.css';
import './caraio.css';
import {Redirect} from 'react-router-dom';

class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name:'',
      text: '',
      password: '',
      label:'CPF',
      client:true,
      errorM: null,
      redirect: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleChange3 = this.handleChange3.bind(this);
    this.clientAccount = this.clientAccount.bind(this);
    this.storeAccount = this.storeAccount.bind(this);
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
        const response = await api.post('/register', {
          name: this.state.name,
          cpf: this.state.text,
          password: this.state.password
        })
        const { client, token } = await response.data
        await window.localStorage.setItem('@FoodPlanet:token', token);
        await window.localStorage.setItem('@FoodPlanet:user', JSON.stringify(client));
      }else{
        const response = await api.post('/register', {
          name: this.state.name,
          cnpj: this.state.text,
          password: this.state.password
        })
        const { store, token } = await response.data
        await window.localStorage.setItem('@FoodPlanet:token', token);
        await window.localStorage.setItem('@FoodPlanet:store', JSON.stringify(store));
      }
      this.setState({redirect:true})
    } catch (err) {
      this.setState({ errorM: JSON.stringify(err) })
    }
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/step' />
    }
  }


  handleChange(e) {
    this.setState({ text: e.target.value });
  }
  handleChange2(e) {
    this.setState({ password: e.target.value });
  }
  handleChange3(e) {
    this.setState({ name: e.target.value });
  }

  render() {
    return (
      <div className="Register">
              <form className="login100-form validate-form">

                <span style={{paddingRight:34}} className="login100-form-title p-b-49">Registrar</span>
                <div className="wrap-input100 validate-input m-b-23" data-validate="Username is reauired">
                  <span className="label-input100">Nome</span>
                  <input className="input100" type="text" name="username"
                  onChange={this.handleChange3}
                  value={this.state.name} placeholder="Coloque seu nome" />
                  <span className="focus-input100"></span>
                </div>

                <div className="wrap-input100 validate-input m-b-23" data-validate="CPF/CNPJ is reauired">
                  <span className="label-input100">{this.state.label}</span>
                  <input className="input100" type="text" name="username"
                  onChange={this.handleChange}
                  value={this.state.text} placeholder={`Coloque o ${this.state.label}`} />
                  <span className="focus-input100"></span>
                </div>

                <div className="wrap-input100 validate-input" data-validate="Password is required">
                  <span className="label-input100">Senha</span>
                  <input className="input100" type="password" name="pass"
                  onChange={this.handleChange2}
                  value={this.state.password}  placeholder="Coloque sua senha"/>
                  <span className="focus-input100"></span>
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
                {this.renderRedirect()}
                <div className="container-login100-form-btn">
                  <div className="wrap-login100-form-btn">
                    <div className="login100-form-bgbtn"></div>
                      <button className="login100-form-btn"  onClick={this.signIn} >registrar</button>
                    </div>
                  </div>
              </form>
              {!!this.state.errorM && <p>{this.state.errorM.message}</p>}
            </div>
    );
  }
}

export default Register;
