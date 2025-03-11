import React from "react";

function App() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-primary">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-dark">Hello, Tailwind CSS! 🎨</h1>
        <p className="text-secondary mt-2">Si tu vois ces couleurs, c'est bon !</p>
        <button className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition">
          Test Button
        </button>
      </div>
    </div>
  );
}

export default App;

