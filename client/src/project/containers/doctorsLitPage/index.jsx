import React, { useState, useEffect } from "react";
import productApi from "../../api/servicesApi";
import { useParams } from "react-router-dom";
import { Breadcrumbs, MyDoctors } from "../../components";
import { ImgDiv, MainDiv, TextDiv } from "./styled";
import { Chapter } from "../../components/chapter";
export const MyDoctorsPage = () => {
    return (
        <>
            <Breadcrumbs title={"Специалисты"} />
            <MainDiv>
                <MyDoctors  active={false}/>
            </MainDiv>
        </>
    )
}