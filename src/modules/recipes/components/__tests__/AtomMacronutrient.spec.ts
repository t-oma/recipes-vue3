import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import AtomMacronutrient from "@/components/atoms/AtomMacronutrient.vue";

describe("AtomMacronutrient", () => {
  it("renders label, amount and clamps percentage", () => {
    const label = "Білки";
    const amount = 48;
    const percentage = 135;

    const w = mount(AtomMacronutrient, {
      props: {
        label,
        amount,
        percentage,
      },
    });

    expect(w.text()).toContain(label);
    expect(w.text()).toContain(amount);

    const bar = w.find('[role="progressbar"] > span');
    expect(bar.attributes("style")).toContain(
      "width: 100%",
    );
  });
});
