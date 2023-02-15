import axios from "axios";
import config from "../config.js";
import { usersRequest } from "../requests/users"

const cacheKeyUsers = "gladosUsers";
const cacheKeyMe = "gladosUsersMe";

export class UsersService {
  cache: Map<any, any>;

  constructor() {
    this.cache = new Map();
  }

  getUsers() {
    console.log("Users cache before response:", Array.from(this.cache.values()));
    if (this.cache.has(cacheKeyUsers)) {
      const cachedUsers = this.cache.get(cacheKeyUsers);
      console.log("Using cache values before time check:", cachedUsers);

      if ((Date.now() - cachedUsers.date.getTime()) < config.fetchUsersAfter) {
        console.log("Using cache values:", cachedUsers.users);
        return Promise.resolve(cachedUsers.users);
      }
    }
    return usersRequest.getUsers().then(users => {
      this.cache.set(cacheKeyUsers, {
        users,
        date: new Date(),
      });
      console.log("Users cache after response:", Array.from(this.cache.values()));
      return users;
    })
  }

  // getUsersMe() {
  //     console.log("UsersMe cache before response:", Array.from(this.cache.values()));
  //     if (this.cache.has(cacheKeyMe)) {
  //         const cachedUsersMe = this.cache.get(cacheKeyMe);
  //         console.log("Using cache values before time check:", cachedUsersMe);

  //         if ((Date.now() - cachedUsersMe.date.getTime()) < config.fetchBoughtItemsAfter) {
  //             console.log("Using cache values:", cachedUsersMe.usersMe);
  //             return Promise.resolve(cachedUsersMe.usersMe);
  //         }
  //     }
  //     return usersRequest.getUsersMe().then(usersMe => {
  //         this.cache.set(cacheKeyMe, {
  //             usersMe,
  //             date: new Date(),
  //         });
  //         console.log("UsersMe cache after response:", Array.from(this.cache.values()));
  //         return usersMe;
  //     })
  // }

  clearCache() {
    this.cache.clear();
  }
}

export const usersService = new UsersService();
