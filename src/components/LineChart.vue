<template>
    <div>
      <apexchart type="line" :options="chartOptions" :series="series"></apexchart>
    </div>
  </template>
  
  <script setup>
  import { defineProps, computed } from 'vue';
  
  const props = defineProps({
    transactionsData: Array
  });
  
  const series = computed(() => [{
    name: 'Transactions',
    data: props.transactionsData.map(t => t.amount)
  }]);
  
  const chartOptions = computed(() => ({
    chart: {
      id: 'vue3-chart',
      toolbar: {
        show: false
      },
      height: 'auto',
      width: '100%',
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            height: 300
          },
          legend: {
            show: false
          },
          xaxis: {
            labels: {
              style: {
                fontSize: '8px'
              }
            }
          },
          yaxis: {
            labels: {
              style: {
                fontSize: '8px'
              }
            }
          },
          tooltip: {
            style: {
              fontSize: '8px'
            }
          },
        }
      }],
      parentHeightOffset: 0,
      redrawOnParentResize: true,
    },
    stroke: {
      curve: 'smooth',
      width: 2,
      colors: ['#A0D995']
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 0.5,
        opacityFrom: 0.4,
        stops: [0, 90, 100],
        colors: ['#A0D995']
      }
    },
    colors: ['#A0D995'],
    xaxis: {
      categories: props.transactionsData.map(t => {
        const date = new Date(t.date);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
      }),
      labels: {
        style: {
          cssClass: 'apexcharts-xaxis-label'
        }
      }
    },
    yaxis: {
      labels: {
        formatter: (val) => `${val.toFixed(2)} €`,
        style: {
          cssClass: 'apexcharts-yaxis-label'
        }
      }
    },
    tooltip: {
      y: {
        formatter: (val) => `${val.toFixed(2)} €`
      }
    },
    grid: {
      borderColor: '#90A4AE',
      strokeDashArray: 0,
      position: 'back',
      xaxis: {
        lines: {
          show: false
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      },
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      },
    },
  }));
  </script>
  