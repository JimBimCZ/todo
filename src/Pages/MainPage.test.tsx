import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { vi } from "vitest";
import { MainPage } from "./MainPage";

// Mock components
vi.mock("../components", () => ({
  FormInput: () => <div data-testid="form-input">FormInput</div>,
  TaskGrid: () => <div data-testid="task-grid">TaskGrid</div>,
  UtilityPanel: () => <div data-testid="utility-panel">UtilityPanel</div>,
}));

// Mock RTK Query hook
import { useGetTasksQuery } from "../utilities/redux";

vi.mock("../utilities/redux", () => ({
  ...vi.importActual("../utilities/redux"),
  useGetTasksQuery: vi.fn(),
}));

describe("MainPage", () => {
  test("renders header and components when data is loaded", () => {
    (useGetTasksQuery as any).mockReturnValue({
      data: [{ id: "1", text: "Test task", completed: false }],
      isLoading: false,
      isFetching: false,
    });

    render(<MainPage />);

    expect(screen.getByText("Let's get organised")).toBeInTheDocument();
    expect(screen.getByTestId("form-input")).toBeInTheDocument();
    expect(screen.getByTestId("task-grid")).toBeInTheDocument();
    expect(screen.getByTestId("utility-panel")).toBeInTheDocument();
  });

  test("renders loading state", () => {
    (useGetTasksQuery as any).mockReturnValue({
      data: undefined,
      isLoading: true,
      isFetching: false,
    });

    render(<MainPage />);

    expect(screen.getByText("Let's get organised")).toBeInTheDocument();
    expect(screen.getByTestId("form-input")).toBeInTheDocument();
    expect(screen.getByTestId("task-grid")).toBeInTheDocument();
    expect(screen.getByTestId("utility-panel")).toBeInTheDocument();
  });
});
