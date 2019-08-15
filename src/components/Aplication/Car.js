import React,{useState,useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';

export default function Car(){
    const products = useSelector(state=>state.products);
    const totalredux = useSelector(state=>state.total);
    const dispatch = useDispatch();
    const [product,setProduct] = useState([]);
    const [total,setTotal] = useState(0);
    useEffect(()=>{
        setProduct(products)
        setTotal(totalredux)
    },[products,totalredux])

    function cancelarProduto(product){
        dispatch({type:"REMOVE_PROD",product})
    }
    function cancelarCompra(){
        dispatch({type:"REMOVEALL_PROD"})
    }
    return(
        <div className="car">
            <div className="lista">
                <ul className="list-group">
                
                {product.map(product=>(
                    <li key={product._id} className="list-group-item d-flex justify-content-between align-items-center">
                        <img className="prevProduct" src={product.url} alt=""/>
                        {product.name}
                        <button className="carExcluir" onClick={()=>cancelarProduto(product)}>excluir</button>
                    </li> 
                ))}
                
                </ul>
            </div>
            <p>Total: R${total}</p>
            <div className="btnLista">
                <button onClick={cancelarCompra} className="btnCancelar">Cancelar</button>
                <button className="btnFinalizar">Finalizar</button> 
            </div>
           
        </div>
    )
}