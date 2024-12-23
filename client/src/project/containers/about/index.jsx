import React, { useState } from "react";
import {
  ClinicInfoDiv,
  ClinicInfoText,
  ContactInfo,
  FormButton,
  FormDiv,
  FormInputs,
  FormInputsDiv,
  FormTextArea,
  MianDiv,
} from "./styled";
import { Breadcrumbs } from "../../components";
import productApi from "../../api/servicesApi";
import { toast } from "react-toastify";

export const AboutPage = () => {
  const [value, setValue] = useState({ name: "", contact: "", text: "" });
  const [isLoading, setIsLoading] = useState(false);
  const addMessage = async (e) => {
    e.preventDefault();
    try {
      if (value.name && value.text && value.contact) {
        setIsLoading(true);
        await productApi.sendMessage(value);
        setIsLoading(false);
        toast.success("message was sent successfully");
        setValue({ name: "", contact: "", text: "" });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue((el) => {
      return { ...el, [name]: value };
    });
  };
  return (
    <>
      <MianDiv>
        <Breadcrumbs title={"TeleMedicine"} />
        <ClinicInfoDiv>
          <ClinicInfoText>
            <h3>About Telemedicine</h3>
            <br />
            <p>
              Telemedicine is revolutionizing healthcare by using technology to
              provide remote medical services, enabling patients to consult with
              healthcare professionals from the comfort of their homes. This
              innovation makes healthcare more accessible, especially for people
              in rural or underserved areas, and it reduces the need for
              in-person visits. Through virtual consultations, telemedicine
              allows doctors to diagnose, treat, and monitor patients, offering
              services such as video calls, phone consultations, and digital
              prescriptions. It’s also beneficial for managing chronic
              conditions through remote monitoring tools and wearables, which
              track patient data and send it directly to healthcare providers
              for timely interventions. Telemedicine has become particularly
              crucial during emergencies, like pandemics, offering continuous
              care while minimizing the risk of exposure. As telemedicine
              continues to evolve, it incorporates advancements like AI-driven
              diagnostics, improved digital platforms, and greater integration
              with medical devices, enhancing patient outcomes and making
              healthcare more efficient, convenient, and patient-centered.
            </p>
          </ClinicInfoText>
          <FormDiv onSubmit={addMessage}>
            <h3>Feedback form</h3>
            <FormInputsDiv>
              <FormInputs
                placeholder="Name Surname"
                name="name"
                value={value.name}
                onChange={handleChange}
                required
              />
              <FormInputs
                placeholder="Email or phone"
                name="contact"
                onChange={handleChange}
                value={value.contact}
                required
                type="email"
              />
            </FormInputsDiv>
            <FormTextArea
              placeholder="Message"
              value={value.text}
              name="text"
              onChange={handleChange}
              required
            />
            <FormButton disabled={isLoading}>
              {isLoading ? "Sending..." : "Send message"}
            </FormButton>
          </FormDiv>
          <ContactInfo>
            <h3>Contacts</h3>
            <br />

            <p>24/11 Baghramyan Street, Ejmiatsin, Armenia</p>
            <p>Telephone: +374(55)-71-02-08, +374(93)-53-10-25</p>
          </ContactInfo>
        </ClinicInfoDiv>
      </MianDiv>
    </>
  );
};
