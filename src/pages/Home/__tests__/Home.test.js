import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "../Home";
import { BrowserRouter } from "react-router-dom"

describe("Homepage component", () => {
    it("should display landing text correctly", ()=> {
        render(<Home />, {wrapper: BrowserRouter})
        const landingText = screen.getByText("The exercise tracker application")
        expect(landingText).toBeInTheDocument()
    })

    it("should display signup and login buttons correctly", ()=> {
        render(<Home />, {wrapper: BrowserRouter})
        const signupButton = screen.getByText("Sign up")
        const loginButton = screen.getByText("Log in")
        expect(signupButton).toBeInTheDocument()
        expect(loginButton).toBeInTheDocument()
    })

    it("should display guest login text correctly", ()=> {
        render(<Home />, {wrapper: BrowserRouter})
        const guestLink = screen.getByText("Continue as guest")
        expect(guestLink).toBeInTheDocument()
    })
})