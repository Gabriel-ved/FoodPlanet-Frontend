import React,{useState} from 'react';
import api from '../../services/api';
import './css/main.css';
import './css/util.css';
import {Redirect} from 'react-router-dom';

export default function Register () {
  const [name,setName] = useState('');
  const [text,setText] = useState('');
  const [password,setPassword] = useState('');
  const [label,setLabel] = useState('CPF');
  const [client,setClient] = useState(true);
  const [errorM,setError] = useState(null);
  const [redirect,setRedirect] = useState(false);

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
    console.log(client)
    console.log(name)
    try {
      if(client === true){
        const response = await api.post('/register', {
          name: name,
          cpf: text,
          password: password
        })
        const { client, token } = await response.data
        await window.localStorage.setItem('@FoodPlanet:token', token);
        await window.localStorage.setItem('@FoodPlanet:user', JSON.stringify(client));
      }else{
        const response = await api.post('/register', {
          name: name,
          cnpj: text,
          password: password
        })
        const { store, token } = await response.data
        await window.localStorage.setItem('@FoodPlanet:token', token);
        await window.localStorage.setItem('@FoodPlanet:store', JSON.stringify(store));
      }
      setRedirect(true)
    } catch (err) {
      setError(JSON.stringify(err))
    }
  }

  function renderRedirect(){
    if (redirect) {
      return <Redirect to='/step' />
    }
  }

  function handleChange(e) {
    setText(e.target.value)
    console.log(text)
  }
  function handleChange2(e) {
    setPassword(e.target.value)
  }
  function handleChange3(e) {
    setName(e.target.value)
  }

    return (
      <div className="Register">
              <form className="login100-form validate-form">

                <span style={{paddingRight:34}} className="login100-form-title p-b-49">Registrar</span>
                <div className="wrap-input100 validate-input m-b-23" data-validate="Username is reauired">
                  <span className="label-input100">Nome</span>
                  <input className="input100" type="text" name="username"
                  onChange={handleChange3}
                  value={name} placeholder="Coloque seu nome" />
                  <span className="focus-input100"></span>
                </div>

                <div className="wrap-input100 validate-input m-b-23" data-validate="CPF/CNPJ is reauired">
                  <span className="label-input100">{label}</span>
                  <input className="input100" type="text" name="username"
                  onChange={handleChange}
                  value={text} placeholder={`Coloque o ${label}`} />
                  <span className="focus-input100"></span>
                </div>

                <div className="wrap-input100 validate-input" data-validate="Password is required">
                  <span className="label-input100">Senha</span>
                  <input className="input100" type="password" name="pass"
                  onChange={handleChange2}
                  value={password}  placeholder="Coloque sua senha"/>
                  <span className="focus-input100"></span>
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
                {renderRedirect()}
                <div className="container-login100-form-btn">
                  <div className="wrap-login100-form-btn">
                    <div className="login100-form-bgbtn"></div>
                      <button className="login100-form-btn"  onClick={signIn} >registrar</button>
                    </div>
                  </div>
              </form>
              {!!errorM && <p>{errorM}</p>}
            </div>
    );
}


