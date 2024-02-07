import createCombinedId from "src/utils/createCombinedId";
import { describe, expect, test } from "vitest";

describe("createCombinedId test", () => {
  test("Negative createCombinedId test", () => {
    expect(createCombinedId("aa", "bb")).not.toBe("aabb");
  });
  test("Positive createCombinedId test", () => {
    expect(createCombinedId("aa", "bb")).toBe("bbaa");
  });
});
