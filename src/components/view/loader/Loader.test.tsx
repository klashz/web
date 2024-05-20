import { describe } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Loader from "./Loader.tsx";

describe("Loader", () => {
    test("check exists loader block", () => {
        render(<Loader />);
        const loaderElement = screen.getByText("LOAD...");
        expect(loaderElement).toBeInTheDocument();
    })
})


