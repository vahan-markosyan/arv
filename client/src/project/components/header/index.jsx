import React, { useState, useEffect } from "react";
import { HeaderDiv, HeaderPartsIcons, HeaderPartsSign, HeaderPartsTitle, LogoHeaderImg, LogoText, MenuOpenIcon, SignButton, SignIcon } from "./styled";
import { CiMenuBurger } from "react-icons/ci";
import { IoSearchOutline } from "react-icons/io5";
import { MyBgcBlack, OpenHeader, SignUp } from "../index";
import { MdOutlineLocalPhone } from "react-icons/md";
import logoImg from "../../assets/image/logo/logo-header.png"
import { Link, useLocation } from "react-router-dom"
export const MyHeader = () => {
    const { pathname } = useLocation();
    const [openMenu, setOpenMenu] = useState(false)
    const [openSign, setOpenSign] = useState(false)
    // useEffect(() => {
    //     const scrollToTop = () => {
    //         window.scrollTo({
    //             top: 0,
    //             behavior: "smooth", // плавная анимация
    //         });
    //     };
    //     scrollToTop();
    // }, [pathname]);
    return (
        <>
            <OpenHeader active={openMenu} setActive={setOpenMenu} />
            <MyBgcBlack active={openMenu} setActive={setOpenMenu} />
            <SignUp active={openSign} setActive={setOpenSign} />
            <MyBgcBlack active={openSign} setActive={setOpenSign} />

            <HeaderDiv>
                <HeaderPartsIcons>
                    <MenuOpenIcon>
                        <span onClick={() => setOpenMenu(e => !e)} style={{color:"#4eafe4"}}>
                            <CiMenuBurger />
                        </span>
                        <Link style={{color:"#4eafe4" , marginTop : "10px"}} to={"/search"}>
                            <IoSearchOutline />
                        </Link>
                    </MenuOpenIcon>
                </HeaderPartsIcons>
                <HeaderPartsTitle to={"/"}>
                    {/* <LogoText to={"/"}>Nogeroc Clinic International</LogoText> */}
                    <LogoHeaderImg src={logoImg} />
                </HeaderPartsTitle>
                <HeaderPartsSign>
                    <SignButton onClick={() => setOpenSign(e => !e)}>Sign In</SignButton>
                    <SignIcon onClick={() => setOpenSign(e => !e)}>
                        <MdOutlineLocalPhone />
                    </SignIcon>
                </HeaderPartsSign>
            </HeaderDiv>
        </>
    )
}