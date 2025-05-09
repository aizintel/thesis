<template>
  <div class="w-full h-full">
    <canvas ref="chartCanvas" class="w-full h-full"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';

const props = defineProps<{
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      color: string;
    }[];
  };
}>();

const chartCanvas = ref<HTMLCanvasElement | null>(null);
let chart: any = null;

const drawChart = () => {
  if (!chartCanvas.value) return;
  
  const ctx = chartCanvas.value.getContext('2d');
  if (!ctx) return;
  
  // Clear previous chart
  ctx.clearRect(0, 0, chartCanvas.value.width, chartCanvas.value.height);
  
  const width = chartCanvas.value.width;
  const height = chartCanvas.value.height;
  
  // Set canvas dimensions
  chartCanvas.value.width = width;
  chartCanvas.value.height = height;
  
  // Calculate scales
  const padding = { top: 30, right: 20, bottom: 30, left: 50 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  
  // Draw axes
  ctx.beginPath();
  ctx.moveTo(padding.left, padding.top);
  ctx.lineTo(padding.left, height - padding.bottom);
  ctx.lineTo(width - padding.right, height - padding.bottom);
  ctx.strokeStyle = '#e4e4e7';
  ctx.stroke();
  
  // Draw labels
  ctx.font = '10px sans-serif';
  ctx.fillStyle = '#71717a';
  
  // X-axis labels
  const xStep = chartWidth / (props.data.labels.length - 1);
  props.data.labels.forEach((label, i) => {
    const x = padding.left + i * xStep;
    ctx.fillText(label, x - 10, height - padding.bottom + 15);
  });
  
  // Find max value for Y-axis scale
  let maxValue = 0;
  props.data.datasets.forEach(dataset => {
    const datasetMax = Math.max(...dataset.data);
    if (datasetMax > maxValue) maxValue = datasetMax;
  });
  
  // Round up to a nice number
  maxValue = Math.ceil(maxValue / 100) * 100;
  
  // Y-axis labels
  const yStep = chartHeight / 5;
  for (let i = 0; i <= 5; i++) {
    const y = height - padding.bottom - i * yStep;
    const value = Math.round((i / 5) * maxValue);
    ctx.fillText(value.toString(), padding.left - 30, y + 3);
    
    // Draw horizontal grid lines
    ctx.beginPath();
    ctx.moveTo(padding.left, y);
    ctx.lineTo(width - padding.right, y);
    ctx.strokeStyle = '#e4e4e7';
    ctx.stroke();
  }
  
  // Draw datasets
  props.data.datasets.forEach(dataset => {
    ctx.beginPath();
    
    dataset.data.forEach((value, i) => {
      const x = padding.left + i * xStep;
      const y = height - padding.bottom - (value / maxValue) * chartHeight;
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    
    ctx.strokeStyle = dataset.color;
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Draw points
    dataset.data.forEach((value, i) => {
      const x = padding.left + i * xStep;
      const y = height - padding.bottom - (value / maxValue) * chartHeight;
      
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = dataset.color;
      ctx.fill();
    });
  });
  
  // Draw legend
  const legendY = padding.top - 15;
  let legendX = padding.left;
  
  props.data.datasets.forEach(dataset => {
    // Draw color box
    ctx.fillStyle = dataset.color;
    ctx.fillRect(legendX, legendY, 10, 10);
    
    // Draw label
    ctx.fillStyle = '#18181b';
    ctx.font = '12px sans-serif';
    ctx.fillText(dataset.label, legendX + 15, legendY + 9);
    
    legendX += ctx.measureText(dataset.label).width + 40;
  });
};

onMounted(() => {
  if (chartCanvas.value) {
    // Set initial dimensions
    chartCanvas.value.width = chartCanvas.value.offsetWidth;
    chartCanvas.value.height = chartCanvas.value.offsetHeight;
    drawChart();
    
    // Handle resize
    window.addEventListener('resize', () => {
      if (chartCanvas.value) {
        chartCanvas.value.width = chartCanvas.value.offsetWidth;
        chartCanvas.value.height = chartCanvas.value.offsetHeight;
        drawChart();
      }
    });
  }
});

watch(() => props.data, drawChart, { deep: true });
</script>
