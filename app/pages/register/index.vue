<template>
	<view class="main">
		<!-- 背景装饰 -->
		<view class="bg-decoration">
			<view class="circle circle-1"></view>
			<view class="circle circle-2"></view>
			<view class="circle circle-3"></view>
		</view>

		<!-- 主要内容 -->
		<view class="content">
			<!-- 标题区域 -->
			<view class="header">
				<view class="logo">
					<text class="logo-icon">📝</text>
				</view>
				<view class="title-section">
					<text class="main-title">创建账户</text>
					<text class="sub-title">开始您的记账之旅</text>
				</view>
			</view>

			<!-- 表单区域 -->
			<view class="form-container">
				<uni-forms ref="formRole" :modelValue="alignmentFormData" label-position="top" :rules="rulesviod">
					<uni-forms-item label="用户名" name="account">
						<uni-easyinput 
							v-model="alignmentFormData.account" 
							placeholder="请输入用户名（8-16位字符）"
							class="custom-input"
						/>
					</uni-forms-item>
					<uni-forms-item label="密码" name="password">
						<uni-easyinput 
							v-model="alignmentFormData.password" 
							placeholder="请输入密码（8-16位字符）"
							type="password"
							class="custom-input"
						/>
					</uni-forms-item>
				</uni-forms>
			</view>

			<!-- 按钮区域 -->
			<view class="button-section">
				<button type="primary" class="register-btn" @click="registerbtn">
					<text class="btn-text">创建账户</text>
				</button>
				<button type="default" class="back-btn" @click="goBack">
					<text class="btn-text-secondary">已有账户？返回登录</text>
				</button>
			</view>

			<!-- 底部装饰 -->
			<view class="footer-decoration">
				<text class="footer-text">轻松管理您的财务状况</text>
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
	import {reg} from '@/api/index.js'
	const alignmentFormData = ref({
		account: '',
		password: '',
	})
	const formRole = ref(null);
	const rulesviod = ref({
		account: {
			rules: [{
					required: true,
					errorMessage: '请填写用户名',
				},
				{
					minLength: 8,
					maxLength: 16,
					errorMessage: '长度在 8 到 16 个字符'
				},
			]
		},
		password: {
			rules: [{
					required: true,
					errorMessage: '请填写密码',
				},
				{
					minLength: 8,
					maxLength: 16,
					errorMessage: '长度在 8 到 16 个字符'
				},
			]
		},
	})
	const registerbtn = ()=>{
		formRole.value.validate().then( async(res) => {
			let data =await reg({
				account:res.account,
				password:res.password
			})
			
			if(data.code=='200'){
				uni.showToast({
					title: '注册成功！',
					icon: 'success',
				})
				setTimeout(() => {
					uni.navigateTo({
						url: '/pages/login/index'
					})
				}, 1500)
			}else{
				uni.showToast({
					title: data.msg,
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
		position: relative;
		overflow: hidden;
	}

	.bg-decoration {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		pointer-events: none;
	}

	.circle {
		position: absolute;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.1);
		animation: float 6s ease-in-out infinite;
	}

	.circle-1 {
		width: 200rpx;
		height: 200rpx;
		top: 10%;
		right: -50rpx;
		animation-delay: 0s;
	}

	.circle-2 {
		width: 150rpx;
		height: 150rpx;
		bottom: 20%;
		left: -30rpx;
		animation-delay: 2s;
	}

	.circle-3 {
		width: 100rpx;
		height: 100rpx;
		top: 60%;
		right: 20%;
		animation-delay: 4s;
	}

	@keyframes float {
		0%, 100% {
			transform: translateY(0px);
		}
		50% {
			transform: translateY(-20px);
		}
	}

	.content {
		position: relative;
		z-index: 1;
		padding: 60rpx 40rpx;
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	.header {
		text-align: center;
		margin-bottom: 80rpx;
		margin-top: 60rpx;
	}

	.logo {
		margin-bottom: 40rpx;
	}

	.logo-icon {
		font-size: 120rpx;
		display: block;
	}

	.title-section {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.main-title {
		font-size: 48rpx;
		font-weight: bold;
		color: #ffffff;
		margin-bottom: 16rpx;
	}

	.sub-title {
		font-size: 28rpx;
		color: rgba(255, 255, 255, 0.8);
		font-weight: 300;
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
		margin-bottom: 30rpx;
	}

	::v-deep .uni-forms-item__label {
		font-size: 28rpx;
		font-weight: 600;
		color: #333333;
		margin-bottom: 16rpx;
	}

	::v-deep .uni-easyinput__content {
		background: #f8f9fa;
		border: 2rpx solid #e9ecef;
		border-radius: 12rpx;
		padding: 20rpx 24rpx;
		transition: all 0.3s ease;
	}

	::v-deep .uni-easyinput__content:focus-within {
		border-color: #667eea;
		background: #ffffff;
		box-shadow: 0 0 0 4rpx rgba(102, 126, 234, 0.1);
	}

	::v-deep .uni-easyinput__content-input {
		font-size: 30rpx;
		color: #333333;
	}

	::v-deep .uni-easyinput__placeholder {
		color: #999999;
		font-size: 28rpx;
	}

	.button-section {
		display: flex;
		flex-direction: column;
		gap: 24rpx;
		margin-bottom: 40rpx;
	}

	.register-btn {
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

	.register-btn:active {
		transform: translateY(2rpx);
		box-shadow: 0 4rpx 16rpx rgba(250, 112, 154, 0.3);
	}

	.back-btn {
		background: rgba(255, 255, 255, 0.2);
		border: 2rpx solid rgba(255, 255, 255, 0.3);
		border-radius: 50rpx;
		height: 80rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		backdrop-filter: blur(10px);
		transition: all 0.3s ease;
	}

	.back-btn:active {
		background: rgba(255, 255, 255, 0.3);
		transform: translateY(2rpx);
	}

	.btn-text {
		font-size: 32rpx;
		color: #ffffff;
		font-weight: 600;
	}

	.btn-text-secondary {
		font-size: 28rpx;
		color: #ffffff;
		font-weight: 500;
	}

	.footer-decoration {
		margin-top: auto;
		text-align: center;
		padding: 40rpx 0;
	}

	.footer-text {
		font-size: 24rpx;
		color: rgba(255, 255, 255, 0.6);
		font-weight: 300;
	}
</style>