<script setup lang="ts">
import { computed } from "vue"

interface Props {
  value: boolean | number | string | Date | null
  placeholder: string
  type?: string
  required?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  required: false,
  disabled: false
})

const placeholderText = computed<string>(() => {
  return props.required ? `${props.placeholder} *` : `${props.placeholder}`
})

</script>

<template>
  <div class="scope">
    <p>
      <input :value="props.value" :type="props.type" :disabled="props.disabled" />
      <span>{{ placeholderText }} </span>
    </p>
  </div>
</template>

<style scoped lang="scss">

.scope {
  width: 100%;
  height: 100%;
}

p {
  width: 100%;
  height: 100%;

  position: relative;
  display: inline-block;

  border: none;
  padding: 0;
  margin: 0;
}

span {
  width: max-content;
  height: min-content;

  padding: 2px;
  padding-left: 8px;
  padding-right: 8px;
  margin: 0;

  pointer-events: none;
  position: absolute;

  left: 0px;
  top: 1px;

  border: none;
  border-radius: var(--main-border-radius);

  transition: 0.2s;
  transition-timing-function: ease;
  transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);

  color: white;
  background-color: var(--main-color);
  font-family: var(--main-font-head);
  font-size: 12px;
}

input {
  width: calc(100% - 15px);
  height: calc(100% - 15px);

  color: var(--main-text-color);
  background-color: var(--input-background);

  padding: 0;
  padding-left: 10px;
  padding-right: 10px;

  margin: 0;
  margin-top: 15px;
  margin-left: 10px;

  box-sizing: border-box;
  border-width: var(--main-border-width);
  border-style: var(--main-border-style);
  border-color: var(--input-border-color);
  border-radius: var(--main-border-radius);
  outline: none;

  transition: all 0.2s ease;
}

input:hover {
  background-color: var(--main-background-color-hover);
}

input:focus {
  border-color: var(--main-color);
}

// input:focus + label, input:not(:placeholder-shown) + label {
//   opacity:1;
//   transform: scale(0.75) translateY(-70%) translateX(-14px);
// }


// .scope {
//   width: 300px;
//   height: 50px;
//   margin: 100px auto;
//   outline: none;
//   position: relative;
//   background: #EEE;
// }

// .scope input {
//   width: 100%;
//   height: 100%;
//   border: none;
//   color: #333333;
//   padding-left: 10px;
//   font-family: tahoma;
//   font-size: 17px;
//   outline: none;
// }

// .scope .place {
//   position: absolute;
//   background: #FFF;
//   color: #AAA;
//   transition: 0.2s ease;
//   top: 14px;
//   left: 6px;
//   border-radius: 3px;
//   padding: 2px;
// }

// input:focus + .place {
//   top: -10px;
//   background: #c0392b;
//   font-size: 14px;
//   color: #fff;
// }

// .scope .bor {
//   display: block;
//   width: 0;
//   height: 3px;
//   background: #c0392b;
//   margin: auto;
//   transition: 0.2s ease;
// }

// input:focus ~ .bor {
//   width: 100%;
// }
</style>