<script setup lang="ts">
import { ref, onMounted } from 'vue'

import { useLanguageStore } from '@/stores/language'
import { boughtItemsRequest } from '@/requests/items'

import LabeledTextarea from '@/components/elements/LabeledTextarea.vue'

const props = defineProps<{
  itemId: string
}>()

const languageStore = useLanguageStore()

const changelog = ref<string>('')

function fetchChangelog() {
  boughtItemsRequest.getItemsIDChangelog(Number(props.itemId)).then((response) => {
    if (response.status == 200) {
      const data = response.data as Array<string>
      changelog.value = ''
      for (let i = 0; i < data.length; i++) {
        changelog.value += `${data[i]}\n`
      }
    }
  })
}

onMounted(() => fetchChangelog())
</script>

<template>
  <div class="scope">
    <div class="container">
      <LabeledTextarea
        class="text-area"
        :value="changelog"
        :placeholder="languageStore.l.boughtItem.changelog.changelog"
        :disabled="true"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.scope {
  width: 100%;
  height: 100%;
  cursor: default;
}

.container {
  padding: 10px;
  margin: 4px;
  padding-bottom: 20px;

  width: calc(100% - 27px);
  height: calc(100% - 30px);

  background-color: var(--main-background-color-accent-1);
  border-radius: var(--main-border-radius);
  overflow: hidden;
}

h1 {
  font-family: var(--main-font-head);
  font-size: var(--main-font-head-size);
  font-weight: bold;

  margin: 0;
  padding-top: 20px;
  padding-left: 20px;
  padding-bottom: 5px;
}
</style>
