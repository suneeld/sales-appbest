import React from "react";

const features = [
  { icon: "📊", title: "Streamlined Pipeline Management" },
  { icon: "📈", title: "Data-Driven Decision Making" },
  { icon: "⚡", title: "Deal Optimization" },
  { icon: "💡", title: "Actionable Insights" },
];

const Features = () => {
  return (
    <section id="features" className="py-16 bg-gray-50 text-center">
      <h2 className="text-3xl font-bold mb-8">Stay On Top Of Your Game</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 container mx-auto">
        {features.map((feature, index) => (
          <div key={index} className="bg-white shadow-md p-6 rounded">
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-bold">{feature.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
