<template>
  <div class="container">
    <h2>Todo List</h2>
    <!-- 할일검색폼 -->
    <input
      class="form-control"
      type="text"
      v-model="searchText"
      placeholder="Search"
    />
    <!-- 할일입력 -->
    <TodoForm @add-todo="addTodo" style="margin-top: 20px" />
    <!-- 서버에러 출력 -->
    <div style="color: red">{{ error }}</div>
    <!-- 목록없음 안내 -->
    <div v-if="!todos.length">추가된 Todo가 없습니다.</div>
    <!-- 할일목록 -->
    <TodoList
      :todos="filterTodos"
      @delete-todo="deleteTodo"
      @toggle-todo="toggleTodo"
    />

    <!-- paginaiton -->
    <nav aria-label="Page navigation" style="margin-top: 20px">
      <ul class="pagination">
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li class="page-item"><a class="page-link" href="#">1</a></li>
        <li class="page-item"><a class="page-link" href="#">2</a></li>
        <li class="page-item"><a class="page-link" href="#">3</a></li>
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script>
import axios from "axios";
import { computed, ref } from "vue";
import TodoForm from "./components/TodoSimpleForm.vue";
import TodoList from "./components/TodoList.vue";
export default {
  components: {
    TodoForm,
    TodoList,
  },
  setup() {
    const todos = ref([]);

    // pagination 구현
    const totalCount = ref(0);
    const limit = 5;
    const totalPage


    const searchText = ref("");
    const filterTodos = computed(() => {
      if (searchText.value) {
        return todos.value.filter((todo) => {
          return todo.subject.includes(searchText.value);
        });
      }
      return todos.value;
    });

    const getTodo = async () => {
      try {
        const response = await axios.get("http://localhost:3000/todos");
        todos.value = response.data;
        totalCount.value = 0;
        page.value = 1;
        totalPage.value = 0
      } catch (err) {
        err.value = "서버목록 호출에 실패했습니다";
      }
    };
    getTodo();

    const error = ref("");
    const addTodo = async (todo) => {
      try {
        await axios.post("http://localhost:3000/todos", {
          subject: todo.subject,
          complete: todo.complete,
          id: todo.id,
        });
        todos.value.push(todo);
      } catch (err) {
        error.value = "목록추가 실패";
      }
    };
    const deleteTodo = async (index) => {
      try {
        const id = todos.value[index].id;
        await axios.delete("http://localhost:3000/todos/" + id);
        todos.value.splice(index, 1);
      } catch (error) {
        error.value = "삭제 요청이 거부되었습니다.";
      }
    };

    const toggleTodo = async (index) => {
      try {
        const id = todos.value[index].id;
        const complete = !todos.value[index].complete;
        await axios.patch("http://localhost:3000/todos/" + id, {
          complete,
        });
        todos.value[index].complete = complete;
      } catch (error) {
        error.value = "업데이트에 실패하였습니다.";
      }
    };

    return {
      todos,
      addTodo,
      deleteTodo,
      toggleTodo,
      searchText,
      filterTodos,
      error,
    };
  },
};
</script>
<style>
#app {
}
.todostyle {
  text-decoration: line-through;
  color: gray;
}
</style>
