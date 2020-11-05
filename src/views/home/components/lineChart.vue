<template>
	<div id="lineChart" style="width: 100%;height: 400px;"></div>
</template>

<script>
	import echarts from "echarts";
	export default {
		name: 'lineChart',
		data(){
			return{
				
			}
		},
		mounted() {
			let myChart = echarts.init(document.getElementById("lineChart"));
			let option = {
				xAxis: {
					type: 'category',
					data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
				},
				yAxis: {
					type: 'value'
				},
				series: [{
					data: [30, 932, 901, 634, 1290, 1330, 1920, 30, 932, 901, 634, 1290],
					type: 'line'
				}]
			};
			myChart.setOption(option);
		}
	}
</script>

<style>
</style>
