import React from 'react';
import api from '../services/api.js'

class Stores extends React.Component {
  constructor(props){
    super(props)
    this.state ={
      stores:[],
      errorM: null,
    }
  }

  stores = async (e)=>{
    e.preventDefault();
    try{
      const response = await api.get('/stores')
      const {stores} = response.data;
      this.setState({stores})
    }catch(response){
      this.setState({errorM:JSON.stringify(response)})
    }
  }

  render(){
    return (
    <div className="stores">
        <div>
            {/* <p>{this.state.logged.name}</p> */}
            <button 
            onClick={this.stores}>Carregar</button>
        </div>
        <ul>
        {this.state.stores.map(stores => (
            <li 
            key={stores._id}>
                <p>{stores.name}</p> 
                <ul>{stores.products.map(products=>(
                <li 
                key={stores.products._id}>
                    <p>{products.name}</p>
                </li>
                ))}
                </ul>
            </li>
        ))}
        </ul>
      {!!this.state.errorM && <p>{this.state.errorM}</p>}
    </div>
  );
  }
}

export default Stores;
