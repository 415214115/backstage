<template>
	<div class="content">
		<!-- 顶部统计 -->
		<topStatistics></topStatistics>
		<!-- 中部柱状图 -->
		<histogram></histogram>
		<!-- 底部折线图 -->
		<el-card class="footerElCard">
			<pie></pie>
			<lineChart></lineChart>
		</el-card>
	</div>
</template>

<script>
import topStatistics from './components/topStatistics.vue'
import histogram from './components/histogram.vue'
import lineChart from './components/lineChart.vue'
import pie from './components/pie.vue'
export default {
	components:{
		topStatistics,
		histogram,
		lineChart,
		pie
	},
	data() {
		return {};
	},
	mounted() {
		
	},
	methods:{
		
	}
};
</script>

<style scoped="scoped">
	.footerElCard{
		margin: 20px 0;
	}
</style>
