import React from "react";

const FAQ = () => {
  return (
    <section id="faq" className="py-16 bg-white">
      <h2 className="text-3xl font-bold text-center mb-8">FAQ</h2>
      <div className="container mx-auto space-y-4">
        <details className="border border-gray-200 rounded">
          <summary className="p-4 cursor-pointer">What is app.bestsalescoach.ai?</summary>
          <p className="p-4 bg-gray-50">It’s an AI-driven platform to optimize your sales strategies.</p>
        </details>
        <details className="border border-gray-200 rounded">
          <summary className="p-4 cursor-pointer">How does it work?</summary>
          <p className="p-4 bg-gray-50">We use advanced AI to provide actionable insights.</p>
        </details>
      </div>
    </section>
  );
};

export default FAQ;
