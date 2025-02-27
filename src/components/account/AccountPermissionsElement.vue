<script setup lang="ts">
import IconCheck from '@/components/icons/IconCheck.vue'
import IconClose from '@/components/icons/IconClose.vue'

interface Props {
  text: string
  allowed: boolean
}
const props = withDefaults(defineProps<Props>(), {})

</script>

<template>
  <div class="form-base-scope">
    <div class="form-base-container">
      <div class="grid">
        <div class="grid-area-icon grid-item-center">
          <IconCheck v-if="props.allowed" class="icon allowed" />
          <IconClose v-else class="icon forbidden" />
        </div>
        <div class="grid-area-text grid-item-left">
          <span>{{ props.text }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/scss/form/formBase.scss';
@use '@/scss/grid/gridBase.scss';

.form-base-scope {
  margin-bottom: 10px;
}

.form-base-container {
  padding: 0;
  margin: 0;
}

.grid {
  grid-template-rows: 40px;
  grid-template-columns: 50px auto;
  grid-template-areas: 'grid-area-icon grid-area-text';
}

.grid-area-icon {
  grid-area: grid-area-icon;
}

.grid-area-text {
  grid-area: grid-area-text;
}

.icon {
  width: 20px;
  height: 20px;
}

.allowed {
  color: var(--main-green)
}

.forbidden {
  color: var(--main-red)
}
</style>
