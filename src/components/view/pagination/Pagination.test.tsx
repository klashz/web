import { describe } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "./Pagination.tsx";

describe("Pagination", () => {
    test("check exists pagination block", () => {
        render(<Pagination />);
        const modalElement = screen.getByTestId("wrapper");
        expect(modalElement).toBeInTheDocument();
    })
})


