import type { ItemStoreProtocol } from '@/protocols/itemStoreProtocol'

import { useNotificationStore } from '@/stores/notification'

export function updateSelectedTableElement(
  elementName: string,
  newValue: string | number | Date | null,
  currentValue: string | number | Date | null,
  updateMethod: Function,
  store: ItemStoreProtocol,
) {
  const notificationStore = useNotificationStore()
  const ids = store.getSelection()

  if (newValue == null || (ids.length == 1 && newValue == currentValue)) {
    return
  }

  let c = 0
  let confirmation = true

  if (ids.length > 1) {
    confirmation = confirm(
      `Do you want to change the ${elementName} of ${ids.length} items to '${newValue}'?`,
    )
  }
  if (confirmation) {
    for (let i = 0; i < ids.length; i++) {
      const id = ids[i]
      //@ts-ignore
      updateMethod(id, newValue).then((response) => {
        c++
        if (response.status != 200) {
          notificationStore.addWarn(response.data.detail)
        }
        if (c == ids.length) {
          store.getItems()
        }
      })
    }
  } else {
    store.getItems()
  }
}

export function getSelection(
  event: Event,
  id: number,
  index: number,
  lineIndex: number,
  store: ItemStoreProtocol,
): number {
  let tempSelectedItemIDs = JSON.parse(JSON.stringify(store.getSelection()))

  //@ts-ignore
  if (event.ctrlKey) {
    if (tempSelectedItemIDs.includes(id)) {
      tempSelectedItemIDs.splice(tempSelectedItemIDs.indexOf(id), 1)
    } else {
      tempSelectedItemIDs.push(id)
    }
  }
  //@ts-ignore
  else if (event.shiftKey) {
    const indexRange = []
    let highEnd = 0
    let lowEnd = 0
    tempSelectedItemIDs = []

    if (lineIndex > index) {
      highEnd = lineIndex + 1
      lowEnd = index + 1
    } else {
      highEnd = index + 1
      lowEnd = lineIndex + 1
    }
    let c = highEnd - lowEnd + 1
    while (c--) {
      indexRange[c] = highEnd--
    }
    for (let i = 0; i < indexRange.length; i++) {
      tempSelectedItemIDs.push(store.getItems()[indexRange[i] - 1].id)
    }
  } else if (!tempSelectedItemIDs.includes(id)) {
    tempSelectedItemIDs = [id]
  }

  lineIndex = index
  store.setSelection(tempSelectedItemIDs)

  return lineIndex
}
