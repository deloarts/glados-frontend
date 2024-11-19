import { usersRequest } from "@/requests/users";
import { useUserStore } from "@/stores/user";

export function setTheme(theme: "dark" | "light") {
  const userStore = useUserStore();
  usersRequest.putUsersMeTheme(theme).then((response) => {
    userStore.get();
    if (response.status == 200) {
      if (response.data.theme == "dark") {
        setDark();
      } else {
        setLight();
      }
    }
  });
}

export function getPreferredTheme() {
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    setTheme("dark");
  } else {
    setTheme("light");
  }
}

export function setDark() {
  document.documentElement.setAttribute("data-theme", "dark");
}

export function setLight() {
  document.documentElement.setAttribute("data-theme", "light");
}
