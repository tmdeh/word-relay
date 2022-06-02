import {atom} from "recoil"
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

const socketState = atom({
  key: "socket",
  default: null,
  effects_UNSTABLE: [persistAtom],
})

export default socketState;