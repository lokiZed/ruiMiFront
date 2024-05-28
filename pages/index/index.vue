<template>
	<view>
		<view class="mainContainer">
			<view class="topTitle">
				<u--image class="topTitleImg1" :showLoading="topTitleImg1.imgShowLoading" :src="topTitleImg1.imgSrc"
					:width="topTitleImg1.imgWidth" :height="topTitleImg1.imgHeight"></u--image>
				<u--image class="topTitleImg2" :showLoading="topTitleImg2.imgShowLoading" :src="topTitleImg2.imgSrc"
					:width="topTitleImg2.imgWidth" :height="topTitleImg2.imgHeight"></u--image>
			</view>
			<view class="challengeName">
				<u--image class="challengeNameImg1" :showLoading="challengeNameImg1.imgShowLoading"
					:src="challengeNameImg1.imgSrc" :width="challengeNameImg1.imgWidth"
					:height="challengeNameImg1.imgHeight"></u--image>
				<u--image class="challengeNameImg2" :showLoading="challengeNameImg2.imgShowLoading"
					:src="challengeNameImg2.imgSrc" :width="challengeNameImg2.imgWidth"
					:height="challengeNameImg2.imgHeight"></u--image>
			</view>
			<view class="challengeLevel">
				<u-button :shape="challengeLevel.shape" :text="challengeLevel.text" :color="challengeLevel.color"
					:icon="challengeLevel.iconUrl" :customStyle="challengeLevelCustomStyle"></u-button>
			</view>
			<view class="challengeInfo">
				<u--text :text="dataAbout.gameUserCount" :color="challengeInfo.color"
					:size="challengeInfo.size"></u--text>
			</view>
			<view class="challengeNum">
				<u--image class="challengeNumImg1" :showLoading="challengeNumImg1.imgShowLoading"
					:src="challengeNumImg1.imgSrc" :width="challengeNumImg1.imgWidth"
					:height="challengeNumImg1.imgHeight"></u--image>

				<u--image class="challengeNumImg2" :showLoading="challengeNumImg2.imgShowLoading"
					:src="dataAbout.leaveGameCountImgUrl" :width="challengeNumImg2.imgWidth"
					:height="challengeNumImg2.imgHeight"></u--image>
				<u--image class="challengeNumImg3" :showLoading="challengeNumImg3.imgShowLoading"
					:src="challengeNumImg3.imgSrc" :width="challengeNumImg3.imgWidth"
					:height="challengeNumImg3.imgHeight"></u--image>
			</view>
			<view class="myChallengeInfo">
				<view class="myChallengeInfoPer bestScore">
					<u--image class="myChallengeInfoPerImg" :showLoading="myChallengeInfo.imgShowLoading"
						:src="myChallengeInfo.bestScoreImgSrc" :width="myChallengeInfo.imgWidth"
						:height="myChallengeInfo.imgHeight"></u--image>
					<view class="myChallengeInfoPerText">
						<u--text :text="dataAbout.bestScore" :bold="myChallengeInfo.textBold"
							:color="myChallengeInfo.textColor1" :size="myChallengeInfo.textSize1"></u--text>
						<u--text :text="myChallengeInfo.textDesc1" :color="myChallengeInfo.textColor"
							:size="myChallengeInfo.textSize2"></u--text>
					</view>
				</view>
				<view class="myChallengeInfoPer bestRank" @click="rankClick">
					<u--image class="myChallengeInfoPerImg" :showLoading="myChallengeInfo.imgShowLoading"
						:src="myChallengeInfo.bestRankImgSrc" :width="myChallengeInfo.imgWidth"
						:height="myChallengeInfo.imgHeight"></u--image>
					<view class="myChallengeInfoPerText">
						<u--text :text="dataAbout.bestRank" :bold="myChallengeInfo.textBold"
							:color="myChallengeInfo.textColor2" :size="myChallengeInfo.textSize1"></u--text>
						<u--text :text="myChallengeInfo.textDesc2" :color="myChallengeInfo.textColor"
							:size="myChallengeInfo.textSize2"></u--text>
					</view>
				</view>
			</view>
			<view class="startChallenge">
				<u-button :type="startChallenge.type" :shape="startChallenge.shape" :text="startChallenge.text"
					:color="startChallenge.color" @click="gameButtonClick"></u-button>
			</view>
		</view>
		<u-popup :show="inputUserInfo.show">
			<view class="inputUserInfoContainier">
				<view class="form">
					<u--form labelPosition="left" :model="userInfo" ref="uForm">
						<u-form-item label="账号" prop="accountName" borderBottom>
							<u--input v-model="userInfo.accountName" border="none"></u--input>
						</u-form-item>
						<u-form-item label="密码" prop="accountPass" borderBottom>
							<u--input v-model="userInfo.accountPass" border="none"></u--input>
						</u-form-item>
						<u-form-item label="姓名" prop="name" borderBottom>
							<u--input v-model="userInfo.name" border="none"></u--input>
						</u-form-item>
						<u-form-item label="年龄" prop="age" borderBottom>
							<u--input v-model="userInfo.age" border="none"></u--input>
						</u-form-item>
					</u--form>
				</view>
				<view class="buttonContainer">
					<u-button class="sumitButton" type="primary" text="提交" shape="circle" @click="submit"></u-button>
				</view>
			</view>
		</u-popup>
		<u-popup :show="dataAbout.waitShow" mode="center" :round="10" bgColor="transparent">
			<u-loading-icon text="加载中" :vertical="true" size="100rpx" textSize="50rpx"></u-loading-icon>
		</u-popup>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import {
		get,
		post
	} from 'funcs/request'

	export default {
		data() {
			return {
				topTitleImg1: {
					imgShowLoading: true,
					imgSrc: "/static/ruiMi.png",
					imgWidth: "26px",
					imgHeight: "26px"
				},
				topTitleImg2: {
					imgShowLoading: true,
					imgSrc: "/static/huNanRuiMi.png",
					imgWidth: "104px",
					imgHeight: "26px"
				},
				challengeNameImg1: {
					imgShowLoading: true,
					imgSrc: "/static/zhuanZhuDaShen.png",
					imgWidth: "144px",
					imgHeight: "32px"
				},
				challengeNameImg2: {
					imgShowLoading: true,
					imgSrc: "/static/tiaoZhanSai.png",
					imgWidth: "120px",
					imgHeight: "40px"
				},
				challengeLevel: {
					iconUrl: "/static/nanDu1.png",
					shape: "circle",
					text: "初阶",
					color: "linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))"
				},
				challengeInfo: {
					text: "当前有9999人参与挑战！你也来吧",
					color: "#ffffff",
					size: "16px"
				},
				challengeNumImg1: {
					imgShowLoading: true,
					imgSrc: "/static/ninHaiYou.png",
					imgWidth: "66px",
					imgHeight: "22px"
				},
				challengeNumImg2: {
					imgShowLoading: true,
					imgSrc: "/static/num3.png",
					imgWidth: "34px",
					imgHeight: "34px"
				},
				challengeNumImg3: {
					imgShowLoading: true,
					imgSrc: "/static/ciTiaoZhan.png",
					imgWidth: "110px",
					imgHeight: "22px"
				},
				myChallengeInfo: {
					imgShowLoading: true,
					bestScoreImgSrc: "/static/chengJi.png",
					bestRankImgSrc: "/static/paiMing.png",
					imgWidth: "30px",
					imgHeight: "30px",

					textInfo1: "00:01",
					textDesc1: "当前最好成绩",
					textSize1: "20px",
					textInfo2: "220",
					textDesc2: "当前最好排名",
					textSize2: "15px",
					textColor: "#ffffff",
					textColor1: "#00ffff",
					textColor2: "#ffff00",
					textBold: true
				},
				startChallenge: {
					type: "primary",
					shape: "circle",
					text: "开始挑战",
					color: "linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))"
				},



				challengeLevelCustomStyle: {
					color: "#1afa29"
				},

				inputUserInfo: {
					show: false

				},
				userInfo: {
					name: '',
					age: '',
					accountName: "",
					accountPass: "",
				},

				rules: {
					'name': [{
						required: true,
						message: '请填写姓名',
						trigger: ['blur', 'change']
					}],
					'age': [{
						required: true,
						message: '请输入年龄',
						trigger: ['blur', 'change']
					}, {
						type: 'number',
						message: '必须是数字',
						trigger: ['blur', 'change']
					}, {
						transform: function(value) {
							return Number(value)
						},
						type: 'number',
						min: 1,
						max: 100,
						message: '必须在1-100之间',
						trigger: ['blur', 'change']
					}],
					'accountName': [{
						required: true,
						message: '请输入账号',
						trigger: ['blur', 'change']
					}],
					'accountPass': [{
						required: true,
						message: '请输入密码',
						trigger: ['blur', 'change']
					}]
				},
				dataAbout: {
					waitShow: false,
					gameUserCount: "有0位玩家完成挑战！您也快来吧",
					leaveGameCountImgUrl: "/static/num0.png",
					bestScore: "00:00",
					bestRank: 0
				},
				loginError: {
					message: "账号信息错误",
					type: "error"
				}
			}
		},
		methods: {
			submit() {
				// console.log(this.$refs.uForm.rules)
				if (this.$refs.uForm.validate() == undefined) {
					this.$refs.uForm.setRules(this.rules)
				}
				this.$refs.uForm.validate().then(res => {
					this.dataAbout.waitShow = true
					var data = {
						"challengeId": 1,
						"accountName": this.userInfo.accountName,
						"accountPass": this.userInfo.accountPass,
						"userName": this.userInfo.name,
						"userAge": Number(this.userInfo.age),
						"userHeadUrl": "https://pic35.photophoto.cn/20150511/0034034892281415_b.jpg"
					}
					post("/user/info", data)
						.then(res => {
							uni.setStorageSync("token", res.data.token)
							uni.reLaunch({
								url: '/pages/index/index'
							})
						})
						.catch(error => {
							this.$refs.uToast.show(this.loginError)
						})
						.finally(() => {
							this.dataAbout.waitShow = false
						})
				})
			},
			rankClick() {
				uni.navigateTo({
					url: "/pages/rankList/rankList"
				});
			},
			gameButtonClick() {
				uni.navigateTo({
					url: "/pages/game/game"
				});
			}
		},
		onShow() {
			var token = uni.getStorageSync("token")
			if (token != "") {
				this.dataAbout.waitShow = true
				// 请求接口获取一些数据
				get("/game/index", {}, {
						'Authorization': 'Bearer ' + token
					})
					.then(data => {
						this.dataAbout.gameUserCount = `有${data.data.gamerCount}位玩家完成挑战！您也快来吧`
						this.dataAbout.leaveGameCountImgUrl = `/static/num${data.data.challengeNum}.png`
						var bestScore = data.data.bestScore
						var m = String(Math.floor(bestScore / 60)).padStart(2, '0')
						var s = String(bestScore % 60).padStart(2, '0')
						this.dataAbout.bestScore = `${m}:${s}`
						this.dataAbout.bestRank = data.data.bestRank
					})
					.catch(error => {
						if (error == "未登录") {
							uni.removeStorageSync("token")
							uni.reLaunch({
								url: "/pages/index/index"
							})
						}
					})
					.finally(() => {
						this.dataAbout.waitShow = false
					})
			} else {
				this.inputUserInfo.show = true
			}
		}
	}
</script>

<style>
	.mainContainer {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		height: 93vh;
		/* background-color: blue; */
		background-image: linear-gradient(to bottom, rgba(0, 0, 255, 0.5), rgba(124, 255, 2, 0.5)),
			url("/static/bg.png");
	}


	.topTitle {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.topTitleImg1 {
		margin-right: 10rpx;
	}


	.challengeName {
		display: flex;
		flex-direction: row;
		align-items: center;
		/* margin-top: 150rpx; */
	}


	.challengeNum {
		display: flex;
		flex-direction: row;
		align-items: center;
		/* margin-top: 50rpx; */
	}


	.myChallengeInfo {
		display: flex;
		flex-direction: row;
		align-items: center;
		/* margin-top: 60px; */
	}

	.myChallengeInfoPer {
		display: flex;
		flex-direction: row;
		align-items: center;
		height: 80px;
		width: 300rpx;
	}

	.myChallengeInfoPerImg {
		margin-right: 30rpx;
	}

	.myChallengeInfoPerText {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.bestScore {
		margin-right: 50rpx;
	}

	.bestRank {}

	.startChallenge {
		width: 650rpx;
	}


	.inputUserInfoContainier {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.buttonContainer {
		margin-top: 30px;
		width: 300rpx;
	}
</style>