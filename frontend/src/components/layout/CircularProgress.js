import React, { useEffect, useState } from 'react';

export default function CircularProgress({ value, max = 100 }) {
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      if (current >= value) {
        clearInterval(interval);
      } else {
        current += 1;
        setProgress(current);
      }
    }, 20); // Speed of animation
    return () => clearInterval(interval);
  }, [value]);

  const offset = circumference - (progress / max) * circumference;

  return (
    <div className="circular-progress">
      <svg width="150" height="150">
        <circle
          cx="75"
          cy="75"
          r={radius}
          stroke="#e5e7eb"
          strokeWidth="10"
          fill="none"
        />
        <circle
          cx="75"
          cy="75"
          r={radius}
          stroke={progress >= 80 ? "#22c55e" : "#ef4444"} // green or red
          strokeWidth="10"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.5s ease' }}
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dy=".3em"
          fontSize="20"
          fill={progress >= 80 ? "#22c55e" : "#ef4444"}
        >
          {progress}%
        </text>
      </svg>
    </div>
  );
}
