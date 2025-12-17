import React, { useMemo } from "react";
import { View, Text } from "react-native";
import Svg, { Line, G, Circle } from "react-native-svg";

interface StepCircleProps {
  steps: number;
  radius?: number;
  detailedData?: number[];
  title?: string;
}

const StepCircle: React.FC<StepCircleProps> = ({
  steps,
  radius = 65,
  detailedData,
  title = "Today", // Default value
}) => {
  const color = "#ef4444";
  const maxGrowth = 40;
  const baseLength = 5;

  const center = radius + maxGrowth + baseLength;
  const size = center * 2;
  const numRays = detailedData ? detailedData.length : 120;

  const rays = useMemo(() => {
    if (detailedData && detailedData.length > 0) {
      const maxStepInSlot = Math.max(...detailedData, 1);

      return detailedData.map((stepCount, i) => {
        const angle = (i * 360) / numRays;
        const rad = (angle * Math.PI) / 180;
        const percentage = stepCount / maxStepInSlot;
        const rayLength =
          stepCount > 0 ? baseLength + percentage * maxGrowth : 2;

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
            strokeWidth={2.5}
            strokeLinecap="round"
            opacity={stepCount > 0 ? 1 : 0.2}
          />
        );
      });
    }
    // Fallback aesthetic mode
    return Array.from({ length: numRays }).map((_, i) => {
      const angle = (i * 360) / numRays;
      const rad = (angle * Math.PI) / 180;
      const rayLength = 10 + Math.random() * 25;

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
          strokeWidth={2}
          strokeLinecap="round"
        />
      );
    });
  }, [radius, center, detailedData, numRays]);

  return (
    <View className="items-center justify-center">
      <View style={{ width: size, height: size, position: "absolute" }}>
        <Svg height={size} width={size} viewBox={`0 0 ${size} ${size}`}>
          <G rotation="-90" origin={`${center}, ${center}`}>
            {rays}
          </G>
          <Circle
            cx={center}
            cy={center}
            r={radius}
            stroke={color}
            strokeWidth={2}
            fill="white"
          />
        </Svg>
      </View>

      <View
        className="items-center justify-center z-10"
        style={{ width: radius * 2, height: radius * 2 }}
      >
        {/* DYNAMIC TITLE */}
        <Text className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">
          {title}
        </Text>
        <Text
          className="font-black text-gray-800"
          style={{ fontSize: radius > 80 ? 42 : 32 }}
        >
          {steps}
        </Text>
        <Text className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-1">
          Steps
        </Text>
      </View>
    </View>
  );
};

export default StepCircle;
