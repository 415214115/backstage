<template>
	<el-card class="centerElCard">
		<div slot="header" class="clearfix">
			<div class="selectOption">
				<div class="selectOptionBox">
					<div v-for="item in dataList" :key="item.id" :class="dataListIndex == item.id ? 'isSelect' : ''" @click="dataClick(item.id)">{{item.title}}</div>
					<div class="slideBar" :style="{left: `${dataListIndex * 86}px`}"></div>
				</div>
				<div class="selectOptionBox">
					<div v-for="item in timeList" :key="item.id" :class="timeListIndex == item.id ? 'isSelect' : ''" @click="timeClick(item.id)">{{item.title}}</div>
					<div class="slideBar" :style="{left: `${timeListIndex * 68}px`}"></div>
				</div>
			</div>
			<!-- <div>
				 <el-date-picker
				      v-model="value"
				      type="daterange"
				      start-placeholder="开始日期"
				      end-placeholder="结束日期"
				      :default-time="['00:00:00', '23:59:59']">
				    </el-date-picker>
			</div> -->
		</div>
		<div class="centerEchartsBox">
			<div class="histogram">
				<span class="echarsTitle">{{ dataList[dataListIndex].title }}</span>
				<div id="histogram" style="width: 100%;height: 300px;"></div>
			</div>
			<div class="centerEchartsRanking">
				<div class="visitNum">各系统访问量</div>
				<div class="visitNumBox" v-for="(i, index) in 5" :key="i">
					<div class="visitName">
						<div class="tagNum">
							<el-tag effect="dark" :type="index==0?'danger':index==1?'warning':index==2?'success':'info'">{{i}}</el-tag>
						</div>
						<span>农场直达</span>
					</div>
					<span>3322550</span>
				</div>
			</div>
		</div>
	</el-card>
</template>

<script>
	import echarts from "echarts";
	export default {
		name: 'histogram',
		data(){
			return{
				dataList: [
					{
						id: 0,
						title: '注册数',
						type: 'YEAR'
					},
					{
						id: 1,
						title: '访问量',
						type: 'YEAR'
					}
				],
				dataListIndex: 0,
				timeList: [
					// {
					// 	id: 0,
					// 	title: '今日'
					// },
					// {
					// 	id: 1,
					// 	title: '本周'
					// },
					{
						id: 0,
						title: '本月',
						type: 'MONTH'
					},
					{
						id: 1,
						title: '全年',
						type: 'YEAR'
					}
				],
				timeListIndex: 0
			}
		},
		mounted() {
			this.getPageData()
		},
		methods:{
			dataClick(id){
				// 数据类型切换
				this.dataListIndex = id
				this.getPageData()
			},
			timeClick(id){
				// 数据时间切换
				this.timeListIndex = id
				this.getPageData()
			},
			getPageData(){
				this.$request.get(this.$api.getDetail,{
					type: this.dataList[this.dataListIndex].type,
					time: this.timeList[this.timeListIndex].type
				}).then( res => {
					if(res.code == 200){
						let Xcatalogue = []
						let Xdata = []
						let data = res.data
						data.forEach((v, i) => {
							Xcatalogue.push(v.creatDate)
							Xdata.push(v.totalUsers)
						})
						this.myChartData(Xcatalogue, Xdata)
					}
				})
			},
			myChartData(Xcatalogue, Xdata){
				let myChart = echarts.init(document.getElementById("histogram"));
				let option = {
				    color: ['#409EFF'],
				    tooltip: {
				        trigger: 'axis',
				        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
				            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
				        }
				    },
				    grid: {
				        left: '3%',
				        right: '4%',
				        bottom: '3%',
				        containLabel: true
				    },
				    xAxis: [
				        {
				            type: 'category',
				            data: Xcatalogue,
				            axisTick: {
				                alignWithLabel: true
				            }
				        }
				    ],
				    yAxis: [
				        {
				            type: 'value'
				        }
				    ],
				    series: [
				        {
				            name: this.timeList[this.timeListIndex].title + ' ' + this.dataList[this.dataListIndex].title,
				            type: 'bar',
				            barWidth: '30%',
				            data: Xdata
				        }
				    ]
				};
				myChart.setOption(option);
			}
		}
	}
</script>

<style scoped="scoped">
	.centerEchartsBox,.visitNumBox,.visitName,.clearfix,.selectOption{
		display: flex;
		justify-content: space-between;
		flex-wrap: nowrap;
	}
	
	.centerElCard,.footerElCard{
		margin-top: 20px;
	}
	.centerEchartsRanking{
		width: 260px;
	}
	.visitNum{
		color: #333333;
	}
	.visitNumBox{
		margin-top: 20px;
	}
	.tagNum{
		margin-right: 20px;
	}
	.el-tag{
		border-radius: 100%;
	}
	.selectOption{
		width: 1250px;
		line-height: 32px;
	}
	.selectOptionBox div{
		display: inline-block;
		color: #8C8C8C;
		cursor: pointer;
	}
	.selectOptionBox:nth-child(1) div{
		width: 86px;
	}
	.selectOptionBox:nth-child(2) div{
		width: 68px;
	}
	.selectOptionBox{
		position: relative;
		text-align: center;
	}
	.slideBar{
		position: absolute;
		height: 2px;
		background: #409EFF;
		left: 0;
		bottom: -18px;
		margin-left: 0 !important;
		transition: left .2s;
	}
	.isSelect{
		color: #409EFF !important;
	}
	.histogram{
		position: relative;
		width: 100%;
	}
	.echarsTitle{
		position: absolute;
		left: 0;
		top: 0;
	}
</style>
