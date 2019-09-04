import React,{useState,useEffect} from 'react';
import './accountstyle.css';
import api from '../../services/api.js'
import {useSelector,useDispatch} from 'react-redux';
import Modal from './Modal';
import ModalCriar from './ModalCriar';
import AccountStorePerfil from './AccountStorePerfil.js';

export default function AccountStore(){
  const {_id} = JSON.parse(localStorage.getItem('@FoodPlanet:user'))
  const [produtos,setProdutos]=useState([]);
  const [alterar,setAlterar]=useState(false);
  const [label,setLabel]=useState('Perfil');
  const [erro,setErro]=useState(null);
  const atualizar = useSelector(state=>state.atualizar);
  const dispatch = useDispatch()

  async function handleDelete(id){
    try{
      api.delete(`/products/${id}`)
      dispatch({type:'ATT'})
    }catch(err){
      setErro('delete')
      console.log(err)
    }
  }

  async function loadProducts(){
    try{
      const response = await api.get(`/stores/${_id}`);
      const {products} = response.data.store;
      setProdutos(products);
    }catch(err){
      setErro('produtos')
      console.log(err)
    }
    
  }

  function handleAlterar(){
    setAlterar(!alterar);
    label === 'Perfil'? setLabel('Produtos'): setLabel('Perfil')
  }

  useEffect(() =>{
    loadProducts()
    console.log('atualizar')
  },[atualizar,])

// TODO: estilizar as imagens da lista
  return(
    <section className="Maincontainer">
    <button onClick={handleAlterar} class='btn btn-primary'>Alterar {label}</button>
    {alterar? <AccountStorePerfil/>:
    <div className="Storecontainer">
      <h3 className="Produtos">Produtos</h3>
      {erro === 'delete' && <p>Erro no delete</p>}
      {erro === 'produtos' && <p>Erro na busca dos produtos</p>}
      <div className="table-responsive-lg">
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Produtos</th>
              <th scope="col">Detalhes</th>
              <th scope="col">Valor</th>
              <th scope="col">Funções</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map(produto=>(
              <tr key={produto._id}>
                <th scope="row"><img className="tubImg" src={produto.url?produto.url:require('../Aplication/imagens/product-default.jpg')} alt="imagem do produto"/></th>
                <td>{produto.name}</td>
                <td>{produto.description}</td>
                <td>{"R$"+produto.value}</td>
                <td>
                  <button type="button" className="btn btn-primary" data-toggle="modal" data-target={`#${produto.name}`}>
                  editar
                  </button>

                  <Modal produto={produto}/>

                  <button type="button" className="btn btn-danger" data-toggle="modal" data-target={`#${produto.name}delete`}>
                  excluir
                  </button>
                  <div className="modal fade" id={`${produto.name}delete`} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div className="modal-dialog" role="document">
                      <div className="modal-content">
                      <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">Excluir Produto</h5>
                          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                          </button>
                      </div>
                      <div className="modal-body">
                          Tem certeza que quer excluir o produto ?
                      </div>
                      <div className="modal-footer">
                          <button type="button" className="btn btn-primary" data-dismiss="modal">Cancelar</button>
                          <button type="button" onClick={()=>{handleDelete(produto._id)}} data-dismiss="modal" className="btn btn-danger">Excluir</button>
                      </div>
                      </div>
                  </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        <button type="button" className="btn btn-secondary" data-toggle="modal" data-target='#Criar'>
          Criar Produto
        </button>
        <ModalCriar/>
    </div>
    }
    </section>
  )
}
