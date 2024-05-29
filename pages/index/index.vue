<template>
	<view>
		<uni-nav-bar shadow height="50px" title="舒尔特挑战赛" />
		<view class="mainContainer" :style="{'height':String(deviceAbout.height - 50) + 'px'}">
			<view class="topTitle">
				<u--image class="topTitleImg1" :showLoading="topTitleImg1.imgShowLoading" :src="topTitleImg1.imgSrc"
					:width="topTitleImg1.imgWidth" :height="topTitleImg1.imgHeight"></u--image>
				<u--image class="topTitleImg2" :showLoading="topTitleImg2.imgShowLoading" :src="topTitleImg2.imgSrc"
					:width="topTitleImg2.imgWidth" :height="topTitleImg2.imgHeight"></u--image>
				<!-- <svg width="200" height="100">  
				  <text x="50" y="50" fill="white" stroke="black" stroke-width="2">睿米心身</text>  
				</svg> -->
				<!-- <u--text text="睿米心身" :bold="true" color="#ffffff" size="35px"></u--text> -->
			</view>
			<view class="challengeName">
				<text class="challengeNameGod">专注大神</text>
				<text class="challengeNameGame">挑战赛</text>
			</view>
			<view class="challengeLevel">
				<u-button :shape="challengeLevel.shape" :color="challengeLevel.color" :icon="challengeLevel.iconUrl"
					:customStyle="challengeLevelCustomStyle">{{challengeLevel.text}}</u-button>
			</view>
			<view class="challengeInfo">
				<text class="challengeInfoBase">当前已有</text>
				<text class="challengeInfoCount">{{dataAbout.gameUserCount}}</text>
				<text class="challengeInfoBase">人完成挑战</text>
			</view>
			<view class="challengeNum">
				<text class="challengeNumBase">还剩</text>
				<text class="challengeNumCount">{{dataAbout.leaveNum}}</text>
				<text class="challengeNumBase">次挑战机会</text>
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
				<view>
					<u-upload accept="image" :fileList="avatarList" uploadText="选择头像" maxCount=1
						:previewFullImage="true" @afterRead="afterAvatarRead" @delete="avatarDelete"></u-upload>
				</view>
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
		post,
		BASE_FIlE_URL
	} from 'funcs/request'

	export default {
		data() {
			return {
				topTitleImg1: {
					imgShowLoading: true,
					imgSrc: "../../static/ruiMi.png",
					imgWidth: "40px",
					imgHeight: "40px",
				},
				topTitleImg2: {
					imgShowLoading: true,
					imgSrc: "../../static/ruiMiText.png",
					imgWidth: "160px",
					imgHeight: "43px",
				},
				challengeLevel: {
					iconUrl: "../../static/nanDu1.png",
					shape: "circle",
					text: "初阶",
					color: "linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))"
				},
				challengeInfo: {
					text: "当前有9999人参与挑战！你也来吧",
					color: "#ffffff",
					size: "16px"
				},
				myChallengeInfo: {
					imgShowLoading: true,
					bestScoreImgSrc: "../../static/chengJi.png",
					bestRankImgSrc: "../../static/paiMing.png",
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
					color: "#1afa29",
					height: "50px",
					width: "100px",
					fontSize: "27px"
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
					gameUserCount: 0,
					leaveNum: 0,
					bestScore: "00:00",
					bestRank: 0
				},
				deviceAbout: {
					height: 1
				},
				avatarList: [],
				loginError: {
					message: "账号信息错误",
					type: "error"
				},
				avatarError: {
					message: "请上传头像",
					type: "error"
				},
				avatarUploadError: {
					message: "头像上传失败",
					type: "error"
				}
			}
		},
		methods: {
			submit() {
				if (this.avatarList.length == 0) {
					this.$refs.uToast.show(this.avatarError)
					return
				}
				if (this.$refs.uForm.validate() == undefined) {
					this.$refs.uForm.setRules(this.rules)
				}
				this.$refs.uForm.validate().then(res => {
					this.dataAbout.waitShow = true
					// 上传头像
					var avatarLocalUrl = this.avatarList[0].url

					var uploadOk = true
					var fileHash = ""
					var uploadTask = uni.uploadFile({
						url: BASE_FIlE_URL + "/file/avatar",
						filePath: avatarLocalUrl,
						name: "file",
						formData: {
							'from': "ruiMi"
						},
						success: (res) => {
							if (res.statusCode != 200) {
								uploadOk = false
							} else {
								fileHash = JSON.parse(res.data).fileHash
								// 上传数据
								var data = {
									"challengeId": 1,
									"accountName": this.userInfo.accountName,
									"accountPass": this.userInfo.accountPass,
									"userName": this.userInfo.name,
									"userAge": Number(this.userInfo.age),
									"userHeadUrl": fileHash
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
							}
						},
						fail: (error) => {
							uploadOk = false
						}
					})
					if (!uploadOk) {
						this.$refs.uToast.show(this.avatarUploadError)
						return
					}
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
			},
			afterAvatarRead(event) {
				this.avatarList.push({
					"url": event.file.url
				})
			},
			avatarDelete(event) {
				this.avatarList.pop()
			}
		},
		onShow() {
			uni.getSystemInfo({
				success: (res) => {
					this.deviceAbout.height = res.screenHeight
				}
			})
			var token = uni.getStorageSync("token")
			if (token != "") {
				this.dataAbout.waitShow = true
				// 请求接口获取一些数据
				get("/game/index", {}, {
						'Authorization': 'Bearer ' + token
					})
					.then(data => {
						this.dataAbout.gameUserCount = data.data.gamerCount
						this.dataAbout.leaveNum = data.data.challengeNum
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
		/* background-color: blue; */
		background-image: linear-gradient(to bottom, rgba(243, 196, 216, 0.5), rgba(161, 152, 245, 0.5)),
			url("../../static/bg.png");
		background-position: center;
		background-size: cover;
	}


	.topTitle {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-top: 20px;
		font-family: 'myFont', sans-serif;
	}

	.topTitleImg1 {
		margin-right: 20rpx;
	}


	.challengeName {
		display: flex;
		flex-direction: row;
		align-items: center;
		font-family: 'myFont', sans-serif;
	}

	.challengeNameGod {
		font-size: 30px;
		font-weight: bold;
		color: #ffffff;
	}

	.challengeNameGame {
		font-size: 60px;
		font-weight: bold;
		color: #ffc800;
	}

	.challengeLevel {
		font-family: 'myFont', sans-serif;
		font-size: 200px;
	}

	.challengeInfo {
		display: flex;
		flex-direction: row;
		align-items: center;
		font-family: 'myFont', sans-serif;
	}

	.challengeInfoBase {
		font-size: 20px;
		font-weight: bold;
		color: #ffffff;
	}

	.challengeInfoCount {
		font-size: 40px;
		font-weight: bold;
		color: #ffc800;
	}

	.challengeNum {
		display: flex;
		flex-direction: row;
		align-items: center;
		font-family: 'myFont', sans-serif;
	}

	.challengeNumBase {
		font-size: 20px;
		font-weight: bold;
		color: #ffffff;
	}

	.challengeNumCount {
		font-size: 40px;
		font-weight: bold;
		color: #ffc800;
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
		justify-content: flex-end;
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
		/* margin-right: 50rpx; */
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

	@font-face {
		font-family: 'myFont';
		src: url('../../static/ziti.ttf') format('truetype');
		font-weight: normal;
		font-style: normal;
	}
</style>