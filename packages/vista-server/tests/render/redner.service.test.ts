import { describe, it, expect } from "bun:test";
import { RenderService } from "@/render";

describe("Render service", () => {
  it("render", () => {
    expect(RenderService.render("helloworld")).toBe("helloworld");
  });
});
