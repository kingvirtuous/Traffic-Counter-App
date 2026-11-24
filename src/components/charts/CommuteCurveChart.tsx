import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, {
  Circle,
  Defs,
  Line,
  LinearGradient,
  Path,
  Rect,
  Stop,
  Text as SvgText,
} from 'react-native-svg';
import { Colors } from '@/src/constants';

interface CommutePoint {
  hour: string;
  value: number;
}

interface CommuteCurveChartProps {
  data: CommutePoint[];
  height?: number;
}

export function CommuteCurveChart({
  data,
  height = 175,
}: CommuteCurveChartProps) {
  const width = 320;
  const chartHeight = 160;
  const padX = 16;
  const topY = 28;
  const bottomY = 132;
  const plotW = width - padX * 2;
  const plotH = bottomY - topY;

  const maxVal = Math.max(...data.map((d) => d.value), 100);
  const points = data.map((d, idx) => {
    const x = padX + (idx / Math.max(data.length - 1, 1)) * plotW;
    const y = bottomY - (d.value / maxVal) * plotH;
    return { x, y, ...d };
  });

  // Smooth quadratic path
  const linePath = points.reduce((acc, pt, idx) => {
    if (idx === 0) return `M ${pt.x} ${pt.y}`;
    const prev = points[idx - 1];
    const midX = (prev.x + pt.x) / 2;
    return `${acc} Q ${prev.x} ${prev.y}, ${midX} ${(prev.y + pt.y) / 2} T ${pt.x} ${pt.y}`;
  }, '');

  const areaPath =
    points.length > 0
      ? `${linePath} L ${points[points.length - 1].x} ${bottomY} L ${points[0].x} ${bottomY} Z`
      : '';

  // Find AM peak (first half) & PM peak (second half)
  const midIdx = Math.floor(points.length / 2);
  const amPeak = points.slice(0, midIdx).reduce((a, b) => (b.value > a.value ? b : a), points[0]);
  const pmPeak = points.slice(midIdx).reduce((a, b) => (b.value > a.value ? b : a), points[midIdx]);

  const xLabels = ['06h', '08h', '10h', '12h', '14h', '16h', '18h', '21h'];

  return (
    <View style={styles.container}>
      <Svg width="100%" height={height} viewBox={`0 0 ${width} ${chartHeight}`}>
        <Defs>
          <LinearGradient id="commuteArea" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor={Colors.primaryDark} stopOpacity={0.28} />
            <Stop offset="100%" stopColor={Colors.primaryDark} stopOpacity={0.02} />
          </LinearGradient>
        </Defs>

        {[0.25, 0.5, 0.75, 1].map((t, i) => (
          <Line
            key={i}
            x1={padX}
            y1={bottomY - t * plotH}
            x2={width - padX}
            y2={bottomY - t * plotH}
            stroke={Colors.borders}
            strokeWidth={1}
            strokeDasharray="3 3"
          />
        ))}
        <Line
          x1={padX}
          y1={bottomY}
          x2={width - padX}
          y2={bottomY}
          stroke="#CBD5E1"
          strokeWidth={1.5}
        />

        {areaPath ? <Path d={areaPath} fill="url(#commuteArea)" /> : null}
        {linePath ? (
          <Path
            d={linePath}
            fill="none"
            stroke={Colors.primaryDark}
            strokeWidth={2.5}
          />
        ) : null}

        {amPeak ? (
          <>
            <Circle
              cx={amPeak.x}
              cy={amPeak.y}
              r={4.5}
              fill={Colors.surface}
              stroke={Colors.primaryDark}
              strokeWidth={2.5}
            />
            <Rect
              x={amPeak.x - 28}
              y={Math.max(2, amPeak.y - 24)}
              width={56}
              height={18}
              rx={4}
              fill={Colors.textPrimary}
            />
            <SvgText
              x={amPeak.x}
              y={Math.max(14, amPeak.y - 12)}
              fill={Colors.onPrimary}
              fontSize={9}
              fontWeight="700"
              textAnchor="middle">
              {`AM ${amPeak.value.toLocaleString()}`}
            </SvgText>
          </>
        ) : null}

        {pmPeak ? (
          <>
            <Circle
              cx={pmPeak.x}
              cy={pmPeak.y}
              r={4.5}
              fill={Colors.surface}
              stroke={Colors.primaryDark}
              strokeWidth={2.5}
            />
            <Rect
              x={pmPeak.x - 28}
              y={Math.max(2, pmPeak.y - 24)}
              width={56}
              height={18}
              rx={4}
              fill={Colors.textPrimary}
            />
            <SvgText
              x={pmPeak.x}
              y={Math.max(14, pmPeak.y - 12)}
              fill={Colors.onPrimary}
              fontSize={9}
              fontWeight="700"
              textAnchor="middle">
              {`PM ${pmPeak.value.toLocaleString()}`}
            </SvgText>
          </>
        ) : null}

        {xLabels.map((lbl, idx) => {
          const x = padX + (idx / (xLabels.length - 1)) * plotW;
          return (
            <SvgText
              key={lbl}
              x={x}
              y={bottomY + 16}
              fill={Colors.textMuted}
              fontSize={9}
              textAnchor="middle">
              {lbl}
            </SvgText>
          );
        })}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});
