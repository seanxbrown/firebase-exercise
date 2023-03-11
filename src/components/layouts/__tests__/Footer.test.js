import { screen, render } from "@testing-library/react"
import "@testing-library/jest-dom"
import Footer from "../Footer";

describe("Footer", () => {
    it("should render correctly", () => {
        render(<Footer />)

        const footerText = screen.getByText(/Metis - the exercise tracker app./)
        const repoLink = screen.getByText(/Github repo/)
        const returnLink = screen.getByText(/To top/)

        expect(footerText).toBeInTheDocument()
        expect(repoLink).toBeInTheDocument()
        expect(returnLink).toBeInTheDocument()

    })
})