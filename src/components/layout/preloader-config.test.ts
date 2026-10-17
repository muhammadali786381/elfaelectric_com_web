import assert from "node:assert/strict";
import test from "node:test";
import { runInNewContext } from "node:vm";
import { PRELOADER_BOOTSTRAP } from "./preloader-config";

function boot(getItem: (key: string) => string | null, stylesheet = true, navigationType = "navigate") {
  const rules: string[] = [];
  const browser: { __elfaPreloader?: { skip: boolean; deadline: number } } = {};
  runInNewContext(PRELOADER_BOOTSTRAP, {
    window: browser,
    sessionStorage: { getItem },
    Date: { now: () => 1000 },
    performance: { getEntriesByType: () => [{ type: navigationType }] },
    document: { getElementById: () => stylesheet ? { sheet: { insertRule: (rule: string) => rules.push(rule) } } : null },
  });
  return { state: browser.__elfaPreloader!, rules };
}

test("first visit keeps the loader visible and establishes a bounded deadline", () => {
  const { state, rules } = boot(() => null);
  assert.equal(state.skip, false);
  assert.equal(state.deadline, 5000);
  assert.deepEqual(rules, []);
});

test("repeat visit suppresses the session loader before hydration, while previews remain available", () => {
  const { state, rules } = boot(key => key === "elfa-preloader-seen" ? "1" : null);
  assert.equal(state.skip, true);
  assert.deepEqual(rules, ["[data-loader-session]{display:none!important}"]);
});

test("a full reload replays the loader even after it completed in this tab", () => {
  const { state, rules } = boot(() => "1", true, "reload");
  assert.equal(state.skip, false);
  assert.deepEqual(rules, []);
});

test("blocked storage still allows a bounded intro rather than breaking page startup", () => {
  const { state, rules } = boot(() => { throw new Error("Storage blocked"); });
  assert.equal(state.skip, false);
  assert.equal(state.deadline, 5000);
  assert.deepEqual(rules, []);
});

test("an unavailable stylesheet leaves the session decision available to React", () => {
  const { state } = boot(() => "1", false);
  assert.equal(state.skip, true);
});
