<template>
  <div class="container">
    <h1>Todo Create</h1>
    <TodoForm />
  </div>
</template>

<script>
import TodoForm from "@/components/TodoForm.vue";
export default {
  components: {
    TodoForm,
  },
  setup() {
    return {};
  },
};
</script>

<style></style>
