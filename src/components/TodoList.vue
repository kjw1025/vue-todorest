<template>
  <div>
    <div v-for="(item, index) in todos" v-bind:key="index" class="card mt-2">
      <div class="card-body p-2 d-flex">
        <div class="form-check flex-grow-1 align-items-center">
          <input
            type="checkbox"
            class="form-check-input"
            :checked="item.complete"
            @change="toggleTodo(index)"
          />
          <label
            @click="moveToPage(item.id)"
            class="form-check-label"
            v-bind:class="{ todostyle: item.complete }"
            >{{ item.subject }}
          </label>
        </div>
        <div>
          <button class="btn btn-danger btn-sm" @click="deleteTodo(index)">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
export default {
  props: ["todos"],
  emits: ["delete-todo", "toggle-todo"],
  setup(props, { emit }) {
    const deleteTodo = (index) => {
      emit("delete-todo", index);
    };
    const toggleTodo = (index) => {
      emit("toggle-todo", index);
    };

    const router = useRouter();
    const moveToPage = (id) => {
      // router 를 이용해서 id 를 전송해준다.
      // router.push(`/todos/${id}`);
      router.push({
        name: "Todo",
        params: {
          id,
        },
      });
    };
    return {
      deleteTodo,
      toggleTodo,
      moveToPage,
    };
  },
};
</script>

<style></style>
