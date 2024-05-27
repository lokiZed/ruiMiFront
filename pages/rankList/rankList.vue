<template>
	<view>
		<!-- 如果页面中的cell高度是固定不变的，则不需要设置cell-height-mode，如果页面中高度是动态改变的，则设置cell-height-mode="dynamic" -->
		<z-paging ref="paging" use-virtual-list cell-height-mode="dynamic" @query="queryList">
			<!-- 需要固定在顶部不滚动的view放在slot="top"的view中，如果需要跟着滚动，则不要设置slot="top" -->

			<!-- 如果希望其他view跟着页面滚动，可以放在z-paging标签内，放在所有cell上方的用slot="header"插入，放在所有cell下方的用slot="footer"插入 -->

			<!-- 通过slot="cell"插入列表for循环的cell，slot-scope中提供当前for循环的item和index -->
			<!-- vue2/3中写法如下 -->
			<block v-for="(item,index) in topList" :key="index">
				<view slot="top">
					<view class="item" @click="itemClick(item,index)">
						<view class="item-rank">
							<u-icon size="100rpx" :name="`/static/rank${index+1}.png`"></u-icon>
						</view>
						<view class="item-avator">
							<u--image shape="circle" width="100rpx" height="100rpx" :src="item.avatorUrl"></u--image>
						</view>
						<view class="item-name">
							<text>{{item.name}}</text>
						</view>
						<view class="item-score">
							<text>{{item.score}}</text>
						</view>
					</view>
				</view>
			</block>
			<template #cell="{item,index}">
				<view class="item" @click="itemClick(item,index)">
					<view class="item-rank">
						<u-icon size="100rpx" name="/static/rank4.png"></u-icon>
					</view>
					<view class="item-avator">
						<u--image shape="circle" width="100rpx" height="100rpx" :src="item.avatorUrl"></u--image>
					</view>
					<view class="item-name">
						<text>{{item.name}}</text>
					</view>
					<view class="item-score">
						<text>{{item.score}}</text>
					</view>
				</view>
			</template>
		</z-paging>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				topList: []
			}
		},
		methods: {
			queryList(pageNo, pageSize) {
				// 组件加载时会自动触发此方法，因此默认页面加载时会自动触发，无需手动调用
				// 这里的pageNo和pageSize会自动计算好，直接传给服务器即可
				// 模拟请求服务器获取分页数据，请替换成自己的网络请求
				// const params = {
				// 	pageNo: pageNo,
				// 	pageSize: pageSize,
				// 	random: this.tabIndex === 1
				// }
				this.topList = [
					{
						avatorUrl: "https://tu.sioe.cn/gj/qiege/image.jpg",
						name: "张一丰",
						score: "10:00:28"
					},
					{
						avatorUrl: "https://tu.sioe.cn/gj/qiege/image.jpg",
						name: "张二丰",
						score: "10:00:28"
					},
					{
						avatorUrl: "https://tu.sioe.cn/gj/qiege/image.jpg",
						name: "张三丰",
						score: "10:00:28"
					}
				]
				var list = []
				for (let i = 4; i < 20; i++) {
					list.push({
						avatorUrl: "https://tu.sioe.cn/gj/qiege/image.jpg",
						name: "张四丰",
						score: "10:00:28"
					})
				}
				this.$refs.paging.complete(list)
				// this.$request.queryListLong(params).then(res => {
				// 	// 将请求的结果数组传递给z-paging
				// 	this.$refs.paging.complete(res.data.list);
				// }).catch(res => {
				// 	// 如果请求失败写this.$refs.paging.complete(false);
				// 	// 注意，每次都需要在catch中写这句话很麻烦，z-paging提供了方案可以全局统一处理
				// 	// 在底层的网络请求抛出异常时，写uni.$emit('z-paging-error-emit');即可
				// 	this.$refs.paging.complete(false);
				// })
			},
			onLoad() {
				let value = uni.getStorageSync('userInfo');
				if (value == "") {
					uni.redirectTo({
						url: '/pages/login/login',
						success: res => {},
						fail: () => {},
						complete: () => {}
					});
				}
				this.topList = [{
						avatorUrl: "https://tu.sioe.cn/gj/qiege/image.jpg",
						name: "李真人",
						score: "00:00:01"
					},
					{
						avatorUrl: "https://tu.sioe.cn/gj/qiege/image.jpg",
						name: "张三丰",
						score: "00:00:28"
					},
					{
						avatorUrl: "https://tu.sioe.cn/gj/qiege/image.jpg",
						name: "张三丰",
						score: "00:01:00"
					}
				]
			}
		},
		}
</script>

<style lang="scss">
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
		margin-left: 30rpx;
	}

	.item-name {
		margin-left: 30rpx;
	}

	.item-score {
		position: absolute;
		right: 0;
	}
</style>