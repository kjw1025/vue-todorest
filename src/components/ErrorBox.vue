<template>
  <div class="red">
    {{ errtext }}
  </div>
</template>

<script>
export default {
  props: ["errtext"],
};
</script>

<style>
.red {
  color: red;
}
</style>
