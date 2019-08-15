import React,{useState,useEffect} from 'react';
import Nav from './Aplication/Nav.js';
import ListStores from './Aplication/ListStores';
import Footer from './Mainpage/Footer';
import Car from './Aplication/Car';
import './Aplication/style.css';
import {useSelector} from 'react-redux';

export default function Aplication (props){
  const[carClass,setCarClass]=useState("");
  const produtos = useSelector(state=>state.products)
  useEffect(()=>{
    console.log(produtos)
    if(produtos.length !== 0){
      setCarClass('aparecer')
    }else{
      setCarClass('desaparecer')
    }
  },[produtos]);

  return (
    <div className="Main1">
        <Nav/>
        <div className={`main2 ${carClass}`}>
          <ListStores {...props}/>
          <Car/>
        </div>
        <Footer/>
    </div>
  );
}

