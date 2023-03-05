import React from 'react'
import { Button } from "react-bootstrap"

const Header = ({ title, buttonFunction, buttonText}) => {
  return (
    <div className="d-flex gap-4 justify-content-center">
        <h2 className="text-center fw-bold py-5"> {title} </h2>
        <Button type="button" onClick={buttonFunction} className="btn btn-primary align-self-center mb-3 rounded-pill">{buttonText}</Button>    
    </div>
  )
}

export default Header