import React,{useState} from 'react';
import api from '../../services/api';
import './css/main.css';
import './css/util.css';
import {Redirect} from 'react-router-dom';
import Register from './Register';

import { useDispatch } from 'react-redux';

export default function Login(){

    const [text,setText] = useState('');
    const [password,setPassword] = useState('');
    const [label,setLabel] = useState('CPF');
    const [client,setClient] = useState(true);
    const [errorM,setError] = useState(null);
    const [redirect,setRedirect] = useState(false);
    const [registrar,setRegistrar] = useState(false);
    const dispatch = useDispatch();

  function clientAccount(e){
    e.preventDefault();
    setClient(true)
    setLabel('CPF')
  }
  function storeAccount(e){
    e.preventDefault();
    setClient(false)
    setLabel('CNPJ')
  }


  async function signIn (e){
    e.preventDefault();
    try {
      if(client === true){
        const response = await api.post('/auth', {
        cpf: text,
        password: password
        })
        const { clientUser, token } = await response.data
        await window.localStorage.setItem('@FoodPlanet:token', token);
        await window.localStorage.setItem('@FoodPlanet:user', JSON.stringify(clientUser));
        dispatch({type:'ADD_ACCOUNT',account:clientUser})
      }else{
        const response = await api.post('/auth', {
          cnpj: text,
          password: password
          })
          const { storeUser, token } = await response.data
          await window.localStorage.setItem('@FoodPlanet:token', token);
          await window.localStorage.setItem('@FoodPlanet:user', JSON.stringify(storeUser));
          dispatch({type:'ADD_ACCOUNT',account:storeUser})
      }
      setRedirect(true)
    } catch (response) {
      setError(JSON.stringify(response))
    }
  }
  function renderRedirect(){
    if (redirect) {
      return <Redirect to='/app/' />
    }
  }

  function handleChange(e) {
    setText(e.target.value)
  }
  function handleChange2(e) {
    setPassword(e.target.value)
  }
  function handleLogin(e){
    e.preventDefault();
    setRegistrar(false)
  }
  function handleRegister(e){
    e.preventDefault();
    setRegistrar(true)
  }

    return (
      <div className="login">
        <div className="form">
          <div className="limiter">
            <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
              { registrar ?
                (
                  <div>
                    <button style={{float: 'left'}} onClick={handleLogin}><img style={{height:35}}src="https://img.icons8.com/ios/50/000000/back--v1.png" alt="botão voltar para o Login"/></button>
                    <Register/>
                  </div>
                )
                :
                (
                <form className="login100-form validate-form">
                  <span className="login100-form-title p-b-49">Login</span>
                  <div className="wrap-input100 validate-input m-b-23" data-validate="Username is required">
                    <span className="label-input100">{label}</span>
                    <input className="input100" type="text" name="username"
                    onChange={handleChange}
                    value={text} placeholder={`Coloque seu ${label}`} />
                    <span className="focus-input100"></span>
                  </div>

                  <div className="wrap-input100 validate-input" data-validate="Password is required">
                    <span className="label-input100">Senha</span>
                    <input className="input100" type="password" name="pass"
                    onChange={handleChange2}
                    value={password}  placeholder="Coloque sua senha"/>
                    <span className="focus-input100"></span>
                  </div>
                  {renderRedirect()}
                  <div className="text-right p-t-8 p-b-31">
                    <a href=".">Esqueceu a senha?</a>
                  </div>

                  <div className="">
                    <div className="btn-group btn-group-toggle d-flex m-3 justify-content-between" data-toggle="buttons">
                      <label className="btn btn-secondary active" onClick={clientAccount} >
                        <input type="radio" name="options" id="option1" autoComplete="off" defaultChecked/> Client
                      </label>
                      <label className="btn btn-secondary" onClick={storeAccount}>
                        <input type="radio" name="options" id="option2"  autoComplete="off"/> Store
                      </label>
                    </div>
                  </div>

                  <div className="container-login100-form-btn">
                    <div className="wrap-login100-form-btn">
                      <div className="login100-form-bgbtn"></div>
                        <button className="login100-form-btn"  onClick={signIn} >Entrar</button>
                      </div>
                    </div>

                    <div className="flex-col-c p-t-155">
                      <a onClick={handleRegister} href='.' className="txt2">Sign Up</a>
                    </div>
                </form>
                )
            }

            </div>
          </div>
        </div>
            {!!errorM && <p>{errorM.message}</p>}
      </div>
    );
}
