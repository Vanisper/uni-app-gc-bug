<script setup lang="ts">
import { onLaunch } from '@dcloudio/uni-app'

onLaunch(() => {})
</script>

<template>
    <wd-button>wot - 组件类型提示生效</wd-button>
    <view>uni-types - jsx组件类型提示生效</view>
    <!-- bugs -->
    <swiper>uni-types - 全局组件类型提示不生效</swiper>
    <CustomGCDemo demo="aaa">自定义 - 全局组件类型提示不生效</CustomGCDemo>
</template>

<style></style>
