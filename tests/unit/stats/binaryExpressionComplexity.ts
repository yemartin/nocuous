import test from "ava";

import { fixtureAsSourceFile } from "../../util";

import { stat } from "../../../src/stats/binaryExpressionComplexity";

test("stats/binaryExpressionComplexity - returns undefined", async (t) => {
  const sourceFile = fixtureAsSourceFile("simple.ts");
  const actual = await stat(sourceFile, { threshold: 3 });
  t.is(actual, undefined);
});

test("stats/binaryExpressionComplexity - counts binary expressions", async (t) => {
  const sourceFile = fixtureAsSourceFile("stats/binaryExpressionComplexity.ts");
  const actual = await stat(sourceFile, { threshold: 3 });
  t.assert(actual);
  t.is(actual?.count, 4);
});

test("stats/binaryExpressionComplexity - scores based on threshold", async (t) => {
  const sourceFile = fixtureAsSourceFile("stats/binaryExpressionComplexity.ts");
  const actual = await stat(sourceFile, { threshold: 3 });
  t.assert(actual);
  t.is(actual?.score, 1);
});
