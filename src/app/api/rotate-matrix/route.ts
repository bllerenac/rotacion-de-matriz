import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { matrix } = await request.json();

    if (!Array.isArray(matrix) || !matrix.every(row => Array.isArray(row))) {
      return NextResponse.json(
        { error: "Valor invalido. Alguno de los elementos dentro de matrix no es un arreglo." },
        { status: 400 }
      );
    }

    const n = matrix.length;
    if (!matrix.every(row => row.length === n)) {
      return NextResponse.json(
        { error: "La matriz debe ser NxN (matriz cuadrada)." },
        { status: 400 }
      );
    }

    const rotatedMatrix = Array.from({ length: n }, (_, i) =>
      matrix.map(row => row[n - i - 1])
    );

    return NextResponse.json({ rotatedMatrix, matrix });
  } catch {
    return NextResponse.json(
      { error: "Hay un problema inesperado durante la rotación de la matriz." },
      { status: 500 }
    );
  }
}