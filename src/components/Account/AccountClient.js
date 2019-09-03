import React,{useState,useEffect} from 'react';
import './accountstyle.css';
import Dropzone from 'react-dropzone';
import api from '../../services/api';
// TODO: Criar no backend uma forma de deletar a imagem junto com a conta
export default function AccountClient(){
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
    async function handleExcluir(){
        try{
            await api.delete('/account')
            await localStorage.removeItem('@FoodPlanet:token');
            await localStorage.removeItem('@FoodPlanet:user');
        }catch(e){
            console.log(e)
        }
    }

  function handleChange(e) {
		setRua(e.target.value);
	}
	function handleChange2(e) {
		setEstado(e.target.value);
	}
	function handleChange3(e) {
		setCidade(e.target.value);
	}
	function handleChange4(e) {
		setCep(e.target.value);
	}
  function handleChange5(e) {
		setNome(e.target.value);
  }
  function handleChange6(e) {
		setCpf(e.target.value);
  }
    // TODO: deixar os label no centro
    return(
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
                <label htmlFor="nome">Nome</label>
                <input type="text" id="Nome" onChange={handleChange5} placeholder="Nome" value={nome}/>
                <label htmlFor="Cpf">Cpf</label>
                <input type="text" id="Cpf" onChange={handleChange6} placeholder="CPF"value={cpf}/>
                <label htmlFor="Rua">Rua</label>
                <input type="text" id="Rua" onChange={handleChange} placeholder="Rua"value={rua}/>
                </div>
                <div className="rightcontainer">
                <label htmlFor="Cidade">Cidade</label>
                <input type="text" id="Cidade" onChange={handleChange3} placeholder="Cidade" value={cidade}/>
                <label htmlFor="Estado">Estado</label>
                <input type="text" id="Estado" onChange={handleChange2} placeholder="Estado" value={estado}/>
                <label htmlFor="Cep">Cep</label>
                <input type="text" id="Cep" onChange={handleChange4} placeholder="Cep" value={cep}/>
                </div>
                <button className="btn btn-primary btnPerfil" onClick={handleForm}>Atualizar</button>
              </form>
              <div className="Excluir">
                <button type="button" className="btn btn-danger" data-toggle="modal" data-target="#exampleModal">
                Excluir
                </button>

                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Excluir conta</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        Tem certeza que quer excluir a conta ?
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" data-dismiss="modal">Cancelar</button>
                        <button type="button" onClick={handleExcluir} className="btn btn-danger">Excluir</button>
                    </div>
                    </div>
                </div>
                </div>
              </div>
            </section>
    )
}
