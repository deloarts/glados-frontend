<script setup lang="ts">
import WarningForForm from '@/components/common/WarningForForm.vue'
import { useLanguageStore } from '@/stores/language'

const languageStore = useLanguageStore()
</script>

<template>
  <div class="scope">
    <div class="content">
      <h1>{{ languageStore.l.settings.license.banner }}</h1>
      <WarningForForm text="The license may change in future versions of Glados" />
      <div class="wrapper">
        <h2>MIT License</h2>
        <p>
          This version of Glados is licensed under the MIT License. Please refer to the
          corresponding repositories for more information.
        </p>
        <ul>
          <li>
            <a href="https://github.com/deloarts/glados-frontend?tab=MIT-1-ov-file" target="_blank"
              >Frontend License</a
            >
          </li>
          <li>
            <a href="https://github.com/deloarts/glados-backend?tab=MIT-1-ov-file" target="_blank"
              >Backend License</a
            >
          </li>
        </ul>

        <h2>Copyright</h2>
        <p>Copyright (c) 2024 Philip Delorenzo</p>

        <h2>Permission</h2>
        <p>
          Permission is hereby granted, free of charge, to any person obtaining a copy of this
          software and associated documentation files (the "Software"), to deal in the Software
          without restriction, including without limitation the rights to use, copy, modify, merge,
          publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons
          to whom the Software is furnished to do so, subject to the following conditions below.
        </p>

        <h2>Notice</h2>
        <p>
          The above copyright notice and this permission notice shall be included in all copies or
          substantial portions of the Software.
        </p>

        <h2>Disclaimer</h2>
        <p>
          THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
          INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
          PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
          FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
          OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
          DEALINGS IN THE SOFTWARE.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
a {
  color: var(--main-text-color);
}

h2 {
  font-size: 16px;
  font-family: var(--main-font-head);
}

.scope {
  width: 100%;
  height: 100%;
}

.wrapper {
  padding-left: 10px;
  max-width: 800px;
}

svg {
  color: var(--main-color);
  padding: 10px;
}
</style>
