<template>
  <v-form ref="form" :disabled="isLoading" @submit.prevent="addTask()">
    <v-card
      prepend-icon="mdi-calendar-plus"
      :title="!task ? 'إضافة مهمة جديدة' : 'تعديل مهمة'"
      variant="tonal"
      :color="!task ? 'primary' : 'success'"
    >
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="newTask.title"
              label="العنوان"
              :rules="rules.title"
            />
          </v-col>
          <v-col cols="6" md="4">
            <v-select
              :items="priorities"
              v-model="newTask.priority"
              label="الأهمية"
              item-title="text"
              item-value="value"
              :rules="rules.priority"
              closable-chips
            >
              <template v-slot:item="{ props, item }">
                <v-list-item v-bind="props">
                  <template v-slot:prepend>
                    <v-icon
                      icon="mdi-circle"
                      :color="
                        item.raw.value === Priority.HEIGH
                          ? 'error'
                          : item.raw.value === Priority.MEDIUM
                          ? 'warning'
                          : 'success'
                      "
                    />
                  </template>
                </v-list-item>
              </template>
              <template v-slot:chip="{ props, item }">
                <v-chip v-bind="props" :text="item.raw.text">
                  <template v-slot:prepend>
                    <v-icon
                      icon="mdi-circle"
                      :color="
                        item.raw.value === Priority.HEIGH
                          ? 'error'
                          : item.raw.value === Priority.MEDIUM
                          ? 'warning'
                          : 'success'
                      "
                      class="me-1"
                    />
                  </template>
                </v-chip>
              </template>
            </v-select>
          </v-col>
          <v-col cols="6" md="2">
            <v-btn
              :color="!task ? 'primary' : 'success'"
              type="submit"
              :text="!task ? 'إضافة' : 'تحديث'"
              variant="flat"
              height="56"
              block
            />
          </v-col>
          <v-col cols="12">
            <v-expansion-panels
              :color="`${!task ? 'blue' : 'green'}-lighten-3`"
              :bg-color="`${!task ? 'blue' : 'green'}-lighten-5`"
              v-model="isAdvanced"
              variant="accordion"
            >
              <v-expansion-panel variant="tonal" :value="true">
                <v-expansion-panel-title>بيانات إضافية</v-expansion-panel-title>
                <v-expansion-panel-text>
                  <v-row>
                    <v-col cols="12">
                      <v-menu
                        v-model="dateMenu"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        lazy
                        transition="scale-transition"
                        min-width="328px"
                        offset-y
                      >
                        <template v-slot:activator="{ props }">
                          <v-text-field
                            v-model="displayedDate"
                            label="الحد الأقصى"
                            hint="MM/DD/YYYY"
                            persistent-hint
                            v-bind="props"
                            readonly
                            :on="dateMenu"
                            :rules="rules.deadline"
                          />
                        </template>
                        <v-card>
                          <v-card-text>
                            <v-date-picker
                              title="اختار أقصى موعد لتنفيذ المهمة"
                              v-model="newTask.deadline"
                              full-width
                              @update:model-value="
                                displayedDate = parseDate(newTask.deadline);
                                dateMenu = false;
                              "
                            />
                          </v-card-text>
                          <v-card-actions class="pa-7 pt-0">
                            <v-btn
                              :color="!task ? 'primary' : 'success'"
                              variant="tonal"
                              @click.stop.prevent="
                                newTask.deadline = new Date();
                                displayedDate = parseDate(newTask.deadline);
                                dateMenu = false;
                              "
                              text="اليوم"
                            />
                          </v-card-actions>
                        </v-card>
                      </v-menu>
                    </v-col>
                    <v-col cols="12">
                      <v-textarea
                        v-model="newTask.comment"
                        :rows="2"
                        maxlength="150"
                        :label="`ملاحظات${
                          newTask.comment
                            ? ` (${newTask.comment?.length ?? 0} / 150)`
                            : ''
                        }`"
                        :rules="rules.comment"
                      />
                    </v-col>
                  </v-row>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-form>
</template>

<script lang="ts">
import {
  Priority,
  type FromValidationRules,
  type PriorityOpion,
  type Task,
} from "@/types";
import { defineComponent, type PropType } from "vue";
import type { VForm } from "vuetify/components";

export default defineComponent({
  name: "EditTask",
  props: {
    task: {
      type: Object as PropType<Task | null>,
      default: null,
    },
  },
  data() {
    return {
      showAddDialog: false as boolean,
      Priority,
      newTask: {
        id: this.task?.id,
        title: this.task?.title,
        priority: this.task?.priority,
        deadline: this.task?.deadline,
        comment: this.task?.comment,
      } as Task,
      priorities: [
        { value: Priority.HEIGH, text: "مرتفع" },
        { value: Priority.MEDIUM, text: "متوسط" },
        { value: Priority.LOW, text: "منخفض" },
      ] as PriorityOpion[],
      isAdvanced: false as boolean,
      rules: {
        title: [
          (v) => !!v || "العنوان مطلوب",
          (v: string) => v.length >= 3 || "طول النص يجب أن لا يقل عن 3 أحرف",
          (v: string) => v.length <= 20 || "طول النص يجب أن لا يزيد عن 20 أحرف",
        ],
        priority: [(v) => !!v || "الأهمية مطلوبة"],
        deadline: [
          (v) => !!v || "الحد الأقصى مطلوب",
          (v: any) => {
            return (
              !v ||
              Date.parse(`${v} 23:59:59.99999`) >= Date.now() ||
              "الحد الأقصى يجب أن يكون فى المستقبل"
            );
          },
        ],
        comment: [
          (v: string | null) =>
            !v || v.length <= 150 || "طول النص يجب أن لا يزيد عن 150 أحرف",
        ],
      } as FromValidationRules,
      dateMenu: false as boolean,
      displayedDate: null as string | null,
      isLoading: false as boolean,
    };
  },
  methods: {
    addTask(): void {
      this.isLoading = true;
      (this.$refs.form as VForm).validate().then((response) => {
        if (response.valid) {
          if (!!this.task) {
            console.log("Edit task", { ...this.newTask });
          } else {
            console.log("Create task", { ...this.newTask });
          }
        }
        this.isLoading = false;
      });
    },
    parseDate(date: Date | null | undefined): string | null {
      if (!date) {
        return null;
      }

      const yyyy: string = date.getFullYear().toString();
      const month: number = date.getMonth() + 1;
      const day: number = date.getDate();

      const mm: string = month < 10 ? "0" + month : month.toString();
      const dd: string = day < 10 ? "0" + day : day.toString();

      return `${mm}/${dd}/${yyyy}`;
    },
  },
});
</script>

<style lang="scss"></style>
