import React from 'react'
import { Modal, Button, Form } from "react-bootstrap"

const PasswordReset = ({ closeResetModal, resetPassword }) => {

    function handleSubmit(e) {
        e.preventDefault();
        resetPassword()
    }
  return (
    <Modal show={true} onHide={closeResetModal}>
        <Modal.Header closeButton>
            <Modal.Title>Reset Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleSubmit}>
                <Form.Control required type="email" placeholder="Enter your email address" id="resetEmail"/>
                
            </Form>
        </Modal.Body>
        <Modal.Footer>
        <Button type="submit">Reset Password</Button>
        </Modal.Footer>
    </Modal>
  )
}

export default PasswordReset