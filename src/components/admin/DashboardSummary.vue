<script setup>
defineProps({ waiting: Number, serving: String, completed: Number })
</script>

<template>
  <section class="card summary">
    <div><div class="lbl">WAITING</div><div class="val">{{ waiting }}</div></div>
    <div><div class="lbl">NOW SERVING</div><div class="val">{{ serving }}</div></div>
    <div><div class="lbl">COMPLETED</div><div class="val">{{ completed }}</div></div>
  </section>
</template>
