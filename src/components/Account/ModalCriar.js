import React,{useState} from 'react';
import api from '../../services/api.js'
import { useDispatch } from 'react-redux';

export default function ModalCriar(){
    const [nome,setNome]=useState('');
    const [descricao,setDescricao]=useState('');
    const [valor,setValor]=useState('');
    const dispatch = useDispatch()
    async function handleForm(){
        try{
            const response = await api.post('/products',{
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
        setNome('')
        setDescricao('')
        setValor('')
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

                <div className="modal fade" id='Criar' tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                  <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalCenterTitle">Criar Produto</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <form>
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
                        <button type="button" className="btn btn-primary" onClick={()=>{handleForm()}} data-dismiss="modal">Criar</button>
                      </div>
                    </div>
                  </div>
                  </div>
    )
}