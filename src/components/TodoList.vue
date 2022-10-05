<template>
  <div>
    <!-- <div v-for="(item, index) in todos" v-bind:key="index" class="card mt-2"> -->
    <ListView :items="todos">
      <template #default="{ item, index }">
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
              style="cusrsor: pointer"
              class="form-check-label"
              v-bind:class="{ todostyle: item.complete }"
              >{{ item.subject }}
            </label>
          </div>
          <div>
            <button class="btn btn-danger btn-sm" @click="openModal(item.id)">
              Delete
            </button>
          </div>
        </div>
      </template>
    </ListView>
    <!-- </div> -->

    <teleport to="#modal">
      <DeleteModal
        v-if="showModal"
        @close-modal="closeModal"
        @delete="onDelete"
        @close="closeModal"
      />
    </teleport>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import DeleteModal from "@/components/DeleteModal.vue";
import ListView from "@/components/ListView.vue";
export default {
  components: {
    DeleteModal,
    ListView,
  },
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

    // 모달 기능
    const showModal = ref(false);
    const deleteId = ref(null);
    const openModal = (id) => {
      deleteId.value = id;
      showModal.value = true;
    };
    const closeModal = () => {
      showModal.value = false;
    };
    const onDelete = () => {
      deleteTodo(deleteId.value);
      showModal.value = false;
    };
    return {
      deleteTodo,
      toggleTodo,
      moveToPage,

      showModal,
      openModal,
      closeModal,
      onDelete,
    };
  },
};
</script>

<style></style>
