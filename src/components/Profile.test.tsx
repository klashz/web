import { describe } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Profile from "./Profile.tsx";

describe("Profile", () => {
   test("отображает начальное значение count", () => {
      render(<Profile />);
      const countElement = screen.getByText("Count: пустота");
      expect(countElement).toBeInTheDocument();
   });
   
   test("обновляет значение input", () => {
      render(<Profile />);
      const inputElement = screen.getByTestId("input-update") as HTMLInputElement;
      fireEvent.change(inputElement, { target: { value: "новое значение" } });
      expect(inputElement.value).toBe("новое значение");
   });
   
   test("обновляет значение count при нажатии на кнопку", () => {
      render(<Profile />);
      const buttonElement = screen.getByTestId("button-update");
      fireEvent.click(buttonElement);
      const countElement = screen.getByText("Count: button-update");
      expect(countElement).toBeInTheDocument();
   });
});
