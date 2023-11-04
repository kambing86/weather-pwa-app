import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { render, screen } from "@testing-library/react";
import { useAppTheme } from "hooks/useAppTheme";
import App from "./App";

jest.mock("@mui/material/styles/ThemeProvider", () => ({
  __esModule: true,
  default: jest.fn(),
}));
jest.mock("hooks/useAppTheme", () => ({
  __esModule: true,
  useAppTheme: jest.fn(),
}));
jest.mock("layout/MainLayout", () => ({
  __esModule: true,
  default: jest.fn(),
}));

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
  expect(mockedUseAppTheme).toHaveBeenCalledTimes(1);
  expect(mockedThemeProvider).toHaveBeenCalledTimes(1);
});
