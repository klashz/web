import { describe } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import MyInput from "./Input.tsx";

describe("Input", () => {
    test("check exists input", () => {
        render(<MyInput />);
        const inputElement = screen.getByLabelText("exists");
        expect(inputElement).not.toBeDisabled();
    })
})