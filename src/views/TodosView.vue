<template>
  <div class="container">
    <h2>Todo 수정</h2>
    <TodoForm
      :editing="true"
      @update-todo="updateTodo"
      @update-load-fail="updateLoadFail"
      @update-todo-fail="updateTodoFail"
      @err-subject="errSubject"
    />
  </div>
</template>

<script>
import TodoForm from "@/components/TodoForm.vue";
export default {
  components: {
    TodoForm,
  },
  emits: [
    "update-todo-toast",
    "update-load-fail-toast",
    "update-todo-fail-toast",
    "err-subject-toast",
  ],
  setup(props, { emit }) {
    const updateTodo = () => {
      emit("update-todo-toast", {});
    };
    const updateLoadFail = () => {
      emit("update-load-fail-toast", {});
    };
    const updateTodoFail = () => {
      emit("update-todo-fail-toast", {});
    };
    const errSubject = () => {
      emit("err-subject-toast", {});
    };
    return {
      updateTodo,
      updateLoadFail,
      updateTodoFail,
      errSubject,
    };
  },
};
</script>

<style></style>
