import React from 'react'
import { Row } from "react-bootstrap"

const Footer = () => {
  return (
    <footer className="py-4 px-4 d-flex justify-content-between">
        <p>&copy;Exercise Tracker App 2022</p>
        <a href="https://github.com/seanxbrown/firebase-exercise" target="blank">Github repo</a>
        <a href="#header">To top</a>
    </footer>
  )
}

export default Footer