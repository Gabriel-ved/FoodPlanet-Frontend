import React,{useState,useEffect} from 'react';
import Nav from './Aplication/Nav';
import Footer from './Mainpage/Footer';
import './Account/accountstyle.css';
import Dropzone from 'react-dropzone';
import api from '../services/api';

export default function Account(){
    const [url,setUrl]=useState(null);
    const [nome,setNome]=useState('');
    const [rua,setRua]=useState('');
    const [cidade,setCidade]=useState('');
    const [estado,setEstado]=useState('');
    const [cep,setCep]=useState('');
    const [cpf,setCpf]=useState('');

    useEffect(()=>{
        const account = JSON.parse(localStorage.getItem('@FoodPlanet:user'))
        setNome(account.name);
        setCpf(account.cpf);
        setUrl(account.url);
        if(account.local){
            setRua(account.local.street);
            setCidade(account.local.city);
            setEstado(account.local.state);
            setCep(account.local.cep);
        }
    },[])
    async function handleUpload (file){
		const data = new FormData();
		data.append('file',file[0], file[0].name)
		const response = await api.post('/account', data)
		const { url } = response.data;
		setUrl(url)
		await window.localStorage.setItem('@FoodPlanet:user', JSON.stringify(response.data));
    }
    async function handleForm (e){
        e.preventDefault();
        try{
            const response = await api.put('/account', {
                name:nome,
                cpf,
                        local:{
                            street:rua,
                            city:cidade,
                            state:estado,
                            cep:cep
                        }
                    })
            window.localStorage.setItem('@FoodPlanet:user', JSON.stringify(response.data.client));
        }catch(err){
            console.log(err)
        }
	}
    function handleChange(e) {
		setRua(e.target.value);
	}
	function handleChange2(e) {

		setEstado(e.target.value );
	}
	function handleChange3(e) {
		setCidade(e.target.value );
	}
	function handleChange4(e) {
		setCep( e.target.value );
	}
    function handleChange5(e) {
		setNome(e.target.value);
    }
    function handleChange6(e) {
		setCpf(e.target.value);
	}
    return(
        <div className="Main1">
            <Nav/>
            <section className="Maincontainer">
                <form className="Perfilcontainer">
                    <div className="Titulo">
                        <h3>Editar perfil</h3>
                    </div>
                <div className="fotoPerfil">
                <Dropzone accept="image/*" onDropAccepted={handleUpload}>
						{({getRootProps,getInputProps})=>(
							<div 
                            {...getRootProps()}
                            className="dropImage"
							style={{backgroundImage: `url(${url})`}}>
								<input {...getInputProps()}/>
								{url? <p style={{color: '#ddd'}}>Trocar imagem ?</p> : (<p style={{fontSize: 16}}>Sua foto aqui</p>) }
							</div>
						)}
				</Dropzone>
                </div>
                <div className="leftcontainer">
                <input type="text" onChange={handleChange5} placeholder="Nome" value={nome}/>
                <input type="text" onChange={handleChange6} placeholder="CPF"value={cpf}/>
                <input type="text" onChange={handleChange} placeholder="Rua"value={rua}/>
                </div>
                <div className="rightcontainer">
                <input type="text" onChange={handleChange3} placeholder="Cidade" value={cidade}/>
                <input type="text" onChange={handleChange2} placeholder="Estado" value={estado}/>
                <input type="text" onChange={handleChange4} placeholder="Cep" value={cep}/>
                </div>
                <button className="btn btn-primary btnPerfil" onClick={handleForm}>Atualizar</button>
                </form>
            </section>
            <Footer/>
        </div>
    )
}