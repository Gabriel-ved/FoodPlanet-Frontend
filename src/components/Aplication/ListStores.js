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
      totalpages:0,
    }
    this.loadData = this.loadData.bind(this);
  }
  async loadData(page){
    try{
      const response = await api.get('/stores')
      const {stores} = response.data;
      this.setState({stores})

      const respo = await api.get(`/products?page=${page}`)
      const products = respo.data.docs;
      const totalpages = respo.data.pages;
      this.setState({products})
      this.setState({totalpages})

    }catch(response){
      this.setState({errorM:JSON.stringify(response)})
    }
  }

  async componentDidMount(prevProps) {
      const { page } = this.props.match.params;
      this.loadData(page);
    
  }
  

  render(){
    return (
    <div className="stores">
      <div className="listStoress">
        
          {this.state.stores.map(stores => (
              <div  key={stores._id}>
                  <button type="button" className="btn btn-primary">{stores.name}</button>
              </div>
            ))}
        </div>

          <div className="listProducts">
            
            {this.state.products.map(products=>(
                  <div  key={products._id}>
                      <div className="card">
                          <div className="card-body">
                            <h5 className="card-title">{products.name}</h5>
                            <p className="card-text">{products.value}</p>
                            <p className="card-text"><small className="text-muted">vendido por: </small></p>
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
      {!!this.state.errorM && <p>{this.state.errorM}</p>}
    </div>
  );
  }
}

export default ListStores;
