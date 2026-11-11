import assert from "node:assert/strict";
import { test } from "node:test";
import { FINANCING_PROVIDERS, burjEv125Plans, defaultFinancingSelection, formatFinancingAmount, womenEv125Plans } from "./financing-plans";
import { womenScootyPlans } from "./scooty-financing-plans";

test("women's bike and scooty plans match the live cards and calculator totals", () => {
  assert.deepEqual(Object.values(womenEv125Plans), [
    { downPayment: 35000, monthly: 29000, months: 12, total: 383000 },
    { downPayment: 45000, monthly: 14500, months: 24, total: 393000 },
  ]);
  assert.deepEqual(Object.values(womenScootyPlans), [
    { downPayment: 25000, monthly: 22500, months: 12, total: 295000 },
    { downPayment: 35000, monthly: 11500, months: 24, total: 311000 },
  ]);
  for (const plan of [...Object.values(womenEv125Plans), ...Object.values(womenScootyPlans)]) {
    assert.equal(plan.total, plan.downPayment + plan.monthly * plan.months);
  }
  assert.equal(defaultFinancingSelection("woman-plan").plan, "1");
});

test("Burj uses the published total rather than multiplying rounded installments", () => {
  const plan = burjEv125Plans[12].A;
  assert.equal(formatFinancingAmount(plan.total), "Rs. 348,703");
  assert.notEqual(Math.round(plan.total), Math.round(plan.downPayment) + Math.round(plan.monthly) * plan.months);
});

test("Burj zero-markup down payment and installment vary with the term", () => {
  const short = burjEv125Plans[12].D;
  const long = burjEv125Plans[36].D;
  assert.equal(formatFinancingAmount(short.downPayment), "Rs. 78,401");
  assert.equal(formatFinancingAmount(long.downPayment), "Rs. 242,401");
  assert.equal(formatFinancingAmount(long.monthly), "Rs. 2,946");
  assert.equal(formatFinancingAmount(long.total), "Rs. 348,462");
});

test("provider changes start with a valid plan and provider-specific defaults", () => {
  assert.equal(defaultFinancingSelection("burj").plan, "A");
  assert.equal(defaultFinancingSelection("wasl").plan, "1");
  assert.equal(defaultFinancingSelection("wasl").region, "sindh");
  assert.equal(defaultFinancingSelection("qist-baazar").plan, "1");
  assert.equal(defaultFinancingSelection("asaan-ghar").plan, "1");
});

test("available providers exclude TMF and use the updated women's financing label", () => {
  assert.deepEqual(FINANCING_PROVIDERS.map(provider => provider.id), [
    "asaan-ghar", "qist-baazar", "wasl", "burj", "woman-plan",
  ]);
  assert.equal(FINANCING_PROVIDERS.find(provider => provider.id === "woman-plan")?.label, "FINANCING PLAN FOR WOMEN");
});
