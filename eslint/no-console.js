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
        if (node.name !== "console") {
          return;
        }
        context.report({
          node,
          message: "Usage of console is not allowed.",
        });
      },
    };
  },
};
