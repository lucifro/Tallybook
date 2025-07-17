<template>
	<view class="main">
		<!-- 顶部导航 -->
		<view class="header">
			<view class="header-content">
				<view class="back-btn" @click="goBack">
					<text class="back-icon">←</text>
				</view>
				<view class="header-title">
					<text class="title-text">修改记录</text>
					<text class="title-subtitle">Edit Record</text>
				</view>
				<view class="placeholder"></view>
			</view>
		</view>

		<!-- 主要内容 -->
		<view class="content">
			<!-- 表单区域 -->
			<view class="form-container">
				<uni-forms ref="formRole" :modelValue="alignmentFormData" label-position="top" :rules="rulesviod">
					<uni-forms-item label="事项" name="title">
						<view class="input-wrapper">
							<text class="input-icon">📝</text>
							<uni-easyinput 
								v-model="alignmentFormData.title" 
								placeholder="请输入事项名称"
								class="custom-input"
							/>
						</view>
					</uni-forms-item>
					
					<uni-forms-item label="发生时间" name="time">
						<view class="input-wrapper">
							<text class="input-icon">📅</text>
							<uni-datetime-picker 
								type="date" 
								:clear-icon="true" 
								v-model="alignmentFormData.time"
								class="custom-date-picker"
							/>
						</view>
					</uni-forms-item>
					
					<uni-forms-item label="类型" name="type">
						<view class="input-wrapper">
							<text class="input-icon">🏷️</text>
							<uni-data-select 
								v-model="alignmentFormData.type" 
								:localdata="range"
								class="custom-select"
							></uni-data-select>
						</view>
					</uni-forms-item>
					
					<uni-forms-item label="金额" name="account">
						<view class="input-wrapper">
							<text class="input-icon">💰</text>
							<uni-easyinput 
								v-model="alignmentFormData.account" 
								placeholder="请输入金额"
								type="number"
								class="custom-input"
							/>
						</view>
					</uni-forms-item>
					
					<uni-forms-item label="备注" name="remarks">
						<view class="input-wrapper">
							<text class="input-icon">💬</text>
							<uni-easyinput 
								v-model="alignmentFormData.remarks" 
								placeholder="请输入备注信息（可选）"
								class="custom-input"
							/>
						</view>
					</uni-forms-item>
				</uni-forms>
			</view>

			<!-- 按钮区域 -->
			<view class="button-section">
				<button type="primary" class="edit-btn" @click="editbtn">
					<text class="btn-icon">✏️</text>
					<text class="btn-text">保存修改</text>
				</button>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	import {
		onLoad,
		onShow
	} from '@dcloudio/uni-app';
	import {
		selectalist,
		editlist
	} from '@/api/index.js'
	onLoad((id) => {
		selonelist(id);
	});
	//表单数据
	const alignmentFormData = ref({
		title: '',
		time: '',
		type: '',
		account: '',
		remarks: '',
	})
	//下拉框数据
	const range = ([{
			value: 0,
			text: "支出"
		},
		{
			value: 1,
			text: "收入"
		},
	])
	//非空校验
	const formRole = ref(null);
	const rulesviod = ref({
		title: {
			rules: [{
				required: true,
				errorMessage: '请填写事项名称',
			}, ]
		},
		time: {
			rules: [{
				required: true,
				errorMessage: '请选择发生时间',
			}, ]
		},
		type: {
			rules: [{
				required: true,
				errorMessage: '请选择类型',
			}, ]
		},
		account: {
			rules: [{
				required: true,
				errorMessage: '请填写金额',
			}, ]
		},
	})
	//查询单条数据信息
	const selonelist=async(id)=>{
		let res =await selectalist({
			id:id.id
		})
		if(res.code=='200'){
			alignmentFormData.value=res.enity;
		} else {
				uni.showToast({
					title: res.msg,
					icon: 'error',
				})
			}
	}
	//修改数据
	const editbtn = () => {
		formRole.value.validate().then(async (res) => {
			if(alignmentFormData.value._id){
				let data = await editlist({
					title: res.title,
					time: res.time,
					type: res.type,
					account: res.account,
					remarks: res.remarks,
					id:alignmentFormData.value._id
				})
				if (data.code == '200') {
					uni.showToast({
						title: data.msg,
						icon: 'success',
					})
					setTimeout(() => {
						uni.navigateTo({
							url: '/pages/index'
						})
					}, 1500)
				} else {
					uni.showToast({
						title: data.msg,
						icon: 'error',
					})
				}
			}else{
				uni.showToast({
					title: '账单查询失败',
					icon: 'error',
				})
			}
			
		})
	}

	const goBack = () => {
		uni.navigateBack();
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

	.back-btn {
		width: 80rpx;
		height: 80rpx;
		background: rgba(255, 255, 255, 0.2);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		backdrop-filter: blur(10px);
		transition: all 0.3s ease;
	}

	.back-btn:active {
		background: rgba(255, 255, 255, 0.3);
		transform: scale(0.95);
	}

	.back-icon {
		font-size: 36rpx;
		color: #ffffff;
		font-weight: bold;
	}

	.header-title {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.title-text {
		font-size: 36rpx;
		font-weight: bold;
		color: #ffffff;
		margin-bottom: 8rpx;
	}

	.title-subtitle {
		font-size: 24rpx;
		color: rgba(255, 255, 255, 0.8);
		font-weight: 300;
	}

	.placeholder {
		width: 80rpx;
	}

	.content {
		padding: 30rpx;
	}

	.form-container {
		background: rgba(255, 255, 255, 0.95);
		border-radius: 24rpx;
		padding: 40rpx;
		margin-bottom: 40rpx;
		box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1);
		backdrop-filter: blur(10px);
	}

	::v-deep .uni-forms-item {
		margin-bottom: 40rpx;
	}

	::v-deep .uni-forms-item__label {
		font-size: 28rpx;
		font-weight: 600;
		color: #333333;
		margin-bottom: 16rpx;
	}

	.input-wrapper {
		position: relative;
		display: flex;
		align-items: center;
		background: #f8f9fa;
		border: 2rpx solid #e9ecef;
		border-radius: 12rpx;
		padding: 20rpx 24rpx;
		transition: all 0.3s ease;
	}

	.input-wrapper:focus-within {
		border-color: #667eea;
		background: #ffffff;
		box-shadow: 0 0 0 4rpx rgba(102, 126, 234, 0.1);
	}

	.input-icon {
		font-size: 32rpx;
		margin-right: 20rpx;
		opacity: 0.7;
	}

	::v-deep .uni-easyinput__content {
		background: transparent;
		border: none;
		padding: 0;
		flex: 1;
	}

	::v-deep .uni-easyinput__content-input {
		font-size: 30rpx;
		color: #333333;
	}

	::v-deep .uni-easyinput__placeholder {
		color: #999999;
		font-size: 28rpx;
	}

	::v-deep .uni-date__x-input {
		background: transparent;
		border: none;
		padding: 0;
		font-size: 30rpx;
		color: #333333;
	}

	::v-deep .uni-data-select {
		flex: 1;
	}

	::v-deep .uni-select {
		background: transparent;
		border: none;
		padding: 0;
	}

	::v-deep .uni-select__input-text {
		font-size: 30rpx;
		color: #333333;
	}

	.button-section {
		margin-top: 40rpx;
	}

	.edit-btn {
		background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
		border-radius: 50rpx;
		height: 100rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 8rpx 32rpx rgba(250, 112, 154, 0.3);
		border: none;
		transition: all 0.3s ease;
	}

	.edit-btn:active {
		transform: translateY(2rpx);
		box-shadow: 0 4rpx 16rpx rgba(250, 112, 154, 0.3);
	}

	.btn-icon {
		font-size: 32rpx;
		margin-right: 16rpx;
	}

	.btn-text {
		font-size: 32rpx;
		color: #ffffff;
		font-weight: 600;
	}
</style>