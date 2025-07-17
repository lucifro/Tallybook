<template>
	<view class="main">
		<!-- 顶部导航栏 -->
		<view class="header">
			<view class="header-content">
				<view class="header-title">
					<text class="title-text">记账本</text>
					<text class="title-subtitle">Financial Tracker</text>
				</view>
				<button type="warn" @click="quit" class="logout-btn">
					<text class="btn-text">退出</text>
				</button>
			</view>
		</view>

		<!-- 主要内容区域 -->
		<view class="content">
			<!-- 添加按钮区域 -->
			<view class="add-section">
				<button type="primary" class="add-btn" @click="createRecords">
					<text class="add-icon">+</text>
					<text class="add-text">添加账单</text>
				</button>
			</view>

			<!-- 账单列表 -->
			<view class="records-section">
				<view class="section-title">
					<text class="title">账单记录</text>
					<text class="count">({{listdata.length || 0}})</text>
				</view>
				
				<view class="records-list">
					<view class="record-card" v-for="(item, index) in listdata" :key="index">
						<view class="card-header" :class="item.type=='1' ? 'income-header' : 'expense-header'">
							<view class="date-info">
								<text class="date">{{item.time.substring(0, 10)}}</text>
								<text class="time">{{item.time.substring(11, 16)}}</text>
							</view>
							<view class="delete-btn" @click="delbook(item._id)">
								<image src="../static/del.png" mode="aspectFit" class="delete-icon"></image>
							</view>
						</view>
						
						<view class="card-content" @click="editRecords(item._id)">
							<view class="content-left">
								<text class="title-text">{{item.title}}</text>
								<text class="remarks" v-if="item.remarks">{{item.remarks}}</text>
							</view>
							<view class="content-right">
								<view class="type-badge" :class="item.type=='1' ? 'income-badge' : 'expense-badge'">
									<text class="type-text">{{item.type=='1'? '收入' : '支出'}}</text>
								</view>
								<text class="amount" :class="item.type=='1' ? 'income-amount' : 'expense-amount'">
									{{item.type=='1' ? '+' : '-'}}¥{{item.account}}
								</text>
							</view>
						</view>
					</view>
				</view>

				<!-- 空状态 -->
				<view class="empty-state" v-if="!listdata || listdata.length === 0">
					<view class="empty-icon">📊</view>
					<text class="empty-text">暂无账单记录</text>
					<text class="empty-subtext">点击上方按钮添加您的第一笔账单</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	import {
		onShow
	} from '@dcloudio/uni-app';
	import {list,dellist} from '@/api/index.js'
	onShow(() => {
		listdata.value={};
		getdatalist();
	});	
	//数据列表
	const listdata=ref({});
	//颜色判定
	const colorbind=ref(true);
	//获取数据列表
	const getdatalist=async()=>{
		let res = await list();
		if(res.code=='200'){
			listdata.value=res.enity;
		}else{
			uni.showToast({
				title: res.msg,
				icon: 'error',
			})
		}
		
	}
	//转跳添加记录页面
	const createRecords = ()=>{
		uni.navigateTo({
			url: '/pages/create/index'
		})
	}
	//转跳修改记录页面
	const editRecords = (id)=>{
		console.log(id,'index');
		uni.navigateTo({
			url: `/pages/edit/index?id=${id}`
		})
	}
	//删除数据
	const delbook=async(id)=>{
		let res =await dellist({
			id:id
		})
		if(res.code == '200'){
			uni.showToast({
				title: '删除成功',
				icon: 'success',
			})
			getdatalist();
		}else{
			uni.showToast({
				title: res.msg,
				icon: 'error',
			})
		}
	}
	//退出
	const quit =()=>{
		uni.removeStorageSync('token');
		uni.navigateTo({
			url: '/pages/login/index'
		})
	}
</script>

<style lang="scss" scoped>
	.main {
		min-height: 100vh;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	}

	.header {
		padding: 40rpx 30rpx 20rpx;
		background: rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(10px);
		border-bottom: 1px solid rgba(255, 255, 255, 0.2);
	}

	.header-content {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.header-title {
		display: flex;
		flex-direction: column;
	}

	.title-text {
		font-size: 48rpx;
		font-weight: bold;
		color: #ffffff;
		margin-bottom: 8rpx;
	}

	.title-subtitle {
		font-size: 24rpx;
		color: rgba(255, 255, 255, 0.8);
		font-weight: 300;
	}

	.logout-btn {
		background: rgba(255, 255, 255, 0.2);
		border: 1px solid rgba(255, 255, 255, 0.3);
		border-radius: 50rpx;
		padding: 16rpx 32rpx;
		backdrop-filter: blur(10px);
	}

	.btn-text {
		color: #ffffff;
		font-size: 28rpx;
		font-weight: 500;
	}

	.content {
		padding: 30rpx;
	}

	.add-section {
		margin-bottom: 40rpx;
	}

	.add-btn {
		background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
		border-radius: 50rpx;
		height: 100rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 8rpx 32rpx rgba(79, 172, 254, 0.3);
		border: none;
		transition: all 0.3s ease;
	}

	.add-btn:active {
		transform: translateY(2rpx);
		box-shadow: 0 4rpx 16rpx rgba(79, 172, 254, 0.3);
	}

	.add-icon {
		font-size: 36rpx;
		color: #ffffff;
		margin-right: 16rpx;
		font-weight: bold;
	}

	.add-text {
		font-size: 32rpx;
		color: #ffffff;
		font-weight: 600;
	}

	.records-section {
		background: rgba(255, 255, 255, 0.95);
		border-radius: 24rpx;
		padding: 30rpx;
		box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1);
		backdrop-filter: blur(10px);
	}

	.section-title {
		display: flex;
		align-items: center;
		margin-bottom: 30rpx;
		padding-bottom: 20rpx;
		border-bottom: 2rpx solid #f0f0f0;
	}

	.title {
		font-size: 36rpx;
		font-weight: bold;
		color: #333333;
	}

	.count {
		font-size: 28rpx;
		color: #666666;
		margin-left: 16rpx;
	}

	.records-list {
		display: flex;
		flex-direction: column;
		gap: 20rpx;
	}

	.record-card {
		background: #ffffff;
		border-radius: 16rpx;
		overflow: hidden;
		box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.08);
		transition: all 0.3s ease;
		border: 1px solid #f0f0f0;
	}

	.record-card:active {
		transform: scale(0.98);
		box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.12);
	}

	.card-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx 24rpx;
		height: 80rpx;
	}

	.income-header {
		background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
	}

	.expense-header {
		background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
	}

	.date-info {
		display: flex;
		flex-direction: column;
	}

	.date {
		font-size: 28rpx;
		font-weight: 600;
		color: #333333;
		margin-bottom: 4rpx;
	}

	.time {
		font-size: 24rpx;
		color: #666666;
	}

	.delete-btn {
		padding: 8rpx;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.8);
		transition: all 0.3s ease;
	}

	.delete-btn:active {
		background: rgba(255, 255, 255, 1);
		transform: scale(1.1);
	}

	.delete-icon {
		width: 40rpx;
		height: 40rpx;
	}

	.card-content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 24rpx;
		background: #ffffff;
	}

	.content-left {
		flex: 1;
		margin-right: 20rpx;
	}

	.title-text {
		font-size: 32rpx;
		font-weight: 600;
		color: #333333;
		margin-bottom: 8rpx;
		display: block;
	}

	.remarks {
		font-size: 26rpx;
		color: #999999;
		display: block;
	}

	.content-right {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 12rpx;
	}

	.type-badge {
		padding: 8rpx 16rpx;
		border-radius: 20rpx;
		font-size: 24rpx;
		font-weight: 500;
	}

	.income-badge {
		background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
		color: #ffffff;
	}

	.expense-badge {
		background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
		color: #ffffff;
	}

	.type-text {
		font-size: 24rpx;
		font-weight: 500;
	}

	.amount {
		font-size: 36rpx;
		font-weight: bold;
	}

	.income-amount {
		color: #4facfe;
	}

	.expense-amount {
		color: #fa709a;
	}

	.empty-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 80rpx 40rpx;
		text-align: center;
	}

	.empty-icon {
		font-size: 120rpx;
		margin-bottom: 30rpx;
		opacity: 0.6;
	}

	.empty-text {
		font-size: 32rpx;
		color: #666666;
		font-weight: 500;
		margin-bottom: 16rpx;
	}

	.empty-subtext {
		font-size: 26rpx;
		color: #999999;
		line-height: 1.5;
	}
</style>
