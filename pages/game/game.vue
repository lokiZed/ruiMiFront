<template>
	<view>
		<uni-nav-bar shadow left-icon="left" height="50px" title="舒尔特挑战赛" @clickLeft="back" />
		<view class="gameContainer" :style="{'height':String(deviceAbout.height - 50) + 'px'}">
			<view class="spendTime">
				<text>{{gameAbout.spendTimeStr}}</text>
			</view>
			<view class="gameMap">
				<u-grid :border="true" col="5">
					<u-grid-item v-for="(item,index) in gridData" :key="index" :name="item"
						:customStyle="gridCustomStyle">
						<u-button :ref="'button'+item" :text="item" :customStyle="buttonCustomStyle"
							@click="clickButton(item)"></u-button>
					</u-grid-item>
				</u-grid>
			</view>
			<view class="gameAbout">
				<u-button type="primary" shape="circle" text="开始" :disabled="gameAbout.startButtonDisable"
					color="linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))" @click="start"></u-button>
			</view>
			<view class="rules">
				<text @click="gameAbout.ruleShow = true" style="color: blue;">规则</text>
			</view>
		</view>
		<u-popup :show="gameAbout.dataUploadShow" mode="center" :round="10" bgColor="transparent">
			<u-loading-icon text="数据上传中" :vertical="true" size="100rpx" textSize="50rpx"></u-loading-icon>
		</u-popup>
		<u-popup :show="gameAbout.cantPlayShow" mode="center" :round="10" bgColor="transparent"
			@close="gameAbout.cantPlayShow = false">
			<view class="cantPlayShow">
				<view class="cantPlayShowIcon">
					<u-icon name="../../static/kuLian.png" width="30px" height="30px"></u-icon>
				</view>
				<view class="cantPlayShowText">
					<u--text text="参赛机会已用完" size="25px" color="red"></u--text>
				</view>
			</view>
		</u-popup>
		<u-popup :show="gameAbout.waitShow" mode="center" :round="10" bgColor="transparent">
			<u-loading-icon text="加载中" :vertical="true" size="100rpx" textSize="50rpx"></u-loading-icon>
		</u-popup>
		<u-popup :show="gameAbout.ruleShow" mode="center" :round="10" @close="gameAbout.ruleShow = false"
			:customStyle="ruleShowStyle">
			<view class="ruleShow">
				<view>
					<u--text type="info" text="从小到大依次点击数字对应的方格" size="25px"></u--text>
				</view>
				<view>
					<u--text type="info" text="点击正确方格以绿色提示" size="25px"></u--text>
				</view>
				<view>
					<u--text type="info" text="点击错误方格以红色提示" size="25px"></u--text>
				</view>
				<view>
					<u--text type="info" text="挑战次数为0后依然可以进行游戏" size="25px"></u--text>
				</view>
				<view>
					<u--text type="info" text="但是提交成绩时会提示错误" size="25px"></u--text>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		get,
		post
	} from '../../funcs/request';
	export default {
		data() {
			return {
				buttonUnSelectColor: "#ffffff",
				buttonSelectRightColor: "#55ff00",
				buttonSelectWrongColor: "#ec0000",
				gridData: [],
				gridCustomStyle: {
					width: "120rpx",
					height: "120rpx",
				},
				buttonCustomStyle: {
					width: "110rpx",
					height: "110rpx",
					fontWeight: "bold",
					color: "#ffaa00",
					backgroundColor: this.buttonUnSelectColor
				},
				ruleShowStyle: {
					height: "230px"
				},
				gameAbout: {
					maxNum: 0,
					lastNum: 0,
					spendSecond: 0,
					spendMinute: 0,
					spendTimeStr: "00:00",
					interval: undefined,
					startButtonDisable: false,
					dataUploadShow: false,
					cantPlayShow: false,
					waitShow: false,
					ruleShow: false
				},
				deviceAbout: {
					height: 1
				}
			};
		},
		methods: {
			start() {
				this.gameAbout.startButtonDisable = true
				this.initGridData(5)
				this.initInterval()
			},
			clickButton(value) {
				if (this.interval == undefined) {
					return
				}
				var element = this.$refs['button' + value]
				if (value != this.gameAbout.lastNum + 1) {
					element[0].color = this.buttonSelectWrongColor
				} else {
					element[0].color = this.buttonSelectRightColor
					this.gameAbout.lastNum = value
				}
				console.log(value,this.gameAbout.lastNum,this.gameAbout.maxNum)
				setTimeout(() => {
					element[0].color = this.buttonUnSelectColor;
				}, 200);
				if (this.gameAbout.lastNum == this.gameAbout.maxNum) {
					// 成功了
					this.gameAbout.dataUploadShow = true
					this.clearInterval()

					var token = uni.getStorageSync("token")

					post("/game/info", {
							"score": (this.gameAbout.spendMinute * 60 + this.gameAbout.spendSecond)
						}, {
							'Authorization': 'Bearer ' + token
						})
						.then(res => {
							uni.redirectTo({
								url: '/pages/index/index',
							});
						})
						.catch(error => {
							if (error == "未登录") {
								uni.removeStorageSync("token")
							} else {
								this.gameAbout.cantPlayShow = true
								setTimeout(function() {
									uni.reLaunch({
										url: "/pages/index/index"
									})
								}, 1000);
							}

						})
						.finally(() => {
							this.gameAbout.dataUploadShow = false
						})
				}
			},
			initGridData(num) {
				this.gameAbout.maxNum = 0
				// 填充数据数组
				var gridData = []
				for (let i = 0; i < num; i++) {
					for (let j = 0; j < num; j++) {
						var itemIndex = i * num + j + 1
						gridData.push(itemIndex)
						this.gameAbout.maxNum++
					}
				}
				// 打乱数据  
				this.gridData = this.shuffleArray(gridData)
			},
			shuffleArray(array) {
				for (let i = array.length - 1; i > 0; i--) {
					const j = Math.floor(Math.random() * (i + 1));
					[array[i], array[j]] = [array[j], array[i]]; // ES6 数组解构赋值  
				}
				return array;
			},
			initInterval() {
				// 重置定时器
				this.interval = setInterval(this.dealSpendTime, 1000)
			},
			clearInterval() {
				if (this.interval != undefined) {
					clearInterval(this.interval)
				}
			},
			dealSpendTime() {
				// 调一次代表秒数加一
				this.gameAbout.spendSecond++
				if (this.gameAbout.spendSecond == 60) {
					this.gameAbout.spendMinute++
					this.gameAbout.spendSecond = 0
				}
				let m = String(this.gameAbout.spendMinute).padStart(2, '0');
				let s = String(this.gameAbout.spendSecond).padStart(2, '0');
				this.gameAbout.spendTimeStr = `${m}:${s}`
			},
			back() {
				uni.redirectTo({
					url: '/pages/index/index',
				})
			},
		},
		onShow() {
			uni.getSystemInfo({
				success: (res) => {
					this.deviceAbout.height = res.screenHeight
				}
			})
			var token = uni.getStorageSync("token")
			if (token == "") {
				uni.redirectTo({
					url: '/pages/index/index'
				})
			}
			this.initGridData(5)
		},
		onUnload() {
			this.clearInterval()
		}
	}
</script>

<style lang="scss">
	.gameContainer {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100vh;
		// margin-left: 75rpx;
	}

	.spendTime {
		margin-bottom: 50px;
	}

	.gameMap {
		background-color: #ff8a53;
		width: 600rpx;
	}

	.spendTime {
		font-size: 45px;
		color: #ff8a53;
	}


	.gameAbout {
		margin-top: 100rpx;
		width: 600rpx;
	}

	.cantPlayShow {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.cantPlayShowIcon {
		margin-right: 30rpx;
	}

	.cantPlayShowText {}

	.rules {
		margin-top: 25px;
	}
	.ruleShow{
		font-family: 'myFont', sans-serif;
		height: 230px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-start;
	}
	@font-face {
		font-family: 'myFont';
		src: url('../../static/ziti.ttf') format('truetype');
		font-weight: normal;
		font-style: normal;
	}
</style>