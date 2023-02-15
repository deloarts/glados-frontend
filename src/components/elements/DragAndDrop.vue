<script lang="ts">
import Spinner from "@/components/spinner/LoadingSpinner.vue";

export default {
  name: "DragAndDrop",
  props: ["filetype", "filelist", "onUpload"],
  emits: ["update:filelist"],
  components: {
      Spinner
  },
  data() {
    return {
      uploading: false,
      text: "Drop the file here to upload it."
    };
  },
  mounted() {
  },
  methods: {
      onChange() {
          if (this.uploading) {
              alert('upload running, please wait');
          } else {
            this.uploading = true;
            this.text = "Uploading file ...";
            // @ts-ignore
            this.$emit("update:filelist", [...this.$refs.file.files]);
            this.onUpload();
          }
      },
      remove(i:any) {
          this.filelist.splice(i, 1);
      },
      dragover(event:any) {
          event.preventDefault();
      },
      dragleave(event:any) {
          event.preventDefault();
      },
      drop(event:any) {
        event.preventDefault();
          // @ts-ignore
          this.$refs.file.files = event.dataTransfer.files;
          this.onChange();
      },
  }
}
</script>

<template>
    <div class="drag-and-drop" @dragover="dragover" @dragleave="dragleave" @drop="drop" @click="
      //@ts-ignore
      $refs.file.click()">
        <div v-if="uploading">
            <spinner></spinner>
        </div>
        <div v-else>
            <input type="file" @change="onChange" ref="file" :accept="filetype" />
            <label class="block cursor-pointer">
                <div v-html="text"></div>
            </label>
        </div>
    </div>
</template>

<style scoped lang='scss'>
@import '@/assets/variables.scss';

.drag-and-drop {
    padding: 30px;
    margin: 0;

    text-align: center;

    border: 1px solid $main-color;
    border-radius: 0.25em;

    color: white;
    background: $main-background-color-dark;
    cursor: pointer;
    transition: background 0.2s ease;
}

.drag-and-drop:hover {
    background: $main-background-color-hover;
}

.drag-over {
    background: $main-background-color-hover;
}

.upload-area {
    cursor: pointer;
}

input {
    display: none;
}

label {
    cursor: pointer;
}

.underline {
    text-decoration: underline;
}
</style>