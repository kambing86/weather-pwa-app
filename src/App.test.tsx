import { ThemeProvider } from "@material-ui/core";
import { render, screen } from "@testing-library/react";
import { useAppTheme } from "hooks/useAppTheme";
import React from "react";
import App from "./App";

jest.mock("@material-ui/core");
jest.mock("hooks/useAppTheme");
jest.mock("components/MainLayout");

const mockedThemeProvider = ThemeProvider as jest.Mock;
const mockedUseAppTheme = useAppTheme as jest.Mock;

test("renders ThemeProvider", () => {
  mockedThemeProvider.mockImplementation(({ theme }: { theme: string }) => {
    expect(theme).toBe("a");
    return <div>Weather app</div>;
  });
  mockedUseAppTheme.mockReturnValue({ theme: "a" });
  render(<App />);
  const linkElement = screen.getByText(/Weather app/i);
  expect(linkElement).toBeInTheDocument();
  expect(mockedThemeProvider).toBeCalledTimes(1);
  expect(mockedUseAppTheme).toBeCalledTimes(1);
});
