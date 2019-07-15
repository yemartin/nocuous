"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { describe, it } = intern.getInterface("bdd");
const { expect } = intern.getPlugin("chai");
const util_1 = require("../util");
const binaryExpressionComplexity_1 = require("../../../src/stats/binaryExpressionComplexity");
describe("stats/binaryExpressionComplexity", () => {
  it("returns undefined when no items", async () => {
    const sourceFile = util_1.fixtureAsSourceFile("simple.ts");
    const result = await binaryExpressionComplexity_1.stat(sourceFile, {
      threshold: 3
    });
    expect(result).to.be.undefined;
  });
  it("should count binary expressions", async () => {
    const sourceFile = util_1.fixtureAsSourceFile(
      "stats/binaryExpressionComplexity.ts"
    );
    const result = await binaryExpressionComplexity_1.stat(sourceFile, {
      threshold: 3
    });
    expect(result).to.not.be.undefined;
    expect(result.count).to.equal(4);
  });
  it("should score based on the threshold", async () => {
    const sourceFile = util_1.fixtureAsSourceFile(
      "stats/binaryExpressionComplexity.ts"
    );
    const result = await binaryExpressionComplexity_1.stat(sourceFile, {
      threshold: 3
    });
    expect(result).to.not.be.undefined;
    expect(result.score).to.equal(1);
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluYXJ5RXhwcmVzc2lvbkNvbXBsZXhpdHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi90ZXN0cy91bml0L3N0YXRzL2JpbmFyeUV4cHJlc3Npb25Db21wbGV4aXR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3BELE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBRTVDLGtDQUE4QztBQUU5Qyw4RkFBcUU7QUFFckUsUUFBUSxDQUFDLGtDQUFrQyxFQUFFLEdBQUcsRUFBRTtJQUNoRCxFQUFFLENBQUMsaUNBQWlDLEVBQUUsS0FBSyxJQUFJLEVBQUU7UUFDL0MsTUFBTSxVQUFVLEdBQUcsMEJBQW1CLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDcEQsTUFBTSxNQUFNLEdBQUcsTUFBTSxpQ0FBSSxDQUFDLFVBQVUsRUFBRSxFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3hELE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQztJQUNqQyxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxpQ0FBaUMsRUFBRSxLQUFLLElBQUksRUFBRTtRQUMvQyxNQUFNLFVBQVUsR0FBRywwQkFBbUIsQ0FDcEMscUNBQXFDLENBQ3RDLENBQUM7UUFDRixNQUFNLE1BQU0sR0FBRyxNQUFNLGlDQUFJLENBQUMsVUFBVSxFQUFFLEVBQUUsU0FBUyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDeEQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQztRQUNuQyxNQUFNLENBQUMsTUFBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDcEMsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMscUNBQXFDLEVBQUUsS0FBSyxJQUFJLEVBQUU7UUFDbkQsTUFBTSxVQUFVLEdBQUcsMEJBQW1CLENBQ3BDLHFDQUFxQyxDQUN0QyxDQUFDO1FBQ0YsTUFBTSxNQUFNLEdBQUcsTUFBTSxpQ0FBSSxDQUFDLFVBQVUsRUFBRSxFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3hELE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUM7UUFDbkMsTUFBTSxDQUFDLE1BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3BDLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7IGRlc2NyaWJlLCBpdCB9ID0gaW50ZXJuLmdldEludGVyZmFjZShcImJkZFwiKTtcbmNvbnN0IHsgZXhwZWN0IH0gPSBpbnRlcm4uZ2V0UGx1Z2luKFwiY2hhaVwiKTtcblxuaW1wb3J0IHsgZml4dHVyZUFzU291cmNlRmlsZSB9IGZyb20gXCIuLi91dGlsXCI7XG5cbmltcG9ydCB7IHN0YXQgfSBmcm9tIFwiLi4vLi4vLi4vc3JjL3N0YXRzL2JpbmFyeUV4cHJlc3Npb25Db21wbGV4aXR5XCI7XG5cbmRlc2NyaWJlKFwic3RhdHMvYmluYXJ5RXhwcmVzc2lvbkNvbXBsZXhpdHlcIiwgKCkgPT4ge1xuICBpdChcInJldHVybnMgdW5kZWZpbmVkIHdoZW4gbm8gaXRlbXNcIiwgYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IHNvdXJjZUZpbGUgPSBmaXh0dXJlQXNTb3VyY2VGaWxlKFwic2ltcGxlLnRzXCIpO1xuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHN0YXQoc291cmNlRmlsZSwgeyB0aHJlc2hvbGQ6IDMgfSk7XG4gICAgZXhwZWN0KHJlc3VsdCkudG8uYmUudW5kZWZpbmVkO1xuICB9KTtcblxuICBpdChcInNob3VsZCBjb3VudCBiaW5hcnkgZXhwcmVzc2lvbnNcIiwgYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IHNvdXJjZUZpbGUgPSBmaXh0dXJlQXNTb3VyY2VGaWxlKFxuICAgICAgXCJzdGF0cy9iaW5hcnlFeHByZXNzaW9uQ29tcGxleGl0eS50c1wiXG4gICAgKTtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBzdGF0KHNvdXJjZUZpbGUsIHsgdGhyZXNob2xkOiAzIH0pO1xuICAgIGV4cGVjdChyZXN1bHQpLnRvLm5vdC5iZS51bmRlZmluZWQ7XG4gICAgZXhwZWN0KHJlc3VsdCEuY291bnQpLnRvLmVxdWFsKDQpO1xuICB9KTtcblxuICBpdChcInNob3VsZCBzY29yZSBiYXNlZCBvbiB0aGUgdGhyZXNob2xkXCIsIGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBzb3VyY2VGaWxlID0gZml4dHVyZUFzU291cmNlRmlsZShcbiAgICAgIFwic3RhdHMvYmluYXJ5RXhwcmVzc2lvbkNvbXBsZXhpdHkudHNcIlxuICAgICk7XG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgc3RhdChzb3VyY2VGaWxlLCB7IHRocmVzaG9sZDogMyB9KTtcbiAgICBleHBlY3QocmVzdWx0KS50by5ub3QuYmUudW5kZWZpbmVkO1xuICAgIGV4cGVjdChyZXN1bHQhLnNjb3JlKS50by5lcXVhbCgxKTtcbiAgfSk7XG59KTtcbiJdfQ==