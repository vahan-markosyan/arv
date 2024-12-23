import React, { useEffect, useState } from "react";
import { Departments, DepartmentsButtons, DepartmentsDiv, InfoLi, InfoMain, InfoParts, InfoTitle, InfoUl, MainDiv, PriceCode, PriceDiv, PriceLeftPart, PriceLine, PriceMainTitle, PriceNum, PriceParts, PriceTitle, PriceTitleInfo } from "./styled";
import { Breadcrumbs } from "../../components";
import productApi from "../../api/servicesApi";
import { useParams } from 'react-router-dom';


export const ServicesParts = () => {

    const { id, index } = useParams();
    const [departments, setDepartments] = useState([
        { title: "Об услуге", active: true },
        { title: "Цены", active: false },
    ])
    const [products, setProducts] = useState({});
    const [productsTitle, setProductsTitle] = useState({});
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await productApi.getProductsItemOne(index);
                const response2 = await productApi.getProductById(id);
                setProducts(response.data);
                setProductsTitle(response2.data)
            } catch (err) {
                console.log(err);

            }
        };
        fetchProducts();
    }, []);

    const changeActive = (index) => {
        setDepartments((el) => {
            return el.map((e, i) => {
                if (index == i) {
                    return { ...e, active: true }
                }
                else {
                    return { ...e, active: false }
                }
            })
        })
    }
    console.log(products);

    return (
        <>
            <MainDiv>
                <Breadcrumbs
                    title={productsTitle?.title}
                    titlePart={products?.title}
                    active={true}
                    service={products?.title}
                />
                <Departments>
                    {departments.map((e, i) => {
                        return (
                            <DepartmentsButtons
                                active={e.active}
                                key={e + i}
                                onClick={() => changeActive(i)}>{e.title}</DepartmentsButtons>
                        )
                    })}
                </Departments>
                {departments[0].active &&
                    <DepartmentsDiv>
                        {products?.descArray && products?.descArray.map((e, i) => {
                            return (
                                <InfoMain key={e + i}>
                                    <InfoParts key={e.key + i}>
                                        <InfoTitle>{e.key}</InfoTitle>
                                        <InfoUl>
                                            {e.value.map((el, i) => {
                                                return (
                                                    <>

                                                        {e.value.length > 1 ? <InfoLi>{el}</InfoLi> : <span>{el}</span>}
                                                    </>
                                                )
                                            })}
                                        </InfoUl>
                                    </InfoParts>
                                </InfoMain>
                            )
                        })}
                    </DepartmentsDiv>
                }
                {departments[1].active &&
                    <DepartmentsDiv>
                        <PriceTitle>
                            Стоимость услуг
                        </PriceTitle>
                        <PriceTitleInfo>
                            Запись на процедуру для первичных пациентов осуществляется только с консультацией. Стоимость консультации варьируется в зависимости от врача.
                        </PriceTitleInfo>
                        {products?.price && products.price.map((e, i) => {
                            return (
                                <PriceDiv>
                                    <PriceMainTitle>
                                        {e.title}
                                    </PriceMainTitle>
                                    {e.value.map((el, index) => {
                                        let num = el.priceService.split("")
                                        num[num.length - 4] = num[num.length - 4] + " "
                                        el.priceService = num.join("")
                                        return (
                                            <PriceParts>
                                                <PriceLeftPart>
                                                    <div>
                                                        {el.priceServiceTitle}
                                                    </div>
                                                    <PriceCode>КОД: {el.codePrice} </PriceCode>
                                                </PriceLeftPart>
                                                <PriceLine />
                                                <PriceNum>
                                                    {el.priceService} ₽
                                                </PriceNum>
                                            </PriceParts>

                                        )
                                    })}
                                </PriceDiv>

                            )

                        })}

                    </DepartmentsDiv>
                }
            </MainDiv>
        </>
    )
}