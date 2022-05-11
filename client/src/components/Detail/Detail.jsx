import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {useParams ,useNavigate  } from "react-router-dom"
import { getProducts } from '../../redux/actions';
import CarouselDetail from "./CarouselDetail"
import TableDetail from './TableDetail';

export const Detail = () => {
const dispatch = useDispatch();
//deberia ser un state.detail
const products = useSelector( state=> state.products)

let id = useParams()


useEffect(()=>{
    //tendria que ser un getDitail(id) desde las action
    dispatch(getProducts()) 
    // return (()=>{
    //     dispatch(clearDetail())
    // })
}, [dispatch])


  return (
      <div>
          <div>Detail</div>
          
          <CarouselDetail
            products={products}/>
            {
                products[0].id ?
                <div>
                    hola
                </div> 
                : <div>Cargando...</div>
            }
            <TableDetail
             products={products}/>
      </div>
  )
}