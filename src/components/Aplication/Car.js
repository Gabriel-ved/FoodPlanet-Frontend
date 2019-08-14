import React,{useState,useEffect} from 'react';
import {useSelector} from 'react-redux';

export default function Car(){
    const products = useSelector(state=>state.products)
    const [product,setProduct] = useState([]);
    useEffect(()=>{
        setProduct(products)
    },[products])
    return(
        <div className="car">
            <div className="lista">
                <ul className="list-group">
                
                {product.map(product=>(
                    <li key={product._id} className="list-group-item d-flex justify-content-between align-items-center">
                    {product.name}
                    </li> 
                ))}
                
                </ul>
            </div>
            <div className="btnLista">
                <button className="btnCancelar">Cancelar</button>
                <button calssName="btnFinalizar">Finalizar</button> 
            </div>
           
        </div>
    )
}