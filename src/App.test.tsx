import { describe } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Posts from "./App.tsx";

describe("Posts", () => {
    test("check exists posts block", () => {
        render(<Posts />);
        const postElement = screen.getByTestId("App");
        expect(postElement).toBeInTheDocument();
    })
})