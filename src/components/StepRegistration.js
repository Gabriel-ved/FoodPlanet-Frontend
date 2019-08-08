import React from 'react';
import Dropzone from 'react-dropzone';
import api from '../services/api'
import './StepRegistration/css/style.css';

const backg={
    background:'#D15858',
    borderRadius:'10px',
    textAlign:'center'
}
const pagBack={
    background:'#FAD8D6'
}
const tamanhoForm={
	width:'500px',
	margin:'80px 0'
}
const aruButon={
	padding:'0',
	margin: '0'
}
let imageUrl = null;
const dropImage={
	border: '5px solid #ddd',
	borderRadius: '50%',
	cursor: 'pointer',
	transition: 'height 0.2s ease',
	width: '120px',
	height: '120px',
	padding: '30px 20px',
	margin: '8px 38%',
	color:'white',
	backgroundImage: `url(${imageUrl})`,
	backgroundRepeat: 'no-repeat',
	backgroundSize: 'cover',
	backgroundPosition: '50% 50%'
}




class StepRegistration extends React.Component {
	constructor(props){
		super(props)
		this.state={
		arquivo:null,
		rua:'',
		estado:'',
		cidade:'',
		cep:'',
	}
	this.handleUpload = this.handleUpload.bind(this);	
	this.handleChange = this.handleChange.bind(this);
	this.handleChange2 = this.handleChange.bind(this);
	this.handleChange3 = this.handleChange.bind(this);
	this.handleChange4 = this.handleChange.bind(this);
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

		await api.put('/account/', data)
	}
	handleForm = async () =>{
		await api.put('/account/', {
			
		})
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
      <div class="page-content" style={pagBack}>
		<div class="form-v10-content" style={tamanhoForm}>
			<form class="form-detail" action="#" method="post" id="myform">
				<div class="form-right" style={backg}>
					<h2>Detalhes da conta</h2>
					<Dropzone accept="image/*" onDropAccepted={this.handleUpload}>
						{({getRootProps,getInputProps,isDragActive,isDragReject})=>(
							<div 
							{...getRootProps()}
							style={dropImage}>
								<input {...getInputProps()}/>
								<p></p>coloque sua foto
							</div>
						)}
					</Dropzone>
					<div class="form-row">
						<input type="text" onChange={this.handleChange} name="Rua" class="street" id="street" placeholder="Rua" required/>
					</div>
					<div class="form-row">
						<input type="text" onChange={this.handleChange} name="Cidade" class="additional" id="additional" placeholder="Cidade" required/>
					</div>
                    <div class="form-row">
						<input type="text" onChange={this.handleChange} name="Estado" class="additional" placeholder="Estado" required/>
					</div>
						<div class="form-row form-row-1">
							<input type="text" onChange={this.handleChange} name="Cep" class="zip" id="zip" placeholder="CEP" required/>
						</div>
					<div class="form-row-last" style={aruButon}>
						<input type="submit" name="register" class="register" value="Registrar"/>
					</div>
				</div>
			</form>
		</div>
	</div>
    </div>
  );
  }
}

export default StepRegistration;
