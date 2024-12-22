import React, { useState } from "react";
import { CloseDiv, FormDiv, MainDiv, MoreInputs, MoreTextArea, ShowMore, ShowMoreForm, SignButton } from "./styled";
import { IoCloseOutline } from "react-icons/io5";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import productApi from "../../api/servicesApi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const SignUp = ({ active, setActive, service }) => {
    const [value, setValue] = useState("");
    const [showMore, setShowMore] = useState(false);
    const [loading, setLoading] = useState(false);
    const [numberColor, setNumberColor] = useState(false);
    const handlePhoneChange = (e) => {
        if (!e) {
            setNumberColor(true)
        } else {
            setNumberColor(false)
        }
        setValue(el => {
            return { ...el, number: e }
        })
    };
    const handledataChange = (e) => {
        setValue(el => {
            return { ...el, [e.target.name]: e.target.value }
        })
    };
    const sendData = async () => {
        if (!value.number) {
            setNumberColor(true)
            return
        }
        setNumberColor(false)
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 5000);
        if (service) {
            value.service = service
        }

        const req = await productApi.createAuth(value)
        if (req.status == 201) {
            toast.success('You have successfully registered!');
        } else {
            toast.error('Error! Please try again');
        }
        setLoading(false)

    }
    return (
        <MainDiv active={active}>
            <CloseDiv>
                <span onClick={() => setActive(e => !e)}><IoCloseOutline /></span>
            </CloseDiv>
            <FormDiv>
                <PhoneInput
                    country={"am"}
                    onChange={handlePhoneChange}
                    enableSearch={true}
                    placeholder="Enter your phone number"
                    inputStyle={{ width: "100%", border: numberColor ? "1.5px solid red" : "1.5px solid #cacaca" }}
                />
                <ShowMoreForm active={showMore}>
                    {showMore &&
                        <>
                            <MoreInputs placeholder="Name, Surname" name="name" onChange={handledataChange} />
                            <MoreInputs placeholder="Email" name="email" onChange={handledataChange} />
                            <MoreInputs type="datetime-local" name="date" onChange={handledataChange} />
                            <MoreTextArea placeholder="Complaint of Ilness" name="desc" onChange={handledataChange} />
                        </>
                    }

                </ShowMoreForm>
                <ShowMore onClick={() => setShowMore(e => !e)}>
                More Options
                </ShowMore>
                <SignButton BgColor={"#4eafe4"} color={"white"} onClick={sendData} disabled={loading}>{loading ? "loading..." : "Sign In"}</SignButton>
            </FormDiv>

        </MainDiv>
    )
}
