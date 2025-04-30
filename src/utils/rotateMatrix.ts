export function rotateMatrix(matrix: number[][]): number[][] {
  const n = matrix.length;
  const rotatedMatrix = Array.from({ length: n }, () => Array(n).fill(0));

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      rotatedMatrix[j][n - i - 1] = matrix[i][j];
    }
  }

  return rotatedMatrix;
}