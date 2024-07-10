<template>
	<view class="main">
		<view class="title">
			修改记录
		</view>
		<view class="example">
			<uni-forms ref="formRole" :modelValue="alignmentFormData" label-position="top" :rules="rulesviod">
				<uni-forms-item label="事项" name="title">
					<uni-easyinput v-model="alignmentFormData.title" />
				</uni-forms-item>
				<uni-forms-item label="发生时间" name="time">
					<uni-datetime-picker type="date" :clear-icon="true" v-model="alignmentFormData.time" />
				</uni-forms-item>
				<uni-forms-item label="类型" name="type">
					<uni-data-select v-model="alignmentFormData.type" :localdata="range"></uni-data-select>
				</uni-forms-item>
				<uni-forms-item label="金额" name="account">
					<uni-easyinput v-model="alignmentFormData.account" />
				</uni-forms-item>
				<uni-forms-item label="备注" name="remarks">
					<uni-easyinput v-model="alignmentFormData.remarks" />
				</uni-forms-item>
			</uni-forms>
		</view>
		<view class="main_buttom">
			<button type="primary" class="btn" @click="editbtn">修改</button>
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
				errorMessage: '请进行填写',
			}, ]
		},
		time: {
			rules: [{
				required: true,
				errorMessage: '请进行填写',
			}, ]
		},
		type: {
			rules: [{
				required: true,
				errorMessage: '请进行填写',
			}, ]
		},
		account: {
			rules: [{
				required: true,
				errorMessage: '请进行填写',
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
					title: data.msg,
					icon: 'error',
				})
			}
	}
	//修改数据
	const editbtn = () => {
		formRole.value.validate().then(async (res) => {
			if(alignmentFormData.value._id){
				console.log('我存在');
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
					uni.navigateTo({
						url: '/pages/index'
					})
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
</script>

<style lang="scss" scoped>
	.main {
		padding: 0 30rpx 0 30rpx;
	}

	.title {
		padding-top: 20rpx;
		margin-bottom: 20rpx;
		font-size: 50rpx;
		height: 80rpx;
		border-bottom: 2rpx solid #f9f9f9;
	}

	.main_buttom {
		margin-top: 30rpx;
	}

	.btn {
		background-color: #347ab6;
	}
	::v-deep .uni-date__x-input{
		margin-left: 10rpx;
	}
</style>