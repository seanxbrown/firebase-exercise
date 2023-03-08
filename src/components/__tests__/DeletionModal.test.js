import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"
import DeletionModal from "../DeletionModal";


test("Deletion modal correctly rendered for workouts", () => {
    const type = "workout"
    render(<DeletionModal type={type}/>)
    
    expect(screen.getByText(/Delete this workout?/)).toBeInTheDocument()
    expect(screen.getByText(/Yes/)).toBeInTheDocument()
    expect(screen.getByText(/No/)).toBeInTheDocument()

})

test("Deletion modal correctly rendered for templates", () => {
    const type = "template"
    render(<DeletionModal type={type}/>)
    
    expect(screen.getByText(/Delete this template?/)).toBeInTheDocument()
    expect(screen.getByText(/Yes/)).toBeInTheDocument()
    expect(screen.getByText(/No/)).toBeInTheDocument()

})

test("Deletion modal correctly rendered for exercises", () => {
    const type = "exercise"
    render(<DeletionModal type={type}/>)
    
    expect(screen.getByText(/Delete this exercise?/)).toBeInTheDocument()
    expect(screen.getByText(/Yes/)).toBeInTheDocument()
    expect(screen.getByText(/No/)).toBeInTheDocument()

})