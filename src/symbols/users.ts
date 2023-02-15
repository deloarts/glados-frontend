import type { InjectionKey } from "vue";
import type { CurrentUserType } from "@/types/users";

export const currentUserKey: InjectionKey<CurrentUserType> = Symbol("currentUser");
