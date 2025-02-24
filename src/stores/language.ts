import { ref, watch, onBeforeMount } from 'vue'
import { defineStore } from 'pinia'

import { usersRequest } from '@/requests/api/users'

import type { AvailableOption } from '@/models/controls'
import type { Language } from '@/models/language'
import type { UserSchema } from '@/schemas/user'

import { enGB } from '@/presets/language/en-gb'
import { deAT } from '@/presets/language/de-at'

export const useLanguageStore = defineStore('language', () => {
  const l = ref<Language>(enGB)
  const selected = ref<string>()
  const languageOptions = ref<Array<AvailableOption>>([
    { text: 'English', value: 'enGB' },
    { text: 'German', value: 'deAT' },
  ])

  function apply(lang: 'enGB' | 'deAT') {
    selected.value = lang
    if (lang == 'enGB') {
      l.value = enGB
      document.documentElement.lang = 'en'
    } else if (lang == 'deAT') {
      l.value = deAT
      document.documentElement.lang = 'de'
    } else {
      selected.value = 'enGB'
      l.value = enGB
      document.documentElement.lang = 'en'
    }
  }

  function set(lang: 'enGB' | 'deAT') {
    usersRequest.putUsersMeLanguage(lang).then((response) => {
      if (response.status == 200) {
        const data = response.data as UserSchema
        apply(data.language)
      }
    })
  }

  watch(
    selected,
    () => {
      localStorage.setItem('gladosSelectedLanguage', JSON.stringify(selected.value))
    },
    { deep: true },
  )

  onBeforeMount(() => {
    const lsSelected = localStorage.getItem('gladosSelectedLanguage')

    if (lsSelected != null) {
      selected.value = lsSelected
    } else {
      selected.value = 'enGB'
    }
    apply(selected.value)
  })

  return { l, languageOptions, set, apply }
})
