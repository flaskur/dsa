/**
 * These are the binary search tree traversal methods. There are actually a lot of ways to do them and they all have their uses and characteristics. I will try and do both the recursive and iterative solutions for BFS and DFS(3). Here is the functional declaration for a tree node...
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * Breadth First Search -> Level Order Traversal - Iterative
 * Level order is probably the most intuitive when it comes to iterative approach because of how naturally it works with the insertion order. The concept is to use two arrays, one for final results and one for current queue and to constantly populate the queue in such a order that we can easily access from the front of the queue. Doing it recursively is not practical.
 */
const breadthFirstSearch = function(root) {
	let result = [];
	let arr = [];
	if (root === null) return result;
	arr.push(root);
	while (arr.length !== 0) {
		//  Shift out the front and push the left and right children into the queue if they exist.
		let front = arr.shift();
		front.left && arr.push(front.left);
		front.right && arr.push(front.right);
		result.push(front.val);
	}
	console.log(`BFS is ${result}`);
	return result;
};

/**
 * Inorder Depth First Search -> left middle right
 */
// Recursive
const inorderTraversal = function(root) {
	let result = [];
	if (root === null) return result;
	return helper(root, result);
};
const helper = function(node, result) {
	node.left && helper(node.left, result);
	result.push(node.val);
	node.right && helper(node.right, result);
	return result;
};
// Iterative
const inorderTraversal = function(root) {
	let result = [];
	if (root === null) return result;
	let arr = [];
	let current = root;

	while (current !== null || arr.length !== 0) {
		while (current !== null) {
			arr.push(current);
			current = current.left;
		}
		current = arr.pop();
		result.push(current.val);
		current = current.right;
	}
	// console.log(`DFS inorder is ${result}`);
	return result;
};

/**
 * Preorder Depth First Search -> middle left right
 */
// Recursive
const preorderTraversal = function(root) {
	let result = [];
	if (root === null) return null;
	return helper(root, result);
};
const helper = function(node, result) {
	result.push(node.val);
	node.left && helper(node.left, result);
	node.right && helper(node.right, result);
	return result;
};
// Iterative
const preorderTraversal = function(root) {
	let result = [];
	let arr = [];
	if (root === null) return result;
	arr.push(root);
	// A little different. We still take from the front, but we push unshift into the front so that left then right children are in the front of the queue. Still immediate push into result.
	while (arr.length !== 0) {
		let front = arr.shift();
		// Right first, then left.
		front.right && arr.unshift(front.right);
		front.left && arr.unshift(front.left);
		result.push(front.val);
	}
	return result;
};

/**
 * Postorder Depth First Search -> left right middle
 */
// Recursive
const postorderTraversal = function(root) {
	let result = [];
	if (root === null) return null;
	return helper(root, result);
};
const helper = function(node, result) {
	node.left && helper(node.left, result);
	node.right && helper(node.right, result);
	result.push(node.val);
	return result;
};
// Iterative
const postorderTraversal = function(root) {
	let result = [];
	let arr = [];
	if (root === null) return result;
	arr.push(root);
	// Also a little different. We don't push into result immediately. We only push into result if we know that both left and right child are null. You still prepend to the front.
	while (arr.length !== 0) {
		// Don't remove immediately.
		let front = arr[0];
		if (front.left === null && front.right === null) result.push(arr.shift().val);
		// Prepend right then left.
		front.right && arr.unshift(front.right);
		front.left && arr.unshift(front.left);
		// Now we have to set the right and left to null so we don't infinite loop.
		front.right = null;
		front.left = null;
	}
	return result;
};
