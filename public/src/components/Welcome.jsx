import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Ada from "../assets/landing.gif";
export default function Welcome() {
  const [userName, setUserName] = useState("");
  useEffect(async () => {
    setUserName(
      await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      ).username
    );
  }, []);
  return (
    <Container>
      <img src={Ada} alt="" />
      <h1>
        Welcome, <span>{userName}!</span>
      </h1>
      <h3>I'm Ada! Select a User to get Messaging.</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  text-align: center;
  position: relative;
  .logoutButton {
    position: absolute;
    right: 1.5rem;
    top: 1.5rem;
  }
  img {
    height: 13rem;
    @media screen and (min-width: 720px) {
      height: 20rem;
    }
  }
  span {
    color: rgb(255, 82, 161);
  }
  `;
