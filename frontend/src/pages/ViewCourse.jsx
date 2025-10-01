import React, { useEffect } from "react";
import { FaArrowLeftLong, FaStar } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedCourseData } from "../redux/courseSlice";
import img1 from "../assets/empty.jpg";
const ViewCourse = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const { courseData, selectedCourseData } = useSelector(
    (state) => state.course
  );
  const dispatch = useDispatch();

  const fetchCourseData = async () => {
    courseData.map((course) => {
      if (course._id === courseId) {
        dispatch(setSelectedCourseData(course));
        console.log(selectedCourseData);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchCourseData();
  }, [courseData, courseId]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-6 relative">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row gap-6 ">
          {/* thumbnail */}
          <div className="w-full md:w-1/2">
            <FaArrowLeftLong
              className="text-[black] w-[22px] h-[22px] cursor-pointer"
              onClick={() => navigate("/")}
            />
            {selectedCourseData?.thumbnail ? (
              <img
                src={selectedCourseData?.thumbnail}
                alt="Course Thumbnail"
                className="rounded-xl w-full h-64 md:h-72 object-cover object-center"
              />
            ) : (
              <img
                src={img1}
                alt="Course Thumbnail"
                className="rounded-xl w-full h-64 md:h-72 object-cover object-center"
              />
            )}
          </div>
          {/* Course Info */}
          <div className="flex-1 space-y-2 mt-[20px]">
            <h1 className="text-2xl font-bold">{selectedCourseData?.title}</h1>
            <p className="text-gray-600">{selectedCourseData?.subTitle}</p>

            {/* Rating & Price */}
            <div className="flex items-start flex-col justify-between">
              <div className="text-yellow-500 font-medium flex gap-2">
                <span className="flex items-center justify-start gap-1">
                  <FaStar />5
                </span>{" "}
                <span className="text-gray-500">(1,200 Reviews)</span>
              </div>
              <div>
                <span className="text-lg font-semibold text-black">
                  {selectedCourseData?.price}
                </span>{" "}
                <span className="line-through text-sm text-gray-400">₹599</span>
              </div>
            </div>

            {/* Highlights */}
            <ul className="text-sm text-gray-700 space-y-1 pt-2">
              <li>✅ 10+ hours of video content</li>
              <li>✅ Lifetime access to course materials</li>
            </ul>
            <button className="bg-[black] text-white px-6 py-2 rounded hover:bg-gray-700 mt-3 cursor-pointer">
              Enroll Now
            </button>
          </div>
        </div>
        
         {/* What You'll Learn */}
         <div>
          <h2 className="text-xl font-semibold mb-2">What You’ll Learn</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li>Learn {selectedCourseData?.category} from Beginning</li>
          </ul>
        </div>

           {/* Requirements */}
           <div>
          <h2 className="text-xl font-semibold mb-2">Requirements</h2>
          <p className="text-gray-700">
            Basic programming knowledge is helpful but not required.
          </p>
        </div>

           {/* Who This Course Is For */}
           <div>
          <h2 className="text-xl font-semibold mb-2">Who This Course is For</h2>
          <p className="text-gray-700">
            Beginners, aspiring developers, and professionals looking to upgrade
            skills.
          </p>
        </div>
 

      </div>
    </div>
  );
};

export default ViewCourse;
