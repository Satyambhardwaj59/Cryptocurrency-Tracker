// src/components/Shimmer.jsx
export default function ShimmerUI({ rows = 5 }) {
  return (
    <div className="animate-pulse">
      {Array(rows)
        .fill("")
        .map((_, i) => (
          <div
            key={i}
            className="grid grid-cols-[0.5fr_2fr_1fr_1fr_1.5fr] gap-4 py-4 px-5 border-b border-gray-300"
          >
            {/* Circle for coin image */}
            <div className="w-6 h-6 bg-gray-300 rounded-full"></div>

            {/* Coin name */}
            <div className="h-4 bg-gray-300 rounded w-24"></div>

            {/* Price */}
            <div className="h-4 bg-gray-300 rounded w-16"></div>

            {/* Market Cap */}
            <div className="h-4 bg-gray-300 rounded w-24"></div>

            {/* 24h Change */}
            <div className="h-4 bg-gray-300 rounded w-12"></div>
          </div>
        ))}
    </div>
  );
}
