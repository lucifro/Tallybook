<template>
	<view class="main">
		<view class="main_top">
			<button type="warn" @click="quit" class="main_top_btn">退出登录</button>
		</view>
		<view class="main_content">
			<view class="main_content_title">
				记账本
			</view>
			<view class="">
				<button type="primary" class="btn" @click="createRecords">添加账单</button>
			</view>
		</view>
		<view class="main_button" v-for="(item, index) in listdata" :key="index">
			<view class="main_button_border">
				<view :class="item.type=='1' ? 'main_button_time' : 'main_button_times'">
					<view class="">
						{{item.time.substring(0, 9)}}
					</view>
					<view class="main_button_contnet_del" @click="delbook(item._id)">
						<image src="../static/del.png" mode=""></image>
					</view>
					
				</view>
				<view class="main_button_contnet" @click="editRecords(item._id)">
					<view class="">
						{{item.title}}
					</view>
					<view class="main_button_contnet_money">
						<view class="main_button_contnet_money_btn">
							{{item.type=='1'?  '收入' : '支出'}}
						</view>
						<view class="main_button_contnet_money_font">
							{{item.account}}元
						</view>
					</view>
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
	.main{
		padding:  0 30rpx 0 30rpx;
	}
	.main_top{
		padding-top: 30rpx;
	}
	.main_top_btn{
		margin: 0;
		width: 200rpx;
	}
	.main_content{
		display: flex;
		justify-content: space-between;
		padding:30rpx 0 30rpx 0;
		border-bottom: 2rpx solid #f9f9f9;
	}
	.main_content_title{
		padding-top: 10rpx;
		font-size: 50rpx;
	}
	.btn{
		background-color: #347ab6;
	}
	.main_button_border{
		border: 2rpx solid #eae1e1;
		height: 200rpx;
		margin-bottom: 20rpx;
	}
	.main_button_time{
		display: flex;
		justify-content: space-between;
		padding: 20rpx 0 0 30rpx;
		height: 60rpx;
		background-color: #f1ddde;
		color: #b7757b;
	}
	.main_button_times{
		display: flex;
		justify-content: space-between;
		padding: 20rpx 0 0 30rpx;
		height: 60rpx;
		background-color: #def0d8;
		color: #638163;
	}
	.main_button_contnet{
		display: flex;
		justify-content: space-between;
		padding: 33rpx 80rpx 0 50rpx;
	}
	.main_button_contnet_money{
		display: flex;
	}
	.main_button_contnet_money_btn{
		margin-right: 50rpx;
		padding-left: 25rpx;
		width: 90rpx;
		height: 50rpx;
		background-color: #eaad4f;
		color:#ffffff;
		border-radius: 30rpx;
	}
	.main_button_contnet_money_font{
		padding-top: 5rpx;
	}
	.main_button_contnet_del{
		margin-right: 50rpx;
		image{
			width: 50rpx;
			height: 50rpx;
		}
	}
</style>
