import React,{useState} from 'react';
import Dropzone from 'react-dropzone';
import api from '../services/api';
import './StepRegistration/css/style.css';
import Footer from './Mainpage/Footer';
import {Redirect} from 'react-router-dom';
import './Mainpage/caraio.css';

const backg={
    background:'#595959',
    borderRadius:'10px',
    textAlign:'center'
}
const pagBack={
	backgroundColor: 'transparent',
	height: 740,
}
const tamanhoForm={
	width:'500px',
	margin:'80px 0'
}
const aruButon={
	padding:'0',
	margin: '0'
}
const dropImage={
	border: '5px solid #FFF',
	borderRadius: '50%',
	cursor: 'pointer',
	transition: 'height 0.2s ease',
	width: '120px',
	height: '120px',
	padding: '30px 20px',
	margin: '8px 38%',
	color:'white',
	backgroundColor: "#A5A5A5",
	backgroundRepeat: 'no-repeat',
	backgroundSize: 'cover',
	backgroundPosition: '50% 50%',
	fontWeight: 'bold',
}




export default function StepRegistration (){
		const [url,setUrl]=useState(null)
		const [rua,setRua]=useState('')
		const [estado,setEstado]=useState('')
		const [cidade,setCidade]=useState('')
		const [cep,setCep]=useState('')
		const [redirec,setRedirect]=useState(false)

	 async function handleUpload (file){

		const data = new FormData();
		data.append('file',file[0], file[0].name)
		//criar rota para "post" para mandar imagem pro backend
		const response = await api.post('/account', data)
		console.log(response.data)
		const { url } = response.data;
		setUrl(url)
		await window.localStorage.setItem('@FoodPlanet:user', JSON.stringify(response.data));
	}
	 async function handleForm (){
		await api.put('/account', {
			local:{
				street:rua,
				city:cidade,
				state:estado,
				cep:cep
			}
		})
		setRedirect(true)
	}
	function redirect(){
		if(redirec) return <Redirect to='/app/' />
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
    return (
    <div className="StepRegistration">
      <div className="page-content" style={pagBack}>
		<div className="form-v10-content" style={tamanhoForm}>
			<div className="form-detail">
				<div className="form-right" style={backg}>
					<form>
					<h2>Detalhes da conta</h2>
					<Dropzone accept="image/*" onDropAccepted={handleUpload}>
						{({getRootProps,getInputProps})=>(
							<div 
							{...getRootProps()}
							style={{...dropImage,backgroundImage: `url(${url})`}}>
								<input {...getInputProps()}/>
								{url? <p></p> : (<p style={{color:'#fff',fontSize: 16}}>Sua foto aqui</p>) }
							</div>
						)}
					</Dropzone>
					<div className="form-row">
						<input type="text" onChange={handleChange} className="street" placeholder="Rua" required/>
					</div>
					<div className="form-row">
						<input type="text" onChange={handleChange3} className="additional" placeholder="Cidade" required/>
					</div>
                    <div className="form-row">
						<input type="text" onChange={handleChange2} className="additional" placeholder="Estado" required/>
					</div>
						<div className="form-row form-row-1">
							<input type="text" onChange={handleChange4} className="zip" placeholder="CEP" required/>
						</div>
						{redirect()}
					<div className="form-row-last" style={aruButon}>
						<button  onClick={handleForm} className="register">Registrar</button>
					</div>
					</form>
				</div>
			</div>
		</div>
	</div>
		<Footer/>
    </div>
  );
  }
