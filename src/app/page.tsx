"use client";

import { useState } from "react";

export default function Home() {
  const [matrix, setMatrix] = useState<string>("");
  const [inputMatrix, setInputMatrix] = useState<number[][] | null>(null);
  const [result, setResult] = useState<number[][] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [animate, setAnimate] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);
    setAnimate(false);


    try {
      const parsedMatrix = JSON.parse(matrix);

      const response = await fetch("/api/rotate-matrix", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ matrix: parsedMatrix }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "An error occurred.");
      } else {
        setResult(data.rotatedMatrix);
        setInputMatrix(data.matrix);
        setAnimate(true);
      }
    } catch (err) {
      console.error(err);
      setError("Hay un problema inesperado durante la rotación de la matriz.");
    }
  };

  return (
    <div className="grid grid-cols-2 p-8">
      <div>
        <h1 className="text-2xl font-bold mb-4">Rotar Matriz en Sentido Anti-Horario</h1>
        <form onSubmit={handleSubmit} className="mb-4">
          <input
            className="w-full p-2 border rounded mb-2"
            placeholder='Ingresa una matriz en formato JSON, por ejemplo: [[1,2,3],[4,5,6],[7,8,9]]'
            value={matrix}
            onChange={(e) => setMatrix(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Rotar Matriz
          </button>
        </form>
        {error && <p className="text-red-500">{error}</p>}
    
        <div>
          <h2 className="text-xl font-bold mb-2">Matriz Rotada:</h2>
          <pre className="bg-gray-100 h-10 p-2 rounded">
            {result && (
              JSON.stringify(result, null)
            )}
          </pre>
        </div>
      </div>

      <div className="flex items-center justify-center">
        {inputMatrix && (
          <div
            className="flex flex-col border-1 border-black"
            style={{
              animation: animate ? "rotateAnticlockwise 3s linear 3s forwards" : "",
              width: `calc(44px * ${inputMatrix.length})`,
              height: `calc(44px * ${inputMatrix.length})`,
            }}
          >
            {inputMatrix.map((row, rowIndex: number) => (
              <div
                key={rowIndex}
                className="flex flex-row w-full h-[44px]"
              >
                {row.map((value, colIndex) => (
                  <div
                    key={colIndex}
                    className="flex-1 flex items-center justify-center border-1 border-black"
                  >
                    <p
                      style={{
                        animation: animate ? "rotateClockwise 3s linear 3s forwards" : "",
                      }}
                    >
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}