import { screen, render } from "@testing-library/react"
import "@testing-library/jest-dom"
import Navigation from "../Navigation"
import { BrowserRouter } from "react-router-dom"

describe("Navigation component", () => {
    it("should render title, profile, dashboard and logout text correctly", () => {
        render(<Navigation />, {wrapper: BrowserRouter})
        const title = screen.getByText(/Metis/)
        const profile = screen.getByText(/Profile/)
        const dashboard = screen.getByText(/Dashboard/)
        const logout = screen.getByText(/Log Out/)

        expect(title).toBeInTheDocument()
        expect(profile).toBeInTheDocument()
        expect(dashboard).toBeInTheDocument()
        expect(logout).toBeInTheDocument()
    })

    it("should not display a guest user title if user is not logged in", () => {
        render(<Navigation />, {wrapper: BrowserRouter});
        const userText = screen.queryByText(/Guest User/)
        expect(userText).not.toBeInTheDocument()
    })
})