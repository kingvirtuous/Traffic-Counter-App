import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, {
  Circle,
  Defs,
  Line,
  Pattern,
  Rect,
  Text as SvgText,
} from 'react-native-svg';
import { Colors, Typography } from '@/src/constants';
import { HourlyDataPoint } from '@/src/types';

interface HourlyBarChartProps {
  data: HourlyDataPoint[];
  height?: number;
}

export function HourlyBarChart({ data, height = 165 }: HourlyBarChartProps) {
  const maxVal = Math.max(...data.map((d) => d.value), 100);
  const roundedMax = Math.ceil(maxVal / 150) * 150;
  const chartWidth = 320;
  const chartHeight = 148;
  const leftPad = 32;
  const rightPad = 10;
  const topPad = 22;
  const bottomY = 122;
  const plotHeight = bottomY - topPad;
  const plotWidth = chartWidth - leftPad - rightPad;

  const barCount = data.length;
  const slotWidth = plotWidth / Math.max(barCount, 1);
  const barWidth = Math.min(32, slotWidth * 0.58);

  const gridTicks = [0, 0.33, 0.66, 1];

  return (
    <View style={styles.container}>
      <Svg
        width="100%"
        height={height}
        viewBox={`0 0 ${chartWidth} ${chartHeight}`}>
        <Defs>
          <Pattern
            id="inProgressHatch"
            patternUnits="userSpaceOnUse"
            width="6"
            height="6"
            patternTransform="rotate(45)">
            <Line
              x1="0"
              y1="0"
              x2="0"
              y2="6"
              stroke={Colors.primaryDark}
              strokeOpacity={0.55}
              strokeWidth={2}
            />
          </Pattern>
        </Defs>

        {gridTicks.map((t, idx) => {
          const y = bottomY - t * plotHeight;
          const labelVal = Math.round(t * roundedMax);
          return (
            <React.Fragment key={idx}>
              <Line
                x1={leftPad}
                y1={y}
                x2={chartWidth - rightPad}
                y2={y}
                stroke={t === 0 ? '#CBD5E1' : Colors.borders}
                strokeWidth={t === 0 ? 1.5 : 1}
                strokeDasharray={t === 0 ? undefined : '3 3'}
              />
              <SvgText
                x={leftPad - 5}
                y={y + 3}
                fill={Colors.textMuted}
                fontSize={9}
                textAnchor="end">
                {labelVal}
              </SvgText>
            </React.Fragment>
          );
        })}

        {data.map((item, idx) => {
          const barHeight = Math.max(4, (item.value / roundedMax) * plotHeight);
          const cx = leftPad + slotWidth * idx + slotWidth / 2;
          const x = cx - barWidth / 2;
          const y = bottomY - barHeight;

          return (
            <React.Fragment key={item.hour}>
              {item.isInProgress ? (
                <>
                  <Rect
                    x={x}
                    y={y}
                    width={barWidth}
                    height={barHeight}
                    rx={4}
                    fill={Colors.borders}
                  />
                  <Rect
                    x={x}
                    y={y}
                    width={barWidth}
                    height={barHeight}
                    rx={4}
                    fill="url(#inProgressHatch)"
                  />
                </>
              ) : (
                <Rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  rx={4}
                  fill={Colors.primaryDark}
                  fillOpacity={item.isPeak ? 1 : 0.82}
                />
              )}

              {item.isPeak ? (
                <Circle cx={cx} cy={y} r={3.5} fill={Colors.vehicleMoto} />
              ) : null}

              <SvgText
                x={cx}
                y={y - 6}
                fill={item.isPeak ? Colors.primaryDark : Colors.textPrimary}
                fontSize={item.isPeak ? 10 : 9}
                fontWeight="700"
                textAnchor="middle">
                {item.isInProgress ? `${item.value}*` : item.value}
              </SvgText>

              <SvgText
                x={cx}
                y={bottomY + 15}
                fill={item.isPeak ? Colors.textPrimary : Colors.textMuted}
                fontSize={9}
                fontWeight={item.isPeak ? '700' : '400'}
                textAnchor="middle">
                {item.hour}
              </SvgText>
            </React.Fragment>
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
