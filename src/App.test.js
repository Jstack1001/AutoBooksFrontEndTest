import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

afterEach(cleanup);

describe("Activity Timer App", () => {
  test("renders App component", () => {
    const { debug } = render(<App />);

    debug();
  });
});

describe("Testing Button", () => {
  test("Testing Start Activity", () => {
    const { debug, getByTestId } = render(<App />);

    const submitStart = getByTestId("test-button");

    fireEvent.click(submitStart);

    debug();
  });
});

describe("Testing Button", () => {
  test("Testing Stop Activity", () => {
    const { debug, getByTestId } = render(<App />);

    const submitStop = getByTestId("test-button1");

    fireEvent.click(submitStop);

    debug();
  });
});

describe("Testing Button", () => {
  test("Testing Reset Activity", () => {
    const { debug, getByTestId } = render(<App />);

    const submitReset = getByTestId("test-button1");

    fireEvent.click(submitReset);

    debug();
  });
});
