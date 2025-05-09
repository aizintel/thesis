<template>
  <div class="w-full h-full">
    <canvas ref="miniCanvas" class="w-full h-full"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';

const props = defineProps<{
  data: number[];
  color: string;
}>();

const miniCanvas = ref<HTMLCanvasElement | null>(null);

const drawMiniGraph = () => {
  if (!miniCanvas.value) return;
  
  const ctx = miniCanvas.value.getContext('2d');
  if (!ctx) return;
  
  // Clear previous chart
  ctx.clearRect(0, 0, miniCanvas.value.width, miniCanvas.value.height);
  
  const width = miniCanvas.value.width;
  const height = miniCanvas.value.height;
  
  // Set canvas dimensions
  miniCanvas.value.width = width;
  miniCanvas.value.height = height;
  
  // Calculate scales
  const padding = { top: 2, right: 2, bottom: 2, left: 2 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  
  // Find min and max values
  const maxValue = Math.max(...props.data);
  const minValue = Math.min(...props.data);
  const valueRange = maxValue - minValue;
  
  // Draw line
  ctx.beginPath();
  
  const xStep = chartWidth / (props.data.length - 1);
  
  props.data.forEach((value, i) => {
    const x = padding.left + i * xStep;
    // Normalize the value between min and max, then scale to chart height
    const normalizedValue = valueRange === 0 ? 0.5 : (value - minValue) / valueRange;
    const y = height - padding.bottom - normalizedValue * chartHeight;
    
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  });
  
  ctx.strokeStyle = props.color;
  ctx.lineWidth = 1.5;
  ctx.stroke();
  
  // Fill area under the line
  const lastPoint = props.data.length - 1;
  const lastX = padding.left + lastPoint * xStep;
  const lastY = height - padding.bottom - ((props.data[lastPoint] - minValue) / (valueRange || 1)) * chartHeight;
  
  ctx.lineTo(lastX, height - padding.bottom);
  ctx.lineTo(padding.left, height - padding.bottom);
  ctx.closePath();
  
  ctx.fillStyle = `${props.color}20`; // 20 is hex for 12% opacity
  ctx.fill();
};

onMounted(() => {
  if (miniCanvas.value) {
    // Set initial dimensions
    miniCanvas.value.width = miniCanvas.value.offsetWidth;
    miniCanvas.value.height = miniCanvas.value.offsetHeight;
    drawMiniGraph();
    
    // Handle resize
    window.addEventListener('resize', () => {
      if (miniCanvas.value) {
        miniCanvas.value.width = miniCanvas.value.offsetWidth;
        miniCanvas.value.height = miniCanvas.value.offsetHeight;
        drawMiniGraph();
      }
    });
  }
});

watch(() => props.data, drawMiniGraph, { deep: true });
watch(() => props.color, drawMiniGraph);
</script>
