import constants from "@/constants";
import { usersRequest } from "../requests/users";

const cacheKeyUsers = "gladosUsers";
const cacheKeyMe = "gladosUsersMe";

export class UsersService {
  cache: Map<any, any>;

  constructor() {
    this.cache = new Map();
  }

  getUsers() {
    console.log(
      "Users cache before response:",
      Array.from(this.cache.values()),
    );
    if (this.cache.has(cacheKeyUsers)) {
      const cachedUsers = this.cache.get(cacheKeyUsers);
      console.log("Using cache values before time check:", cachedUsers);

      if (Date.now() - cachedUsers.date.getTime() < constants.fetchUsersAfter) {
        console.log("Using cache values:", cachedUsers.users);
        return Promise.resolve(cachedUsers.users);
      }
    }
    return usersRequest.getUsers().then((users) => {
      this.cache.set(cacheKeyUsers, {
        users,
        date: new Date(),
      });
      console.log(
        "Users cache after response:",
        Array.from(this.cache.values()),
      );
      return users;
    });
  }

  clearCache() {
    this.cache.clear();
  }
}

export const usersService = new UsersService();
