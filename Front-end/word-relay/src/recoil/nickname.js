import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

const nicknameState = atom({
  key: "nickname",
  default: "",
  effects_UNSTABLE: [persistAtom],
})

export default nicknameState;