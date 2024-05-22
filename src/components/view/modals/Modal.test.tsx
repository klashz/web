import { describe } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import MyModal from "./Modal.tsx";

describe("MyModal", () => {
    test("check exists modal block", () => {
        render(<MyModal />);
        const modalElement = screen.getByTestId("modal-block");
        expect(modalElement).toBeInTheDocument();
    })
})


