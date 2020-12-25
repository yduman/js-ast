const notAllowedMethods = ["log", "info", "warning"];

module.exports = {
  meta: {
    docs: {
      description: "Disallow use of console",
      category: "Best Practices",
      recommended: true,
    },
  },
  create(context) {
    return {
      Identifier(node) {
        const isConsoleCall = isAlike(node, {
          name: "console",
          parent: {
            type: "MemberExpression",
            parent: {
              type: "CallExpression",
            },
            property: {
              name: (value) => notAllowedMethods.includes(value),
            },
          },
        });
        if (isConsoleCall) {
          context.report({
            node,
            message: "Usage of console is not allowed.",
          });
        }
      },
    };
  },
};

function isAlike(currentNode, toCompareWith) {
  return (
    currentNode &&
    toCompareWith &&
    Object.keys(toCompareWith).every((key) => {
      const nodeVal = currentNode[key];
      const toCompareVal = toCompareWith[key];

      if (typeof toCompareVal === "function") {
        return toCompareVal(nodeVal);
      }

      return isPrimitive(toCompareVal)
        ? nodeVal === toCompareVal
        : isAlike(nodeVal, toCompareVal);
    })
  );
}

function isPrimitive(val) {
  return val == null || /^[sbn]/.test(typeof val);
}
