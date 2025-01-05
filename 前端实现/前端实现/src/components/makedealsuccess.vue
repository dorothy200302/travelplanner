<template>
  <var-result
      type="success"
      title="下单成功 "
      :description="`您的订单编号是 ${orderId},  ${d},祝您旅途愉快`"
      var-date-picker-color-cover=" rgba(255, 0.8)"

  >
    <template #footer>
      <var-button type="success">知道了</var-button>
    </template>
  </var-result>
</template>
<script setup>
defineProps({
  orderId: {
    type:    Number,
    default: '4'}
  })


</script>