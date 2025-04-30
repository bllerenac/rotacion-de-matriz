import { rotateMatrix } from "./rotateMatrix";

test("rotates a 2x2 matrix", () => {
  const matrix = [
    [1, 2],
    [3, 4],
  ];
  const expected = [
    [3, 1],
    [4, 2],
  ];
  expect(rotateMatrix(matrix)).toEqual(expected);
});

test("rotates a 3x3 matrix", () => {
  const matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];
  const expected = [
    [7, 4, 1],
    [8, 5, 2],
    [9, 6, 3],
  ];
  expect(rotateMatrix(matrix)).toEqual(expected);
});