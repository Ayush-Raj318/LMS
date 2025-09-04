import axios from "axios";
import { serverUrl } from "../App.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setCourseData } from "../redux/courseSlice.js";

const getPublishedCourse = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    const getAllPublishedCourse = async () => {
      try {
        const result = await axios.get(serverUrl + "/api/course/getpublished", {
          withCredentials: true,
        });
        console.log(result.data);
        dispatch(setCourseData(result.data));
      } catch (error) {
        console.log(error);
      }
    };
    getAllPublishedCourse();
  }, []);
};

export default getPublishedCourse;
