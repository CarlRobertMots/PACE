import React from "react";
import { View, Text } from "react-native";
import Svg, { Line, G } from "react-native-svg";

interface StepCircleProps {
  steps: number;
  radius?: number; // Size of the inner white circle
}

const StepCircle: React.FC<StepCircleProps> = ({ steps, radius = 65 }) => {
  // CONFIGURATION
  const strokeWidth = 3;
  const numRays = 70;
  const baseRayLength = 15;
  const variableRayLength = 25;
  const color = "#ef4444"; // Red color

  const center = radius + baseRayLength + variableRayLength;
  const size = center * 2;

  const rays = Array.from({ length: numRays }).map((_, i) => {
    const angle = (i * 360) / numRays;
    const rad = (angle * Math.PI) / 180;
    const rayLength = baseRayLength + Math.random() * variableRayLength;

    const x1 = center + radius * Math.cos(rad);
    const y1 = center + radius * Math.sin(rad);
    const x2 = center + (radius + rayLength) * Math.cos(rad);
    const y2 = center + (radius + rayLength) * Math.sin(rad);

    return (
      <Line
        key={i}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    );
  });

  return (
    <View className="items-center justify-center">
      <View style={{ width: size, height: size, position: "absolute" }}>
        <Svg height={size} width={size} viewBox={`0 0 ${size} ${size}`}>
          <G rotation="-90" origin={`${center}, ${center}`}>
            {rays}
          </G>
        </Svg>
      </View>

      <View
        className="bg-white items-center justify-center rounded-full shadow-lg z-10"
        style={{ width: radius * 2, height: radius * 2 }}
      >
        <Text className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">
          Today
        </Text>
        <Text className="text-4xl font-black text-gray-800">{steps}</Text>
        <Text className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-1">
          Steps
        </Text>
      </View>
    </View>
  );
};

export default StepCircle;
