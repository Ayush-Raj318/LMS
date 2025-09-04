import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./userSlice"

import lectureSlice from "./lectureSlice"
import reviewSlice from "./reviewSlice"
import courseSlice from "./courseSlice"
const store = configureStore({
    reducer:{
        user:userSlice,
        course:courseSlice,
        lecture:lectureSlice,
        review:reviewSlice
    }
})

export default store;