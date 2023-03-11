import { screen, render } from "@testing-library/react"
import "@testing-library/jest-dom"
import PersonalBest from "../PersonalBest"

const testExercises = [
    {
        id: "12345",
        date: "2023-12-31",
        workout: "Push day - lunch",
        workoutid: "abcde",
        name: "Bench",
        weight: 100,
        uom: "kg",
        sets: 1,
        reps: 10
    },

    {
        id: "67890",
        date: "2024-06-01",
        workout: "Full Body - evening",
        workoutid: "fghij",
        name: "Deadlift",
        weight: 150,
        uom: "lb",
        sets: 2,
        reps: 5
    }

]

describe("PersonalBest", () => {
    it("renders personal bests correctly", () => {
        render(<PersonalBest bestExcercises={testExercises} />)
        const workoutTitles = screen.getAllByText(/Push day - lunch/, /Full Body - evening/)
        workoutTitles.forEach(title => expect(title).toBeInTheDocument())

        const firstDateRegex = /31\/12\/2023/i;
        const firstExerciseDate = screen.getByText(firstDateRegex)
        const firstExerciseName = screen.getByText(/Bench/)
        const firstExerciseWeight = screen.getByText(/100kg/)
        const firstExerciseSets = screen.getByText("Sets: 1")
        const firstExerciseReps = screen.getByText("Reps: 10")

        const secondDateRegex = /01\/06\/2024/i;
        const secondExerciseDate = screen.getByText(secondDateRegex)
        const secondExerciseName = screen.getByText(/Deadlift/)
        const secondExerciseWeight = screen.getByText(/150lb/)
        const secondExerciseSets = screen.getByText("Sets: 2")
        const secondExerciseReps = screen.getByText("Reps: 5")


        expect(firstExerciseName).toBeInTheDocument()
        expect(firstExerciseDate).toBeInTheDocument()
        expect(firstExerciseWeight).toBeInTheDocument()
        expect(firstExerciseSets).toBeInTheDocument()
        expect(firstExerciseReps).toBeInTheDocument()

        expect(secondExerciseName).toBeInTheDocument()
        expect(secondExerciseDate).toBeInTheDocument()
        expect(secondExerciseWeight).toBeInTheDocument()
        expect(secondExerciseSets).toBeInTheDocument()
        expect(secondExerciseReps).toBeInTheDocument()

    })

    it("Displays a message when no personal bests are saved", () => {
        render(<PersonalBest bestExcercises={[]} />)

        const message = screen.getByText("No personal bests saved")

        expect(message).toBeInTheDocument()
    })

    it("Does not break if null value passed in", () => {
        render(<PersonalBest bestExcercises={null} />)
        const message = screen.getByText("No personal bests saved")
        expect(message).toBeInTheDocument()
    })

    it("Does not break if undefined value passed in", () => {
        render(<PersonalBest bestExcercises={undefined} />)
        const message = screen.getByText("No personal bests saved")
        expect(message).toBeInTheDocument()
    })

})



