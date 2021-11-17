const input = Array.from(
  new Set([
    109, 964, 794, 757, 977, 629, 730, 493, 267, 535, 370, 589, 378, 780, 79,
    655, 180, 779, 512, 60, 595, 93, 488, 201, 560, 100, 366, 628, 478,
  ])
);

function getNodes(i) {
  return {
    parent: i,
    left: i === 0 ? 1 : i * 2 + 1,
    right: i === 0 ? 2 : i * 2 + 2,
  };
}

function printTree(input, i = 0, indent = 0) {
  if (i >= input.length) return;
  const { parent, left, right } = getNodes(i);

  console.log("│  ".repeat(indent) + "└─ " + input[parent]);
  printTree(input, left, indent + 1);
  printTree(input, right, indent + 1);
}

function heapify(input, i) {
  if (i > input.length) return;

  const { parent, left, right } = getNodes(i);
  let nextParent = parent;

  if (input[left] > input[nextParent]) nextParent = left;
  if (input[right] > input[nextParent]) nextParent = right;

  if (parent !== nextParent) {
    [input[parent], input[nextParent]] = [input[nextParent], input[parent]];
    heapify(input, nextParent);
  }
}

async function buildMaxHeap(input) {
  for (let i = Math.round(input.length / 2); i >= 0; i--) heapify(input, i);
  await new Promise((res) => setTimeout(res, 500));
  console.clear();
  printTree(input);
  return input;
}

async function heapSort(arr) {
  await buildMaxHeap(arr);
  const result = [];

  for (let i = arr.length - 1; i >= 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    result.push(arr.pop());
    await buildMaxHeap(arr);
  }

  return result;
}

(async function () {
  const result = await heapSort([...input]);
  console.log("\n\n");
  console.log({ input, result });

  let state = "correct";
  for (let i = 0; i < result.length - 1; i++)
    if (result[i] < result[i + 1]) state = "wrong";

  console.log(`the state is: ${state}`);
})();
