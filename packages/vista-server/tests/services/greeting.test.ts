import { describe, expect, it } from "bun:test";
import { GreetingService } from "@/services";

describe("Greeting service", () => {
  it("greeting method return properly value", () => {
    expect(GreetingService.greeting("michal")).toBe("Hello, michal!");
  });
});
