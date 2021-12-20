import React, { useRef, useEffect } from "react";
import styled from "styled-components";

const Div = styled.div`
  .modal {
    display: none;
    position: fixed;
    z-index: 10;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    overflow-y: hidden;
    background-color: rgb(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.4);
    -webkit-animation-name: fadeIn;
    -webkit-animation-duration: 0.4s;
    animation-name: fadeIn;
    animation-duration: 0.4s;
  }

  .modal-content {
    width: 100vw;
    height: 100vh;
    display: grid;
    place-items: center;
    background-color: #fefefe;
    -webkit-animation-name: fadeIn;
    -webkit-animation-duration: 0.4s;
    animation-name: fadeIn;
    animation-duration: 0.4s;
  }

  .close {
    color: #aaa;
    position: fixed;
    top: 5px;
    right: 15px;
    font-size: 40px;
    font-weight: bold;
  }

  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }

  @-webkit-keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

function Modal({ children, open, onClose }) {
  const modalref = useRef(null);

  useEffect(() => {
    if (open) {
      modalref.current.style.display = "block";
      document.body.style.overflow = "hidden";
    } else {
      modalref.current.style.display = "none";
      document.body.style.overflow = "auto";
    }
    return () => {};
  }, [open]);

  return (
    <Div>
      <div id="myModal" className="modal" ref={modalref}>
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <div className="modal-content">{children}</div>
      </div>
    </Div>
  );
}
export default Modal;
