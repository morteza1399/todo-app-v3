import AppCircle from "@/components/AppCircle.vue";
import AppFilter from "@/components/AppFilter.vue";

export function registerAppComponents(app: any) {
  app.component("AppCircle", AppCircle).component("AppFilter", AppFilter);
}
