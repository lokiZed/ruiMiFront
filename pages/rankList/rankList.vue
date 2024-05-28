<template>
	<view>
		<!-- 如果页面中的cell高度是固定不变的，则不需要设置cell-height-mode，如果页面中高度是动态改变的，则设置cell-height-mode="dynamic" -->
		<z-paging ref="paging" use-virtual-list cell-height-mode="dynamic" @query="queryList" class="container">
			<!-- 需要固定在顶部不滚动的view放在slot="top"的view中，如果需要跟着滚动，则不要设置slot="top" -->

			<!-- 如果希望其他view跟着页面滚动，可以放在z-paging标签内，放在所有cell上方的用slot="header"插入，放在所有cell下方的用slot="footer"插入 -->

			<!-- 通过slot="cell"插入列表for循环的cell，slot-scope中提供当前for循环的item和index -->
			<!-- vue2/3中写法如下 -->

			<!-- <block v-for="(item,index) in topList" :key="index">
				<view slot="top">
					<view class="item" @click="itemClick(item,index)">
						<view class="item-rank">
							<u-icon size="100rpx" :name="`/static/rank${index+1}.png`"></u-icon>
						</view>
						<view class="item-avator">
							<u--image shape="circle" width="100rpx" height="100rpx" :src="item.headUrl"></u--image>
						</view>
						<view class="item-name">
							<text>{{item.name}}</text>
						</view>
						<view class="item-score">
							<text>{{item.score}}</text>
						</view>
					</view>
				</view>
			</block> -->

			<template #cell="{item,index}">
				<view class="item" @click="itemClick(item,index)">
					<view class="item-rank">
						<u-icon size="100rpx" :name="`/static/rank${index < 3 ? index+1 : 4}.png`"></u-icon>
					</view>
					<view class="item-avator">
						<u--image shape="circle" width="100rpx" height="100rpx" :src="item.headUrl"></u--image>
					</view>
					<view class="item-name">
						<text>{{item.userName}}</text>
					</view>
					<view class="item-age">
						<text>{{item.userAge}}岁</text>
					</view>
					<view class="item-score">
						<text>{{item.score}}</text>
					</view>
				</view>
			</template>
		</z-paging>
		<u-popup :show="dataAbout.waitShow" mode="center" :round="10" bgColor="transparent">
			<u-loading-icon text="加载中" :vertical="true" size="100rpx" textSize="50rpx"></u-loading-icon>
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
				topList: [],
				dataAbout: {
					waitShow: false
				}
			}
		},
		methods: {
			queryList(pageNo, pageSize) {
				this.dataAbout.waitShow = true
				var token = uni.getStorageSync("token")
				get("/rank/list", {
						"page": pageNo,
						"size": pageSize
					}, {
						'Authorization': 'Bearer ' + token
					})
					.then(res => {
						var data = res.data
						for (var i = 0; i < data.length; i++) {
							var score = data[i].score
							var m = String(Math.floor(score / 60)).padStart(2, '0')
							var s = String(score % 60).padStart(2, '0')
							data[i].score = `${m}:${s}`
						}
						this.$refs.paging.complete(data)
					})
					.catch(error => {
						if (error == "未登录") {
							uni.removeStorageSync("token")
							uni.reLaunch({
								url: "/pages/index/index"
							})
						} else {
							this.$refs.paging.complete(false)
						}
					})
					.finally(() => {
						this.dataAbout.waitShow = false
					})
			},
			onShow() {
				var token = uni.getStorageSync("token")
				if (token == "") {
					uni.redirectTo({
						url: '/pages/index/index'
					})
				}
			}
		},
	}
</script>

<style lang="scss">
	.container {
		background-image: linear-gradient(to bottom, rgb(234, 229, 201),rgb(108, 198, 203))
	}

	.item {
		display: flex;
		align-items: center;
		flex-direction: row;
		padding: 20rpx 30rpx;
	}

	.item-rank {
		width: 100rpx;
		text-align: center;
	}

	.item-avator {
		margin-left: 10rpx;
	}

	.item-name {
		margin-left: 30rpx;
		width: 250rpx;
	}

	.item-age {
		margin-left: 30rpx;
		width: 100rpx;
	}

	.item-score {
		position: absolute;
		right: 0;
	}
</style>