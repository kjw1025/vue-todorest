<template>
  <div>
    <div v-if="loading">Lading ...</div>
    <form v-else @submit.prevent="onSave">
      <div class="row">
        <!-- 제목 입력 및 수정 영역 -->
        <div class="col-6">
          <!-- <div class="form-group">
            <label>Todo Subject</label>
            <input type="text" class="form-control" v-model="todo.subject" />
            <div v-if="subjectError" style="color: red">{{ subjectError }}</div>
          </div> -->
          <InputView
            label="제목"
            :err="subjectError"
            v-model:subject="todo.subject"
            @update-subject="updateSubject"
          />
        </div>

        <!-- 내용 입력 및 수정 -->
        <div v-if="editing" class="col-6">
          <div class="form-group">
            <label>Status</label>
            <div>
              <button
                class="btn"
                :class="todo.complete ? 'btn-success' : 'btn-danger'"
                @click="toggleTodoState"
                type="button"
              >
                {{ todo.complete ? "완료" : "진행중" }}
              </button>
            </div>
          </div>
        </div>
        <!-- 내용 입력 -->
        <div class="col-12">
          <div class="form-group">
            <label>내용</label>
            <textarea
              v-model="todo.body"
              class="form-control"
              cols="30"
              rows="10"
            ></textarea>
          </div>
        </div>
      </div>

      <button class="btn btn-primary" type="submit" :disabled="todoState">
        {{ editing ? "Update" : "Add" }}
      </button>
      <button class="btn btn-outline-dark ml-2" @click="moveList">
        {{ editing ? "List" : "Cancel" }}
      </button>
    </form>
  </div>
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import { computed, ref } from "vue";
import axios from "@/api/axios";
import _ from "lodash";
import InputView from "@/components/InputView.vue";
import { useToast } from "@/composables/toast";
export default {
  components: {
    InputView,
  },
  props: {
    editing: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    // toast 기능 관련
    const { triggerToast } = useToast();

    const route = useRoute();
    const router = useRouter();
    // 데이터로딩 화면창 상태
    const loading = ref(false);
    const todo = ref({
      subject: "",
      complete: false,
      body: "",
    });
    // 원본 데이터 보관 및 비교(todo 객체) 용
    const originalTodo = ref(null);
    // 전달받은 id 를 이용해서 db 에서 자료를 가져온다.
    const getTodo = async () => {
      loading.value = true;
      try {
        const response = await axios.get(`todos/${route.params.id}`);
        todo.value = { ...response.data };
        originalTodo.value = { ...response.data };
        loading.value = false;
      } catch (err) {
        // emit("update-load-fail", {});
        triggerToast("내용을 가지고 오는데 실패하였습니다", "danger");
      }
    };
    if (props.editing) {
      getTodo();
    }

    const toggleTodoState = () => {
      todo.value.complete = !todo.value.complete;
    };
    const moveList = () => {
      router.push({
        name: "Todos",
      });
    };

    // 제목 미 입력시 경고
    const subjectError = ref("");

    const onSave = async () => {
      subjectError.value = "";
      if (!todo.value.subject) {
        subjectError.value = "제목을 입력하세요.";
        // emit("err-subject", {});
        triggerToast("제목을 입력하세요.", "danger");
        return;
      }
      try {
        let res;
        const data = {
          subject: todo.value.subject,
          complete: todo.value.complete,
          body: todo.value.body,
        };
        if (props.editing) {
          // 수정 axios 실행
          res = await axios.put(`todos/${todo.value.id}`, data);
          originalTodo.value = { ...res.data };
          // emit("update-todo", {});
          triggerToast("내용이 업데이트 되었습니다.", "success");
        } else {
          // 등록 axios 실행
          res = await axios.post(`todos`, data);
          todo.value.subject = "";
          todo.value.body = "";
          // emit("new-todo", {});
          triggerToast("새글이 등록 되었습니다.", "success");
          // 내용이 입력되었으므로 목록으로 보냄
          moveList();
        }
      } catch (err) {
        if (props.editing) {
          // emit("update-todo-fail", {});
          triggerToast("업데이트에 실패하였습니다", "danger");
        } else {
          // emit("new-todo-fail", {});
          triggerToast("새글 등록에 실패하였습니다", "danger");
        }
      }
    };

    const todoState = computed(() => {
      return _.isEqual(todo.value, originalTodo.value);
    });

    const updateSubject = (value) => {
      todo.value.subject = value;
    };

    return {
      todo,
      loading,
      toggleTodoState,
      moveList,
      onSave,
      todoState,
      subjectError,
      updateSubject,
    };
  },
};
</script>

<style></style>
