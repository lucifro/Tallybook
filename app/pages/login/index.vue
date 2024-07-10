<template>
	<view class="main">
		<view class="title">
			登录
		</view>
		<view class="example">
			<uni-forms ref="formRole" :modelValue="alignmentFormData" label-position="top" :rules="rulesviod">
				<uni-forms-item label="用户名" name="account">
					<uni-easyinput v-model="alignmentFormData.account" />
				</uni-forms-item>
				<uni-forms-item label="密码" name="password">
					<uni-easyinput v-model="alignmentFormData.password" />
				</uni-forms-item>
			</uni-forms>
		</view>
		<view class="main_buttom">
			<button type="primary" class="btn" @click="registerbtn">登录</button>
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
	import {login} from '@/api/index.js'
	const alignmentFormData = ref({
		account: '',
		password: '',
	})
	const formRole = ref(null);
	const rulesviod = ref({
		account: {
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
			let data =await login({
				account:res.account,
				password:res.password
			})
			console.log(data,'rtw');
			if(data.code=='200'){
				uni.setStorageSync('session',data.session)
				uni.navigateTo({
					url: '/pages/index'
				})
			}else{
				uni.showToast({
					title: data.msg,
					icon: 'error',
				})
			}
		})
	}
	
</script>

<style lang="scss" scoped>
	.main{
		padding:  0 30rpx 0 30rpx;
	}
	.title{
		padding-top: 20rpx;
		margin-bottom: 20rpx;
		font-size: 50rpx;
		height: 80rpx;
		border-bottom: 2rpx solid #f9f9f9;
	}
	.main_buttom{
		margin-top: 30rpx;
	}
	.btn{
		background-color: #347ab6;
	}
</style>