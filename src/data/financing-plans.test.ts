import assert from "node:assert/strict";
import { test } from "node:test";
import { burjEv125Plans, defaultFinancingSelection, formatFinancingAmount } from "./financing-plans";

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
  assert.equal(defaultFinancingSelection("tmf").tmfOption, "with-advance");
  assert.equal(defaultFinancingSelection("qist-baazar").plan, "1");
  assert.equal(defaultFinancingSelection("asaan-ghar").plan, "1");
});
