import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import SearchHistory from "../app/history/page";

describe("Search History Page", () => {
  beforeEach(() => {
    localStorage.setItem(
      "searchHistory",
      JSON.stringify([{ term: "testuser", user: "GitHub user not found" }])
    );
  });

  afterEach(() => {
    localStorage.clear();
  });

  test("renders search history", () => {
    const { getByText } = render(<SearchHistory />);

    expect(getByText("Search History")).toBeInTheDocument();
    expect(getByText("testuser")).toBeInTheDocument();
    expect(getByText("GitHub user not found")).toBeInTheDocument();
  });

  test("clears history when clear button is clicked", async () => {
    const { getByText, queryByText } = render(<SearchHistory />);

    await userEvent.click(getByText("Clear Search History"));

    expect(queryByText("testuser")).not.toBeInTheDocument();
  });
});
