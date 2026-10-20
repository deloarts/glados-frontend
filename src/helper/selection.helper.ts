/* eslint-disable @typescript-eslint/no-unsafe-function-type */

import type { ItemStoreProtocol } from '@/protocols/itemStoreProtocol'

import { useNotificationStore } from '@/stores/notification'

export async function updateSelectedTableElement(
  elementName: string,
  newValue: string | number | Date | null,
  currentValue: string | number | Date | null,
  updateMethod: Function,
  store: ItemStoreProtocol,
) {
  const notificationStore = useNotificationStore()
  // Copy the selection, it may change while the updates are running
  const ids = [...store.getSelection()]

  if (newValue == null || (ids.length == 1 && newValue == currentValue)) {
    return
  }

  let confirmation = true

  if (ids.length > 1) {
    confirmation = confirm(
      `Do you want to change the ${elementName} of ${ids.length} items to '${newValue}'?`,
    )
  }
  if (confirmation) {
    // Update the items one after another: Sending all requests at once exhausts the
    // backend's db connections, which makes the requests fail without a response.
    for (const id of ids) {
      const response = await updateMethod(id, newValue).catch(() => undefined)
      if (response == undefined) {
        notificationStore.addWarn(`Failed to change the ${elementName} of item #${id}.`)
      } else if (response.status != 200) {
        notificationStore.addWarn(response.data.detail)
      }
    }
  }
  store.getItems()
}

export function getSelection(
  event: KeyboardEvent,
  id: number,
  index: number,
  lineIndex: number,
  store: ItemStoreProtocol,
): number {
  let tempSelectedItemIDs = JSON.parse(JSON.stringify(store.getSelection()))

  if (event.ctrlKey) {
    if (tempSelectedItemIDs.includes(id)) {
      tempSelectedItemIDs.splice(tempSelectedItemIDs.indexOf(id), 1)
    } else {
      tempSelectedItemIDs.push(id)
    }
  } else if (event.shiftKey) {
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
