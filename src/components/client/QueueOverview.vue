<script setup>
defineProps({
  nowServing: { type: Object, default: null },
  next: { type: Object, default: null },
  total: { type: Number, default: 0 }
})
</script>

<template>
  <div class="ov">
    <div class="ov-now">
      <div class="lbl">NOW SERVING</div>
      <template v-if="nowServing">
        <div class="big">{{ nowServing.queueNumber }}</div>
        <div class="nm">{{ nowServing.name }}</div>
        <div class="sub">ID: {{ nowServing.studentId }}</div>
      </template>
      <div v-else class="sub" style="padding:1rem 0">No one is being served yet.</div>
    </div>
    <div class="ov-side">
      <div>
        <div class="lbl">NEXT IN QUEUE</div>
        <div v-if="next" class="val">{{ next.queueNumber }} — {{ next.name }}</div>
        <div v-else class="sub">The queue is empty.</div>
      </div>
      <div>
        <div class="lbl">TOTAL WAITING</div>
        <div class="num">{{ total }}</div>
      </div>
    </div>
  </div>
</template>
