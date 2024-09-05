import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import { expect, test } from "vitest";

test("Verifica che il componente homepage venga montato correttamente", () => {
  render(<App />);
  const homepageComponent = screen.getByTestId("homepage");
  expect(homepageComponent).toBeInTheDocument();
});
