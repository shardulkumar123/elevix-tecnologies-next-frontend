import React from "react";

import { render, screen } from "@testing-library/react";

import { Button } from "../components/ui/button";

describe("Button Component", () => {
  it("renders the button text correctly", () => {
    render(<Button>Proceed</Button>);
    const btn = screen.getByRole("button", { name: /proceed/i });
    expect(btn).toBeInTheDocument();
  });

  it("applies customizable utility class names", () => {
    render(<Button className="mt-4 hover:opacity-90">Styled Button</Button>);
    const btn = screen.getByRole("button", { name: /styled button/i });
    expect(btn).toHaveClass("mt-4");
    expect(btn).toHaveClass("hover:opacity-90");
  });
});
