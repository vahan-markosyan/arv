import axios from "axios";
import { useEffect, useState } from "react";

import {
  DataDiv,
  Halfs,
  MainDiv,
  OneAuthMain,
  TableHeader,
  UserInfoDiv,
  InputSection,
} from "./styled";


export const Operator = () => {

  const [allAuths, setAllAuths] = useState([]);

  const [selectedUser, setSelectedUser] = useState();

  const [input, setInput] = useState("");

  useEffect(() => {
    async function getAllAuths() {
      const req = await axios.get("http://localhost:3000/api/auth/auth");

      setAllAuths(req.data.data);
      setSelectedUser(req.data.data.reverse()[0]);
    }
    getAllAuths();
  }, []);

  async function getUserById(id) {
    const req = await axios.get(
      `http://localhost:3000/api/auth/auth-one/${id}`
    );
    if (req.status === 200) setSelectedUser(req.data.data);
    else alert("something went wrong !");
  }

  async function sendMessage() {
    if (!input) {
      alert("Please fill the field");
      return;
    }

    if (!selectedUser?.email) {
      alert("No user selected");
      return;
    }

    try {
      const req = await axios.post("http://localhost:3000/api/email/send", {
        name: selectedUser.name,
        text: input,
        contact: selectedUser.number,
        subject: "Message from Operator",
        email: selectedUser.email,
      });

      if (req.status === 200) {
        alert("Message sent successfully!");
        setInput("");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again.");
    }
  }

  return (
    <MainDiv>
      <Halfs>
        <TableHeader>
          <DataDiv>Name</DataDiv>
          <DataDiv>Email</DataDiv>
          <DataDiv>Telephone</DataDiv>
          <DataDiv>Message</DataDiv>
        </TableHeader>

        {allAuths?.map((e, i) => (
          <OneAuthMain
            selected={e._id === selectedUser?.id}
            key={e._id || i}
            onClick={() => getUserById(e._id)}
          >
            <DataDiv>{e.name}</DataDiv>
            <DataDiv>{e.email}</DataDiv>
            <DataDiv>{e.number}</DataDiv>
            <DataDiv>{e.desc}</DataDiv>
          </OneAuthMain>
        ))}
      </Halfs>

      <Halfs>
        {selectedUser && (
          <UserInfoDiv>
            <h3>Selected User Info</h3>
            <p>
              <strong>Name:</strong> {selectedUser.name}
            </p>
            <p>
              <strong>Email:</strong> {selectedUser.email}
            </p>
            <p>
              <strong>Telephone:</strong> {selectedUser.number}
            </p>
            <p>
              <strong>Message:</strong> {selectedUser.desc}
            </p>
          </UserInfoDiv>
        )}
        <InputSection>
          <textarea
            placeholder="Enter additional information"
            onChange={(e) => setInput(e.target.value)}
            value={input}
          ></textarea>
          <button onClick={() => sendMessage()}>Submit</button>
        </InputSection>
      </Halfs>
    </MainDiv>
  );
};