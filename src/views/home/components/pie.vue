<template>
	<div class="pieBox">
		<div class="pieContent" v-for="i in 5" :key="i">
			<div class="pieText">
				<div class="title">产业工人</div>
				<span>转化率</span>
				<h1>62%</h1>
			</div>
			<div class="pie" style="width: 100px;height: 100px;"></div>
		</div>
	</div>
</template>

<script>
	import echarts from "echarts";
	export default {
		name: 'pie',
		data() {
			return {

			}
		},
		mounted() {
			for(let i in 5){
				console.log(i)
			}
			let myChart = echarts.init(document.getElementsByClassName("pie")[0]);
			let myChart1 = echarts.init(document.getElementsByClassName("pie")[1]);
			let myChart2 = echarts.init(document.getElementsByClassName("pie")[2]);
			let myChart3 = echarts.init(document.getElementsByClassName("pie")[3]);
			let myChart4 = echarts.init(document.getElementsByClassName("pie")[4]);
			let option = {
				tooltip: {
					trigger: 'item',
					formatter: '{a} <br/>{b}: {c} ({d}%)'
				},
				// legend: {
				// 	orient: 'vertical',
				// 	left: 10,
				// 	data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
				// },
				series: [{
					name: '访问来源',
					type: 'pie',
					radius: ['50%', '70%'],
					avoidLabelOverlap: false,
					label: {
						show: false,
						position: 'center'
					},
					emphasis: {
						label: {
							show: true,
							fontSize: '10',/*xrf修改字体*/ 
							fontWeight: 'none'
						}
					},
					labelLine: {
						show: false
					},
					data: [{
							value: 335,
							name: '直接访问'
						},
						{
							value: 310,
							name: '邮件营销'
						},
						{
							value: 234,
							name: '联盟广告'
						},
						{
							value: 135,
							name: '视频广告'
						},
						{
							value: 1548,
							name: '搜索引擎'
						}
					]
				}]
			};
			myChart.setOption(option);
			myChart1.setOption(option);
			myChart2.setOption(option);
			myChart3.setOption(option);
			myChart4.setOption(option);
		}
	}
</script>

<style scoped="scoped">
	.pieBox,.pieContent{
		display: flex;
		justify-content: space-between;
		flex-wrap: nowrap;
		color: #8C8C8C;
	}
	.title{
		font-size: 16px;
		margin-bottom: 20px;
	}
	h1{
		font-size: 24px;
		color: #8C8C8C;
		font-weight: 400;
	}
	.pieContent{
		width: 20%;
		padding: 0 calc((20% - 164px) / 2);
	}
	.pieText{
		/* margin-right: 20px; */
	}
</style>
