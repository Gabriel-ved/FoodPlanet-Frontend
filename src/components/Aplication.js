import React,{useState,useEffect} from 'react';
import Nav from './Aplication/Nav.js';
import ListStores from './Aplication/ListStores';
import Footer from './Mainpage/Footer';
import Car from './Aplication/Car';
import './Aplication/style.css';
import {useSelector} from 'react-redux';

export default function Aplication (props){
  const[carClass,setCarClass]=useState("defaultLay");
  const[primeira,setPrimeira]=useState(0);
  const produtos = useSelector(state=>state.products)
  useEffect(()=>{
    setPrimeira(1)
  },[]);
  useEffect(()=>{
    if(primeira !== 0){
      if(produtos.length !== 0){
        setCarClass('aparecer')
      }else{
        setCarClass('desaparecer')
      }
    }
  },[produtos,primeira]);

  return (
    <div className="Main1">
        <header>
          <Nav/>
        </header>
        <section className={`main2 ${carClass}`}>
          <ListStores {...props}/>
          <Car/>
        </section>
          <Footer/>     
    </div>
  );
}

