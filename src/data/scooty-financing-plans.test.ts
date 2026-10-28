import assert from "node:assert/strict";
import { test } from "node:test";
import { formatFinancingAmount, type BurjTerm, type BurjPlan } from "./financing-plans";
import { burjScootyPlans, waslScootyRegions } from "./scooty-financing-plans";

// Displayed summaries captured from the live scooty calculator.
const expected = [
  {"option": "sindh", "plan": "1", "provider": "wasl", "summary": ["Rs. 78,780", "Rs. 12,000", "24 Months", "Rs. 366,780"]},
  {"option": "punjab", "plan": "1", "provider": "wasl", "summary": ["Rs. 78,780", "Rs. 12,000", "24 Months", "Rs. 366,780"]},
  {"option": "sindh", "plan": "2", "provider": "wasl", "summary": ["Rs. 78,780", "Rs. 20,000", "12 Months", "Rs. 318,780"]},
  {"option": "punjab", "plan": "2", "provider": "wasl", "summary": ["Rs. 78,780", "Rs. 19,500", "12 Months", "Rs. 312,780"]},
  {"option": "A", "plan": "12", "provider": "burj", "summary": ["Rs. 36,815", "Rs. 19,674", "12 Months", "Rs. 272,898"]},
  {"option": "B", "plan": "12", "provider": "burj", "summary": ["Rs. 49,086", "Rs. 18,674", "12 Months", "Rs. 273,176"]},
  {"option": "C", "plan": "12", "provider": "burj", "summary": ["Rs. 61,358", "Rs. 17,655", "12 Months", "Rs. 273,223"]},
  {"option": "D", "plan": "12", "provider": "burj", "summary": ["Rs. 61,358", "Rs. 17,613", "12 Months", "Rs. 272,710"]},
  {"option": "A", "plan": "18", "provider": "burj", "summary": ["Rs. 36,815", "Rs. 14,000", "18 Months", "Rs. 288,807"]},
  {"option": "B", "plan": "18", "provider": "burj", "summary": ["Rs. 49,086", "Rs. 13,176", "18 Months", "Rs. 286,255"]},
  {"option": "C", "plan": "18", "provider": "burj", "summary": ["Rs. 61,358", "Rs. 12,353", "18 Months", "Rs. 283,704"]},
  {"option": "D", "plan": "18", "provider": "burj", "summary": ["Rs. 108,858", "Rs. 9,103", "18 Months", "Rs. 272,717"]},
  {"option": "A", "plan": "24", "provider": "burj", "summary": ["Rs. 36,815", "Rs. 11,190", "24 Months", "Rs. 305,363"]},
  {"option": "B", "plan": "24", "provider": "burj", "summary": ["Rs. 49,086", "Rs. 10,531", "24 Months", "Rs. 301,837"]},
  {"option": "C", "plan": "24", "provider": "burj", "summary": ["Rs. 61,358", "Rs. 9,873", "24 Months", "Rs. 298,312"]},
  {"option": "D", "plan": "24", "provider": "burj", "summary": ["Rs. 143,858", "Rs. 5,369", "24 Months", "Rs. 272,712"]},
  {"option": "A", "plan": "36", "provider": "burj", "summary": ["Rs. 36,815", "Rs. 8,640", "36 Months", "Rs. 347,856"]},
  {"option": "B", "plan": "36", "provider": "burj", "summary": ["Rs. 49,086", "Rs. 8,132", "36 Months", "Rs. 341,831"]},
  {"option": "C", "plan": "36", "provider": "burj", "summary": ["Rs. 61,358", "Rs. 7,624", "36 Months", "Rs. 335,806"]},
  {"option": "D", "plan": "36", "provider": "burj", "summary": ["Rs. 182,358", "Rs. 2,510", "36 Months", "Rs. 272,714"]},
];

test("all 20 scooty summaries match the published WASL and Burj amounts", () => {
  for (const row of expected) {
    const regionalPlan = waslScootyRegions.find(region => region.id === row.option)?.plans.find(plan => plan.id === row.plan);
    const numbers = row.provider === "burj"
      ? burjScootyPlans[Number(row.plan) as BurjTerm][row.option as BurjPlan]
      : regionalPlan && { ...regionalPlan, total: regionalPlan.downPayment + regionalPlan.monthly * regionalPlan.months };
    assert.ok(numbers);
    assert.deepEqual([
      formatFinancingAmount(numbers.downPayment), formatFinancingAmount(numbers.monthly),
      `${numbers.months} Months`, formatFinancingAmount(numbers.total),
    ], row.summary, `${row.provider} ${row.plan} ${row.option}`);
  }
});
