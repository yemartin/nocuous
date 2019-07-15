"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_morph_1 = require("ts-morph");
function binaryExpressionComplexity(node) {
  let complexity = 0;
  node.forEachChild(node => {
    const kind = node.getKind();
    if (
      kind === ts_morph_1.SyntaxKind.AmpersandAmpersandToken ||
      kind === ts_morph_1.SyntaxKind.BarBarToken
    ) {
      complexity++;
    }
  });
  return complexity;
}
function cyclomaticComplexity(node) {
  let complexity = 1;
  node.forEachDescendant((node, traversal) => {
    let expression;
    switch (node.getKind()) {
      case ts_morph_1.SyntaxKind.CaseClause:
      case ts_morph_1.SyntaxKind.CatchClause:
      case ts_morph_1.SyntaxKind.ConditionalExpression:
      case ts_morph_1.SyntaxKind.ForInStatement:
      case ts_morph_1.SyntaxKind.ForOfStatement:
        complexity++;
        break;
      case ts_morph_1.SyntaxKind.DoStatement:
        expression = node.getExpression();
        if (
          ts_morph_1.TypeGuards.isBinaryExpression(expression) ||
          ts_morph_1.TypeGuards.isIdentifier(expression) ||
          ts_morph_1.TypeGuards.isPrefixUnaryExpression(expression)
        ) {
          complexity++;
        }
        break;
      case ts_morph_1.SyntaxKind.ForStatement:
        const condition = node.getCondition();
        if (
          condition &&
          (ts_morph_1.TypeGuards.isBinaryExpression(condition) ||
            ts_morph_1.TypeGuards.isIdentifier(condition) ||
            ts_morph_1.TypeGuards.isPrefixUnaryExpression(condition))
        ) {
          complexity++;
        }
        break;
      case ts_morph_1.SyntaxKind.IfStatement:
        complexity += node.getElseStatement() ? 2 : 1;
        break;
      case ts_morph_1.SyntaxKind.BinaryExpression:
        complexity += binaryExpressionComplexity(node);
        break;
      case ts_morph_1.SyntaxKind.WhileStatement:
        expression = node.getExpression();
        if (
          ts_morph_1.TypeGuards.isBinaryExpression(expression) ||
          ts_morph_1.TypeGuards.isIdentifier(expression) ||
          ts_morph_1.TypeGuards.isPrefixUnaryExpression(expression)
        ) {
          complexity++;
        }
        break;
      case ts_morph_1.SyntaxKind.FunctionDeclaration:
      case ts_morph_1.SyntaxKind.FunctionExpression:
      case ts_morph_1.SyntaxKind.ArrowFunction:
      case ts_morph_1.SyntaxKind.MethodDeclaration:
      case ts_morph_1.SyntaxKind.ClassExpression:
        traversal.skip();
        break;
      default:
    }
  });
  return complexity;
}
exports.stat = async function stat(sourceFile, { threshold }) {
  let count = 0;
  let score = 0;
  sourceFile.forEachDescendant(node => {
    if (
      ts_morph_1.TypeGuards.isFunctionDeclaration(node) ||
      ts_morph_1.TypeGuards.isFunctionExpression(node) ||
      ts_morph_1.TypeGuards.isMethodDeclaration(node) ||
      ts_morph_1.TypeGuards.isArrowFunction(node)
    ) {
      count++;
      const complexity = cyclomaticComplexity(node);
      score +=
        threshold && complexity >= threshold ? complexity / threshold : 0;
    }
  });
  return count
    ? {
        metric: "cyclomaticComplexity",
        level: "function",
        count,
        threshold,
        score
      }
    : undefined;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3ljbG9tYXRpY0NvbXBsZXhpdHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc3RhdHMvY3ljbG9tYXRpY0NvbXBsZXhpdHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1Q0FVa0I7QUFHbEIsU0FBUywwQkFBMEIsQ0FBQyxJQUFzQjtJQUN4RCxJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUM7SUFDbkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUN2QixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDNUIsSUFDRSxJQUFJLEtBQUsscUJBQVUsQ0FBQyx1QkFBdUI7WUFDM0MsSUFBSSxLQUFLLHFCQUFVLENBQUMsV0FBVyxFQUMvQjtZQUNBLFVBQVUsRUFBRSxDQUFDO1NBQ2Q7SUFDSCxDQUFDLENBQUMsQ0FBQztJQUNILE9BQU8sVUFBVSxDQUFDO0FBQ3BCLENBQUM7QUFFRCxTQUFTLG9CQUFvQixDQUFDLElBQVU7SUFDdEMsSUFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFDO0lBRW5CLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsRUFBRTtRQUN6QyxJQUFJLFVBQXNCLENBQUM7UUFDM0IsUUFBUSxJQUFJLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDdEIsS0FBSyxxQkFBVSxDQUFDLFVBQVUsQ0FBQztZQUMzQixLQUFLLHFCQUFVLENBQUMsV0FBVyxDQUFDO1lBQzVCLEtBQUsscUJBQVUsQ0FBQyxxQkFBcUIsQ0FBQztZQUN0QyxLQUFLLHFCQUFVLENBQUMsY0FBYyxDQUFDO1lBQy9CLEtBQUsscUJBQVUsQ0FBQyxjQUFjO2dCQUM1QixVQUFVLEVBQUUsQ0FBQztnQkFDYixNQUFNO1lBQ1IsS0FBSyxxQkFBVSxDQUFDLFdBQVc7Z0JBQ3pCLFVBQVUsR0FBSSxJQUFvQixDQUFDLGFBQWEsRUFBRSxDQUFDO2dCQUNuRCxJQUNF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LENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBCaW5hcnlFeHByZXNzaW9uLFxuICBEb1N0YXRlbWVudCxcbiAgRXhwcmVzc2lvbixcbiAgRm9yU3RhdGVtZW50LFxuICBJZlN0YXRlbWVudCxcbiAgTm9kZSxcbiAgU3ludGF4S2luZCxcbiAgVHlwZUd1YXJkcyxcbiAgV2hpbGVTdGF0ZW1lbnRcbn0gZnJvbSBcInRzLW1vcnBoXCI7XG5pbXBvcnQgeyBTdGF0LCBTdGF0T3B0aW9ucyB9IGZyb20gXCIuLi9pbnRlcmZhY2VzXCI7XG5cbmZ1bmN0aW9uIGJpbmFyeUV4cHJlc3Npb25Db21wbGV4aXR5KG5vZGU6IEJpbmFyeUV4cHJlc3Npb24pOiBudW1iZXIge1xuICBsZXQgY29tcGxleGl0eSA9IDA7XG4gIG5vZGUuZm9yRWFjaENoaWxkKG5vZGUgPT4ge1xuICAgIGNvbnN0IGtpbmQgPSBub2RlLmdldEtpbmQoKTtcbiAgICBpZiAoXG4gICAgICBraW5kID09PSBTeW50YXhLaW5kLkFtcGVyc2FuZEFtcGVyc2FuZFRva2VuIHx8XG4gICAgICBraW5kID09PSBTeW50YXhLaW5kLkJhckJhclRva2VuXG4gICAgKSB7XG4gICAgICBjb21wbGV4aXR5Kys7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGNvbXBsZXhpdHk7XG59XG5cbmZ1bmN0aW9uIGN5Y2xvbWF0aWNDb21wbGV4aXR5KG5vZGU6IE5vZGUpOiBudW1iZXIge1xuICBsZXQgY29tcGxleGl0eSA9IDE7XG5cbiAgbm9kZS5mb3JFYWNoRGVzY2VuZGFudCgobm9kZSwgdHJhdmVyc2FsKSA9PiB7XG4gICAgbGV0IGV4cHJlc3Npb246IEV4cHJlc3Npb247XG4gICAgc3dpdGNoIChub2RlLmdldEtpbmQoKSkge1xuICAgICAgY2FzZSBTeW50YXhLaW5kLkNhc2VDbGF1c2U6XG4gICAgICBjYXNlIFN5bnRheEtpbmQuQ2F0Y2hDbGF1c2U6XG4gICAgICBjYXNlIFN5bnRheEtpbmQuQ29uZGl0aW9uYWxFeHByZXNzaW9uOlxuICAgICAgY2FzZSBTeW50YXhLaW5kLkZvckluU3RhdGVtZW50OlxuICAgICAgY2FzZSBTeW50YXhLaW5kLkZvck9mU3RhdGVtZW50OlxuICAgICAgICBjb21wbGV4aXR5Kys7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBTeW50YXhLaW5kLkRvU3RhdGVtZW50OlxuICAgICAgICBleHByZXNzaW9uID0gKG5vZGUgYXMgRG9TdGF0ZW1lbnQpLmdldEV4cHJlc3Npb24oKTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIFR5cGVHdWFyZHMuaXNCaW5hcnlFeHByZXNzaW9uKGV4cHJlc3Npb24pIHx8XG4gICAgICAgICAgVHlwZUd1YXJkcy5pc0lkZW50aWZpZXIoZXhwcmVzc2lvbikgfHxcbiAgICAgICAgICBUeXBlR3VhcmRzLmlzUHJlZml4VW5hcnlFeHByZXNzaW9uKGV4cHJlc3Npb24pXG4gICAgICAgICkge1xuICAgICAgICAgIGNvbXBsZXhpdHkrKztcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgU3ludGF4S2luZC5Gb3JTdGF0ZW1lbnQ6XG4gICAgICAgIGNvbnN0IGNvbmRpdGlvbiA9IChub2RlIGFzIEZvclN0YXRlbWVudCkuZ2V0Q29uZGl0aW9uKCk7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBjb25kaXRpb24gJiZcbiAgICAgICAgICAoVHlwZUd1YXJkcy5pc0JpbmFyeUV4cHJlc3Npb24oY29uZGl0aW9uKSB8fFxuICAgICAgICAgICAgVHlwZUd1YXJkcy5pc0lkZW50aWZpZXIoY29uZGl0aW9uKSB8fFxuICAgICAgICAgICAgVHlwZUd1YXJkcy5pc1ByZWZpeFVuYXJ5RXhwcmVzc2lvbihjb25kaXRpb24pKVxuICAgICAgICApIHtcbiAgICAgICAgICBjb21wbGV4aXR5Kys7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFN5bnRheEtpbmQuSWZTdGF0ZW1lbnQ6XG4gICAgICAgIGNvbXBsZXhpdHkgKz0gKG5vZGUgYXMgSWZTdGF0ZW1lbnQpLmdldEVsc2VTdGF0ZW1lbnQoKSA/IDIgOiAxO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgU3ludGF4S2luZC5CaW5hcnlFeHByZXNzaW9uOlxuICAgICAgICBjb21wbGV4aXR5ICs9IGJpbmFyeUV4cHJlc3Npb25Db21wbGV4aXR5KG5vZGUgYXMgQmluYXJ5RXhwcmVzc2lvbik7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBTeW50YXhLaW5kLldoaWxlU3RhdGVtZW50OlxuICAgICAgICBleHByZXNzaW9uID0gKG5vZGUgYXMgV2hpbGVTdGF0ZW1lbnQpLmdldEV4cHJlc3Npb24oKTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIFR5cGVHdWFyZHMuaXNCaW5hcnlFeHByZXNzaW9uKGV4cHJlc3Npb24pIHx8XG4gICAgICAgICAgVHlwZUd1YXJkcy5pc0lkZW50aWZpZXIoZXhwcmVzc2lvbikgfHxcbiAgICAgICAgICBUeXBlR3VhcmRzLmlzUHJlZml4VW5hcnlFeHByZXNzaW9uKGV4cHJlc3Npb24pXG4gICAgICAgICkge1xuICAgICAgICAgIGNvbXBsZXhpdHkrKztcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgU3ludGF4S2luZC5GdW5jdGlvbkRlY2xhcmF0aW9uOlxuICAgICAgY2FzZSBTeW50YXhLaW5kLkZ1bmN0aW9uRXhwcmVzc2lvbjpcbiAgICAgIGNhc2UgU3ludGF4S2luZC5BcnJvd0Z1bmN0aW9uOlxuICAgICAgY2FzZSBTeW50YXhLaW5kLk1ldGhvZERlY2xhcmF0aW9uOlxuICAgICAgY2FzZSBTeW50YXhLaW5kLkNsYXNzRXhwcmVzc2lvbjpcbiAgICAgICAgdHJhdmVyc2FsLnNraXAoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgLy8gbm9vcFxuICAgIH1cbiAgfSk7XG4gIHJldHVybiBjb21wbGV4aXR5O1xufVxuXG5leHBvcnQgY29uc3Qgc3RhdDogU3RhdDxTdGF0T3B0aW9ucz4gPSBhc3luYyBmdW5jdGlvbiBzdGF0KFxuICBzb3VyY2VGaWxlLFxuICB7IHRocmVzaG9sZCB9XG4pIHtcbiAgbGV0IGNvdW50ID0gMDtcbiAgbGV0IHNjb3JlID0gMDtcbiAgc291cmNlRmlsZS5mb3JFYWNoRGVzY2VuZGFudChub2RlID0+IHtcbiAgICBpZiAoXG4gICAgICBUeXBlR3VhcmRzLmlzRnVuY3Rpb25EZWNsYXJhdGlvbihub2RlKSB8fFxuICAgICAgVHlwZUd1YXJkcy5pc0Z1bmN0aW9uRXhwcmVzc2lvbihub2RlKSB8fFxuICAgICAgVHlwZUd1YXJkcy5pc01ldGhvZERlY2xhcmF0aW9uKG5vZGUpIHx8XG4gICAgICBUeXBlR3VhcmRzLmlzQXJyb3dGdW5jdGlvbihub2RlKVxuICAgICkge1xuICAgICAgY291bnQrKztcbiAgICAgIGNvbnN0IGNvbXBsZXhpdHkgPSBjeWNsb21hdGljQ29tcGxleGl0eShub2RlKTtcbiAgICAgIHNjb3JlICs9XG4gICAgICAgIHRocmVzaG9sZCAmJiBjb21wbGV4aXR5ID49IHRocmVzaG9sZCA/IGNvbXBsZXhpdHkgLyB0aHJlc2hvbGQgOiAwO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBjb3VudFxuICAgID8ge1xuICAgICAgICBtZXRyaWM6IFwiY3ljbG9tYXRpY0NvbXBsZXhpdHlcIixcbiAgICAgICAgbGV2ZWw6IFwiZnVuY3Rpb25cIixcbiAgICAgICAgY291bnQsXG4gICAgICAgIHRocmVzaG9sZCxcbiAgICAgICAgc2NvcmVcbiAgICAgIH1cbiAgICA6IHVuZGVmaW5lZDtcbn07XG4iXX0=