import React from 'react';
import api from '../../services/api.js'
import './style.css'
class ListStores extends React.Component {
  constructor(props){
    super(props)
    this.state ={
      stores:[],
      products:[],
      errorM: null,
    }
  }
  async componentDidMount() {
    try{
      const response = await api.get('/stores')
      const {stores} = response.data;
      this.setState({stores})

      const respo = await api.get('/products')
      const {products} = respo.data;
      this.setState({products})
    }catch(response){
      this.setState({errorM:JSON.stringify(response)})
    }
  }

  render(){
    return (
    <div className="stores">
      <div className="listStoress">
          {this.state.stores.map(stores => (
              <div  key={stores._id}>
                  <button type="button" class="btn btn-primary">{stores.name}</button>
              </div>
            ))}
        </div>

          <div className="listProducts">
            {this.state.products.map(products=>(
                  <div  key={products._id}>
                      <div className="card">
                          <img src="..." className="card-img-top" alt="..."/>
                          <div className="card-body">
                            <h5 className="card-title">{products.name}</h5>
                            <p className="card-text">{products.value}</p>
                            <p className="card-text"><small className="text-muted">vendido por: </small></p>
                          </div>
                      </div>
                    </div>
                ))}
          </div>
      {!!this.state.errorM && <p>{this.state.errorM}</p>}
    </div>
  );
  }
}

export default ListStores;
