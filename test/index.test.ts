import { describe, expect, it } from "vitest";

import { PeleError, createPelePlugin, pele } from "../src/index";

const FLOWCHART = "graph TD\n A[Start] --> B{Done?}\n B -->|yes| C[End]";

describe("pele plugin", () => {
  it("registers as the mermaid diagram plugin", () => {
    expect(pele).toMatchObject({ name: "mermaid", type: "diagram", language: "mermaid" });
  });

  it("renders a diagram to SVG", async () => {
    const { svg } = await pele.getMermaid().render("diagram-1", FLOWCHART);
    expect(svg.startsWith("<svg")).toBe(true);
    expect(svg).toContain("Start");
  });

  it("ignores Mermaid.js configuration", async () => {
    const instance = pele.getMermaid({ theme: "dark" });
    expect(() => instance.initialize({ theme: "dark" })).not.toThrow();
    await expect(instance.render("diagram-2", FLOWCHART)).resolves.toHaveProperty("svg");
  });

  it("passes render options to Pele", async () => {
    const plugin = createPelePlugin({ options: { fontSize: 20 } });
    const { svg } = await plugin.getMermaid().render("diagram-4", FLOWCHART);
    expect(svg).toContain("font:20px");
  });

  it("throws PeleError for invalid syntax", async () => {
    await expect(pele.getMermaid().render("diagram-3", "graph TD\n A -->")).rejects.toBeInstanceOf(
      PeleError,
    );
  });
});
