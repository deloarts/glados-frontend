import constants from "@/constants";
import { boughtItemsRequest } from "../requests/items";

const cacheKeyBoughtItems = "gladosBoughtItems";

export class BoughtItemsService {
  cache: Map<any, any>;

  constructor() {
    this.cache = new Map();
  }

  getItems(params: any) {
    console.log(
      "Items cache before response:",
      Array.from(this.cache.values()),
    );
    if (this.cache.has(cacheKeyBoughtItems)) {
      const cachedItems = this.cache.get(cacheKeyBoughtItems);
      console.log("Using cache values before time check:", cachedItems);

      if (
        Date.now() - cachedItems.date.getTime() <
        constants.fetchBoughtItemsAfter
      ) {
        console.log("Using cache values:", cachedItems.items);
        return Promise.resolve(cachedItems.items);
      }
    }
    return boughtItemsRequest.getItems(params).then((items) => {
      this.cache.set(cacheKeyBoughtItems, {
        items,
        date: new Date(),
      });
      console.log(
        "Items cache after response:",
        Array.from(this.cache.values()),
      );
      return items;
    });
  }

  clearCache() {
    this.cache.clear();
  }
}

export const boughtItemsService = new BoughtItemsService();
