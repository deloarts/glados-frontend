import { capitalizeFirstLetter } from './string.helper'
import type { AvailableOption } from '@/models/controls'

export function setOptionsFilter(values: Array<string>): Array<AvailableOption> {
  const temp = []
  temp.push({ text: 'All', value: null })
  for (let i = 0; i < values.length; i++) {
    temp.push({
      text: capitalizeFirstLetter(values[i]),
      value: values[i],
    })
  }
  return temp
}

export function setOptions(values: Array<string>): Array<AvailableOption> {
  const temp = []
  for (let i = 0; i < values.length; i++) {
    temp.push({
      text: capitalizeFirstLetter(values[i]),
      value: values[i],
    })
  }
  return temp
}
