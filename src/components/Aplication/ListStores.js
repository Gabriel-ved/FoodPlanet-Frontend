import React,{ useState,useEffect } from 'react';
import api from '../../services/api.js';


import { useDispatch,useSelector } from 'react-redux';

export default function ListStores (props) {
  const [stores,setStores] = useState([]);
  const [products,setProducts] = useState([]);
  const [errorM,setError] = useState(null);
  const [totalpages,setTotalpages] = useState([]);
  const dispatch = useDispatch();
  const account = useSelector(state=>state.account)

  async function loadData(page){
    try{
      const response = await api.get('/stores')
      const {stores} = response.data;
      const storesTop = stores.slice(0,3)
      setStores(storesTop);

      const respo = await api.get(`/products?page=${page}`)
      const products = respo.data.docs;
      const pages = respo.data.pages;
      const totalpages = [pages]
      setProducts(products)
      setTotalpages(totalpages)
    }catch(response){
      setError(JSON.stringify(response))
    }
  }
    useEffect(()=>{
      const { page } = props.match.params;
      loadData(page);
    },[props]) 
    
    function handleCar(car){
      dispatch({type:'ADD_PROD',product:car})
      console.log(account)
    }

    return (
    <div className="stores">
      <div className="listStoress">
        
          {stores.map((stores) => (
              <div  key={stores._id}>
                  <button type="button" className="btn btn-secondary">{stores.name}</button>
              </div>
            ))}
        </div>

          <div className="listProducts">
            
            {products.map(product=>(
                  <div  key={product._id}>
                      <div className="card text-center bg-dark text-white">
                      <img src={product.url} style={{width: '887'}} className="card-img" alt="..."/>
                          <div className="card-img-overlay">
                            <h5 className="card-title">{product.name}</h5>
                            <p className="card-text">{product.value}</p>
                            <button onClick={()=>handleCar(product)} className="btn btn-success">adicionar</button>
                          </div>
                      </div>
                    </div>
                ))}
          </div>

          <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center">

            <li className="page-item"><a className="page-link" href="1">1</a></li>
            <li className="page-item"><a className="page-link" href="2">2</a></li>
            <li className="page-item"><a className="page-link" href="3">3</a></li>
        </ul>
        </nav>
      {!!errorM && <p>{errorM}</p>}
    </div>
  );
}
