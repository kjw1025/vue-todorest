<template>
  <form action="" @submit.prevent="onSubmit">
    <div class="d-flex">
      <div class="flex-grow-1 mr-2">
        <input
          class="form-control"
          type="text"
          v-model="todo"
          placeholder="Type New Todo"
        />
      </div>
      <div>
        <button class="btn btn-primary" type="submit">Add</button>
      </div>
    </div>
    <div v-show="hasError" style="color: red">내용을 기재해 주세요.</div>
  </form>
</template>

<script>
import { ref } from "vue";
export default {
  emits: ["add-todo"],
  setup(props, { emit }) {
    // 빈 내용 입력 방지 hasError
    const hasError = ref(false);
    // 새로운 할일 데이터 todo
    const todo = ref("");
    // Todo 등록
    const onSubmit = () => {
      if (todo.value === "") {
        hasError.value = true;
      } else {
        hasError.value = false;
        emit("add-todo", {
          id: Date.now(),
          subject: todo.value,
          complete: false,
        });
      }
      todo.value = "";
    };
    return {
      onSubmit,
      hasError,
      todo,
    };
  },
};
</script>
