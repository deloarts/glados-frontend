<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useClipboard } from '@vueuse/core'

import { useLanguageStore } from '@/stores/language'
import { useNotificationStore } from '@/stores/notification'

import IconCopy from '@/components/icons/IconCopy.vue'
import IconBellRing from '@/components/icons/IconBellRing.vue'
import IconLocked from '@/components/icons/IconLocked.vue'

const languageStore = useLanguageStore()
const notificationStore = useNotificationStore()

const source = ref('')
const { copy, copied, isSupported } = useClipboard({ source })

interface Props {
  number: number
  id?: number | null
  copyUrl?: string | null
  lockedIcon?: boolean
  bellIcon?: boolean
  width?: number
  fixedHeight?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  id: null,
  copyUrl: null,
  lockedIcon: false,
  bellIcon: false,
  fixedHeight: false,
})

const hover = ref<boolean>(false)

const cssWidth = computed<string>(() => {
  return String(props.width) + 'px'
})

async function copyToClipboard() {
  if (props.id != null && props.copyUrl != null) {
    copy(props.copyUrl)
  }
}

watch(copied, () => {
  if (copied.value === true) {
    notificationStore.addInfo(languageStore.l.notification.info.copiedUrlToClipboard)
  }
})
</script>

<template>
  <td
    @contextmenu.prevent="copyToClipboard()"
    @click="copyToClipboard()"
    @mouseover="hover = true"
    @mouseleave="hover = false"
    class="sticky"
  >
    <IconCopy v-if="hover && props.copyUrl != null && isSupported" class="copy-icon"></IconCopy>
    <IconLocked v-else-if="props.lockedIcon" class="locked-icon" />
    <IconBellRing v-else-if="props.bellIcon" class="bell-icon" />
    <div v-else v-bind:class="{ 'fix-height': props.fixedHeight }">
      {{ props.number }}
    </div>
  </td>
</template>

<style scoped lang="scss">
@use '@/scss/dataTable/tableItem.scss';

td {
  min-width: v-bind(cssWidth);
  max-width: v-bind(cssWidth);
  text-align: center;

  left: 0;
  z-index: 30;
}

.copy-icon {
  color: var(--main-text-color);
  height: 12px;
  width: 12px;
  vertical-align: middle;
}

.bell-icon {
  color: red;
  height: 12px;
  width: 12px;
  vertical-align: middle;
}

.locked-icon {
  color: orange;
  height: 12px;
  width: 12px;
  vertical-align: middle;
}
</style>
