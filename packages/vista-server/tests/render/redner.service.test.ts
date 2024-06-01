import { describe, it, expect } from "bun:test";
import { RenderService } from "@/render";

describe("Render service", () => {
  it("render", () => {
    expect(RenderService.render("Greeting")).toBe("<h1>Hello, michal</h1>");
  });
});
