import { describe } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import MyButton from "./Button.tsx";

describe("Button", () => {
    test("check exists button", () => {
        render(<MyButton />);
        const buttonElement = screen.getByRole("button");
        expect(buttonElement).toBeInTheDocument();
    })
})