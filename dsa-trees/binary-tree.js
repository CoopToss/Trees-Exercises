/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    if (!this.root) return 0;

    const minDepthHelper = (node) => {
      if (!node) return Infinity;
      if (!node.left && !node.right) return 1;

      return 1 + Math.min(minDepthHelper(node.left), minDepthHelper(node.right));
   };

   return minDepthHelper(this.root);
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    if (!this.root) return 0;

    const maxDepthHelper = (node) => {
      if (!node) return 0;

      return 1 + Math.max(maxDepthHelper(node.left), maxDepthHelper(node.right));
    };

    return maxDepthHelper(this.root);
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    let result = -Infinity;

    const maxSumHelper = (node) => {
      if (!node) return 0;

      const leftSum = Math.max(0, maxSumHelper(node.left));
      const rightSum = Math.max(0, maxSumHelper(node.right));

      result = Math.max(result, node.val + leftSum + rightSum);

      return node.val + Math.max(leftSum, rightSum);
    };

    maxSumHelper(this.root);
    return result;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    if (!this.root) return null;

    let queue = [this.root];
    let nextLarger = null;

    while (queue.length) {
      let current = queue.shift();

      if (node.val > lowerBound) {
        if (nextLarger === null || node.val < nextLarger) {
          nextLarger = node.val;
        }
      }

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    return nextLarger;
  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {
    if (!this.root || node1 === node2) return false;

    const findLevelAndParent = (node, target, level = 0, parent = null) => {
      if (!node) return null;
      if (node === target) return { level, parent };

      return findLevelAndParent(node.left, target, level + 1, node) ||
             findLevelAndParent(node.right, target, level + 1, node);
    };

    const node1Info = findLevelAndParent(this.root, node1);
    const node2Info = findLevelAndParent(this.root, node2);

    return node1Info && node2Info &&
           node1Info.level === node2Info.level &&
           node1Info.parent !== node2Info.parent;
  }

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize() {
    const serializeHelper = (node) => {
      if (!node) return "null";
      return `${node.val},${serializeHelper(node.left)},${serializeHelper(node.right)}`;
    };

    return serializeHelper(this.root);
  }

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize() {
    const values = stringTree.split(",");
    let index = 0;

    const deserializeHelper = (values) => {
      if (values[index] === "null") {
        index++;
        return null;
      }

      let node = new BinaryTreeNode(Number(values[index]));
      index++;
      node.left = deserializeHelper();
      node.right = deserializeHelper();
      return node;
    };

    let root = deserializeHelper();
    return new BinaryTree (root);
  }

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2) {
    const lcaHelper = (node) => {
      if (!node || node === node1 || node === node2) return node;

      let left = lcaHelper(node.left);
      let right = lcaHelper(node.right);

      if (left && right) return node;
      return left || right;
    };

    return lcaHelper(this.root);
  }
}

module.exports = { BinaryTree, BinaryTreeNode };
