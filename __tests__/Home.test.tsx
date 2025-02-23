import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import Home from "../app/page";

jest.mock("../app/page", () => jest.fn());

describe("Home Page", () => {
  test("renders search input and button", () => {
    const { getByPlaceholderText, getByText } = render(<Home />);
    
    expect(getByPlaceholderText("Search")).toBeInTheDocument();
    expect(getByText("Search")).toBeInTheDocument();
  });

  test("displays error when search term is empty", async () => {
    const { getByText } = render(<Home />);
    
    await userEvent.click(getByText("Search"));
    
    expect(getByText("Please enter a GitHub username")).toBeInTheDocument();
  });

  test("fetches and displays user data", async () => {
    const mockUser = {
      username: "testuser",
      avatarUrl: "https://example.com/avatar.jpg",
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockUser),
        ok: true,
      } as Response)
    ) as jest.Mock;

    const { getByPlaceholderText, getByText, findByText } = render(<Home />);
    
    await userEvent.type(getByPlaceholderText("Search..."), "testuser");
    await userEvent.click(getByText("Search"));
    
    expect(await findByText("testuser")).toBeInTheDocument();
  });
});
