<template>
	<div class="topStatistics">
		<el-card class="topElCard">
			<div class="topCardBox">
				<div class="title">
					总用户量 
					<el-tooltip class="item" effect="dark" content="总用户量" placement="top-start">
						<i class="el-icon-info el-top-icons"></i>
					</el-tooltip>
				</div>
				<div class="topCardBoxCont">{{user.num}}</div>
			</div>
			<div class="statisticsText">
				日均注册量   {{user.subNum}}
			</div>
		</el-card>
		<el-card class="topElCard">
			<div class="topCardBox">
				<div class="title">
					全平台访问量
					<el-tooltip class="item" effect="dark" content="全平台访问量" placement="top-start">
						<i class="el-icon-info el-top-icons"></i>
					</el-tooltip>
				</div>
				<div class="topCardBoxCont">{{visit.num}}</div>
			</div>
			<div class="statisticsText">
				日访问量   {{visit.subNum}}
			</div>
		</el-card>
		<el-card class="topElCard">
			<div class="topCardBox">
				<div class="title">
					实名人数
					<el-tooltip class="item" effect="dark" content="实名人数" placement="top-start">
						<i class="el-icon-info el-top-icons"></i>
					</el-tooltip>
				</div>
				<div class="topCardBoxCont">{{autonym.num}}</div>
			</div>
			<div class="statisticsText">
				转化率   {{autonym.subNum}}
			</div>
		</el-card>
		<el-card class="topElCard">
			<div class="topCardBox">
				<div class="title">
					流失率
					<el-tooltip class="item" effect="dark" content="流失率" placement="top-start">
						<i class="el-icon-info el-top-icons"></i>
					</el-tooltip>
				</div>
				<div class="topCardBoxCont">{{leave.num}}</div>
			</div>
			<div class="statisticsText">
				周同比   {{leave.subNum}}
			</div>
		</el-card>
	</div>
</template>

<script>
	export default{
		name:'topStatistics',
		data(){
			return{
				user:{  
					num: 0,// 用户数量
					subNum: 0// 日均注册量
				},
				visit:{
					num: 0,// 全平台访问量
					subNum: 0//日访问量
				},
				autonym:{
					num: 0,//实名人数
					subNum: 0//转化率
				},
				leave:{
					num: 0,//流失率
					subNum: 0//周同比
				}
			}
		},
		mounted() {
			// this.returnDataDispose(1265992165, 1, (val) => {
			// 	this.user.num = val
			// })
			// this.returnDataDispose(126, 1, (val) => {
			// 	this.user.subNum = val
			// })
			this.getPageData()
		},
		methods:{
			returnDataDispose(num, type, callback){
				let final = Number(num);
				let unit = '';
				if(Number(num) >= 100000000){
					final = Number(num) / 100000000
					unit = '亿'
				} else if(Number(num) >= 10000){
					final = Number(num) / 10000
					unit = '万'
				} else {
					if(type === 1){
						unit = '人'
					} else {
						unit = '%'
					}
				}
				this.setJumpNumber(final, (val) => {
					callback(`${val.toLocaleString()} ${unit}`)
				})
			},
			setJumpNumber( targetNum, callback, time = 1, startNum = 0,){
				let originNum = startNum;
				let stepNum = 0;
				let timeNum = time; 
				let finalNum = 0	
				let timeId = setInterval(() => {
				  if (originNum < targetNum) {
				    timeNum -= 0.001;
				    let strNum = originNum.toString();
				    // 数字比较少的时候直接用 + 1; 数字很大直接 +1 要很久才能调到最对应的数字，所有后三位数随机跳动的方式进行模拟生成
				    if (targetNum <= 100) {
				      stepNum += 0.01; // 这样才可以实现越跳越快的效果
				      originNum = originNum + stepNum;
				      finalNum = originNum;
				    } else if (targetNum < 100000 && targetNum > 100) {
				      stepNum += 1; // 这样才可以实现越跳越快的效果
				      originNum = originNum + stepNum;
				      finalNum = originNum;
				    } else{
				      stepNum += 600; // 这样才可以实现越跳越快的效果
				      originNum = originNum + stepNum;
				      finalNum = strNum.substr(0, strNum.length - 3) + Math.floor(Math.random()*10) + Math.floor(Math.random()*10) + Math.floor(Math.random()*10);
				    }
				  } else {
				    finalNum = targetNum;
				    clearInterval(timeId);
				  }
				  callback(finalNum) 
				}, timeNum);
			},
			getPageData(){
				this.$request.get(this.$api.getTop).then( res => {
					if(res.code == 200){
						let data = res.data
						// 第一板块
						this.returnDataDispose(data.totalUsers?data.totalUsers:0, 1, (val) => {
							this.user.num = val
						})
						this.returnDataDispose(data.averageDailyRegistration?data.averageDailyRegistration:0, 1, (val) => {
							this.user.subNum = val
						})
						// 第二板块
						this.returnDataDispose(data.platformVisits?data.platformVisits:0, 1, (val) => {
							this.visit.num = val
						})
						this.returnDataDispose(data.averageDailyVisits?data.averageDailyVisits:0, 1, (val) => {
							this.visit.subNum = val
						})
						// 第三板块
						this.returnDataDispose(data.realNameNumber?data.realNameNumber:0, 1, (val) => {
							this.autonym.num = val
						})
						this.returnDataDispose(data.conversionRate?data.conversionRate:0, 0, (val) => {
							this.autonym.subNum = val
						})
						// 第四板块
						this.returnDataDispose(data.churnRate?data.churnRate:0, 1, (val) => {
							this.leave.num = val
						})
						this.returnDataDispose(data.weeklyChurnRate?data.weeklyChurnRate:0, 0, (val) => {
							this.leave.subNum = val
						})
					}
				})
			}
		}
	}
</script>

<style scoped="scoped">
	.topStatistics{
		display: flex;
		justify-content: space-between;
		flex-wrap: nowrap;
	}
	.topStatistics .topElCard{
		width: 405px;
		cursor: pointer;
	}
	.topStatistics .topElCard:hover{
		transform: scale(1.1);
	}
	.topCardBox{
		height: 120px;
		border-bottom: 1px solid #EEEEEE;
	}
	.topCardBox .el-top-icons{
		float: right;
		cursor: pointer;
	}
	.topCardBox .title{
		color: #8C8C8C;
	}
	.statisticsText{
		margin-top: 20px;
		color: #8C8C8C;
	}
	.topCardBoxCont{
		text-align: center;
		font-size: 30px;
		color: #333333;
		line-height: 100px;
	}
</style>
