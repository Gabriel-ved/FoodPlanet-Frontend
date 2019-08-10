import React from 'react';
import Dropzone from 'react-dropzone';
import api from '../services/api';
import './Mainpage/caraio.css';
import './StepRegistration/css/style.css';
import Footer from './Mainpage/Footer';
import {Redirect} from 'react-router-dom';

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




class StepRegistration extends React.Component {

	
	constructor(props){
		super(props)
		this.state={
		arquivo:{
			file: '',
			name: ''
		},
		url:null,
		rua:'',
		estado:'',
		cidade:'',
		cep:'',
		redirect:false
	}
	this.handleUpload = this.handleUpload.bind(this);	
	this.handleForm = this.handleForm.bind(this);	
	this.handleChange = this.handleChange.bind(this);
	this.handleChange2 = this.handleChange.bind(this);
	this.handleChange3 = this.handleChange.bind(this);
	this.handleChange4 = this.handleChange.bind(this);
	this.redirect = this.redirect.bind(this);
	}
	
	handleUpload = async (file) =>{
		this.setState({
			arquivo:{
				file:file[0],
				name:file[0].name
			}
		})

		const data = new FormData();
		data.append('file',this.state.arquivo.file,this.state.arquivo.name)
		//criar rota para "post" para mandar imagem pro backend
		const response = await api.post('/account/', data)
		const { url } = response.data;
		this.setState({url})
	}
	 async handleForm (){
		await api.put('/account/', {
			local:{
				street:this.state.rua,
				City:this.state.cidade,
				state:this.state.estado,
				cep:this.state.cep
			}
		})
		this.setState({redirect:true})
	}
	redirect(){
		if(this.state.redirect) return <Redirect to='/app/' />
	}

	handleChange(e) {
		this.setState({ rua: e.target.value });
	}
	handleChange2(e) {
		this.setState({ estado: e.target.value });
	}
	handleChange3(e) {
		this.setState({ cidade: e.target.value });
	}
	handleChange4(e) {
		this.setState({ cep: e.target.value });
	}
	handleSubmit(e){
	}

render(){
    return (
    <div className="StepRegistration">
      <div className="page-content" style={pagBack}>
		<div className="form-v10-content" style={tamanhoForm}>
			<div className="form-detail">
				<div className="form-right" style={backg}>
					<h2>Detalhes da conta</h2>
					<Dropzone accept="image/*" onDropAccepted={this.handleUpload}>
						{({getRootProps,getInputProps,isDragActive,isDragReject})=>(
							<div 
							{...getRootProps()}
							style={{...dropImage,backgroundImage: `url(${this.state.url})`}}>
								<input {...getInputProps()}/>
								{this.state.url? <p></p> : (<p style={{color:'#fff',fontSize: 16}}>Sua foto aqui</p>) }
							</div>
						)}
					</Dropzone>
					<div className="form-row">
						<input type="text" onChange={this.handleChange} className="street" placeholder="Rua"/>
					</div>
					<div className="form-row">
						<input type="text" onChange={this.handleChange} className="additional" placeholder="Cidade"/>
					</div>
                    <div className="form-row">
						<input type="text" onChange={this.handleChange} className="additional" placeholder="Estado"/>
					</div>
						<div className="form-row form-row-1">
							<input type="text" onChange={this.handleChange} className="zip" placeholder="CEP"/>
						</div>
						{this.redirect()}
					<div className="form-row-last" style={aruButon}>
						<input type="submit" onClick={this.handleForm} className="register" value="Registrar"/>
					</div>
				</div>
			</div>
		</div>
	</div>
	<Footer/>
    </div>
  );
  }
}

export default StepRegistration;
