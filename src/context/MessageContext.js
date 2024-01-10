import React, { createContext, useState } from 'react';
import { ToastContainer, Toast } from 'react-bootstrap';

const MessageContext = createContext();

const MessageProvider = ({ children }) => {
  const [toast, setToast] = useState({ show: false, message: '' });

  const showToast = (message) => {
    setToast({ show: true, message });
  };

  const hideToast = () => {
    setToast({ show: false, message: '' });
  };

  return (
    <MessageContext.Provider value={{ toast, showToast, hideToast }}>
      {children}
      <ToastContainer position='middle-center'>
        <Toast show={toast.show} onClose={hideToast} bg='success'delay={2000} autohide>
          <Toast.Header>
            <strong className='me-auto'>Attention</strong>
          </Toast.Header>
          <Toast.Body>{toast.message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </MessageContext.Provider>
  );
};

export {MessageContext, MessageProvider};