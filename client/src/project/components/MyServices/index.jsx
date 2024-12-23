import React, { useEffect, useState } from "react";
import { ItemsDiv, MainDiv, ServicesDiv, ServiceTitle, ServiceTitle2 } from "./styled";
import { homeServices } from "../../constants/arrays/services-home";
import productApi from "../../api/servicesApi";
import { Breadcrumbs } from "../Breadcrumbs";
export const MyServices = () => {
    const [products, setProducts] = useState([]);
    const [productsItems, setProductsItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await productApi.getAllProducts();
                const response2 = await productApi.getProductsItem();
                
                setProducts(response.data.data);
                setProductsItems(response2.data.data) 
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);
    
    
    return (
        <>
            <MainDiv>
                <ServiceTitle>
                    MAIN SERVICES
                </ServiceTitle>
                <ServicesDiv>
                    {products?.map((e, i) => {
                        let count = 0
                        
                        productsItems.map((el) => {
                            if(el?.serviceId?._id == e._id){
                                count++
                            }
                        })
                        return (
                            <ItemsDiv key={e + i} img={e.image} to={`/${e._id}`}>
                                <ServiceTitle2>{e.title}</ServiceTitle2>

                            </ItemsDiv>

                        )
                    })}
                    
                </ServicesDiv>

            </MainDiv>
        </>
    )
}