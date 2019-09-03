import React,{useState,useEffect} from 'react';
import Dropzone from 'react-dropzone';
import api from '../../services/api.js'
import { useDispatch } from 'react-redux';

const dropImage={
	border: '5px solid #A5A5A5',
	borderRadius: '10px',
	cursor: 'pointer',
	transition: 'height 0.2s ease',
	width: '120px',
	height: '120px',
	padding: '30px 20px',
	margin: '8px 38%',
	color:'white',
	backgroundColor: "#e5e5e5",
	backgroundRepeat: 'no-repeat',
	backgroundSize: 'cover',
	backgroundPosition: '50% 50%',
	fontWeight: 'bold',
}

export default function Modal(props){
    const [produto,setProduto]=useState(props.produto)
    const [url,setUrl]=useState(null);
    const [nome,setNome]=useState('');
    const [descricao,setDescricao]=useState('');
    const [valor,setValor]=useState('');
    const dispatch = useDispatch()
    useEffect(()=>{
        setNome(produto.name)
        setDescricao(produto.description)
        setValor(produto.value)
        setUrl(produto.url)
    },[produto])

    async function handleUpload (file,id){
        try{
          const data = new FormData();
          data.append('file',file[0], file[0].name)
          const response = await api.post(`/products/${id}`, data)
          dispatch({type:'ATT'})
          console.log(response.data)
        }catch(err){
          console.log(err)
        }
    }
    
    async function handleForm(id){
        try{
            const response = await api.put(`/products/${id}`,{
            name:nome,
            description:descricao,
            value:valor,
            })
            dispatch({type:'ATT'})
        }catch(err){
            console.log(err)
        }
    }

    async function handleCancel(){
        setNome(produto.name)
        setDescricao(produto.description)
        setValor(produto.value)
        setUrl(produto.url)
    }
    function handleChange(e) {
        setNome(e.target.value);
    }
    function handleChange2(e) {
        setDescricao(e.target.value);
    }
    function handleChange3(e) {
        setValor(e.target.value);
    }

    return(

                <div className="modal fade" id={`${produto.name}`} tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                  <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalCenterTitle">Editar Produto</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                      <Dropzone accept="image/*" onDropAccepted={(file)=>handleUpload(file,produto._id)}>
            						{({getRootProps,getInputProps})=>(
            							<div
            							{...getRootProps()}
            							style={{...dropImage,backgroundImage: `url(${url})`}}>
            								<input {...getInputProps()}/>
            								{url? <p></p> : (<p style={{color:'#666',fontSize: 16}}>Foto do produto</p>) }
            							</div>
            						)}
            					</Dropzone>
                        <form key={produto._id}>
                          <div className="form-group">
                            <label htmlFor="ControlTextarea1">Nome:</label>
                            <input type="text" onChange={handleChange} className="form-control" id="ControlTextarea1" placeholder="Nome" value={nome}/>
                          </div>
                          <div className="form-group">
                            <label htmlFor="ControlTextarea2">Descrição:</label>
                            <textarea onChange={handleChange2} className="form-control" id="ControlTextarea2" rows="3" value={descricao}/>
                          </div>
                          <div className="form-group">
                            <label htmlFor="ControlTextarea3">Valor:</label>
                            <input type="text" onChange={handleChange3} className="form-control" id="ControlTextarea3" placeholder="R$" value={valor}/>
                          </div>
                        </form>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={handleCancel} data-dismiss="modal">Fechar</button>
                        <button type="button" className="btn btn-primary" onClick={()=>{handleForm(produto._id)}}>Salvar mudanças</button>
                      </div>
                    </div>
                  </div>
                  </div>
    )
}