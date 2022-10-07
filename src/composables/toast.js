import { computed } from "vue";
import { useStore } from "vuex";
export const useToast = () => {
  // vuex 접근 관리
  const store = useStore();
  // 안내상제에 보여지는 목록을 관리
  const toasts = computed(() => store.state.toast.toasts);
  // 안내상자 실행 메소드
  const triggerToast = (message, color) => {
    store.dispatch("toast/triggerToast", { message, color });
  };

  return {
    toasts,
    triggerToast,
  };
};
