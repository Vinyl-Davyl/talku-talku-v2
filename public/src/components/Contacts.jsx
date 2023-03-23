import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.svg";

export default function Contacts({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(async () => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    setCurrentUserName(data.username);
    setCurrentUserImage(data.avatarImage);
  }, []);
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  return (
    <>
      {currentUserImage && currentUserName && (
        <Container>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h3>Talku Talku</h3>
          </div>
          {/* Getting and Mapping Through the contacts */}
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  key={contact._id}
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt=""
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  overflow: hidden;
  background-color: #080420;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    /* padding: 1.8rem 0; */
    img {
      height: 3rem;
    }
    h3 {
      color: #e4e6eb;
      text-transform: uppercase;
      display: none;
    }
    @media screen and (min-width: 720px) {
      h3 {
        display: block;
      }
    }
  }

  .contacts {
    display: flex;
    flex-direction: column;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff15;
      min-height: 5rem;
      cursor: pointer;
      border-radius: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: #e4e6eb;
          display: none;
        }
      }

      &:hover {
        filter: brightness(80%);
      }
    }
    .selected {
      /* background-color: #9a86f3; */
      background-color: rgba(45, 136, 255, 0.1);
    }
    @media screen and (min-width: 720px) {
      .contact {
        flex-direction: row;
        justify-content: flex-start;

        padding: 0.4rem;
        gap: 1rem;
        .username {
          h3 {
            color: white;
            display: block;
          }
        }
      }
    }
  }
  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 0.2px solid #ffffff15;
    .avatar {
      height: 3.1rem;
      position: relative;
      img {
        height: 3.1rem;
        /* max-inline-size: 100%; */
      }
      .camera-img {
        position: absolute;
        left: 0;
        top: 0;
        background-color: #ffffff42;
        border-radius: 50%;
        height: 3.1rem;
        width: 3.1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        img {
          height: 2.5rem;
          width: 2.5rem;
        }
      }
    }
    .username {
      h2 {
        color: white;
        display: none;
      }
    }
    @media screen and (min-width: 720px) {
      gap: 1rem;
      justify-content: flex-start;
      padding: 0.4rem;

      .username {
        h2 {
          font-size: 1rem;
          display: block;
          font-size: 1.2rem;
        }
      }
    }
  }
  @media screen and (max-width: 900px) and (orientation: landscape) {
    grid-template-rows: 15% 70% 15%;
    .contacts {
      .contact {
        min-height: 4rem;
      }
    }
    h3 {
      display: none;
    }
  }
`;
