import { atom, selector } from "recoil";

export const user = atom({
  key: "nickname",
  default: ""
})

export const getNickname = selector({
  key: "getNicknameSelector",
  get: ({get}) => {
    const nickname = get(user)
    return nickname;
  }
})