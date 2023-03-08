import { formatDate } from "../utils"

test("Date format function returns correct dates", () => {
    expect(formatDate("2023-12-31")).toBe("31/12/2023")
    expect(formatDate("1980-01-01")).toBe("01/01/1980")
    expect(formatDate("2025-06-08")).toBe("08/06/2025")
    expect(formatDate("9999-12-31")).toBe("31/12/9999")
    expect(formatDate("0000-01-01")).toBe("01/01/0000")
    expect(formatDate("2023-03-08")).toBe("08/03/2023")
    expect(formatDate("2023-11-02")).toBe("02/11/2023")
    expect(formatDate("3595-06-10")).toBe("10/06/3595")
   
})