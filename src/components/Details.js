import React,{useState,useEffect} from 'react';
import Nav from './Aplication/Nav';
import Footer from './Mainpage/Footer';
import api from '../services/api';
import "./Aplication/style.css";
import {useDispatch} from 'react-redux';
//como quebrar texto no css
export default function Details(props){
    const dispatch = useDispatch();
    const [produto,setProduto]= useState([]);

    useEffect(()=>{
        pegarProduto(props.match.params.id)
    },[props])

    async function pegarProduto(id){
        try{
            const response = await api.get(`/products/${id}`)
            const {product} = response.data;
            setProduto(product)
        }catch(e){ 
            console.log("erro "+e)
        } 
    }
    function handleCar(product){
        dispatch({type:'ADD_PROD',product})
      }

    return(
        <div className="MainDetails">
            <Nav/>
            <section className="mainDetails">
                <div className="containerDetails">
                    <img src={produto.url ? produto.url : require("./Aplication/imagens/product-default.jpg")} alt=""/>
                    <div className="textdetails">
                        <h3>{produto.name}</h3>
                        <p>{produto.code}</p>
                        <p>Preço:{produto.value}</p>
                        <button onClick={()=>{handleCar(produto)}}className="btn btn-primary">Adicionar ao carrinho</button>
                    </div>
                </div>
            </section>
                <Footer/>
        </div>

    );
};