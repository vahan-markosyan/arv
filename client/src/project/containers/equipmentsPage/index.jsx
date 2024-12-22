import React, { useState, useEffect } from "react";
import productApi from "../../api/servicesApi";
import { useParams } from "react-router-dom";
import { Breadcrumbs } from "../../components";
import { ImgDiv, MainDiv, TextDiv } from "./styled";
import { Chapter } from "../../components/chapter";
export const MyEquipmentsPage = () => {
    const { id } = useParams()
    const [products, setProducts] = useState({});
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await productApi.getEquipmentsById(id);
                setProducts(response.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchProducts();
    }, []);
    console.log(products);

    return (
        <>
            <Breadcrumbs titlePart={products?.title} title={"Doctors"} />
            <MainDiv>
                <Chapter />
            </MainDiv>
        </>
    )
}