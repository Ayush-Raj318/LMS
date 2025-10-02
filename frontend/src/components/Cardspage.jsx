import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { SiViaplay } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import CourseCard from "./Card";

function Cardspage() {
  const [popularCourses, setPopularCourses] = useState([]);
  const { courseData } = useSelector((state) => state.course);

  const navigate = useNavigate();

  useEffect(() => {
    if (courseData?.length) {
      setPopularCourses(courseData.slice(0, 6));
    }
  }, [courseData]);

  return (
    <div className="flex items-center justify-center flex-col">
      <h1 className="md:text-[45px] text-[30px] font-semibold text-center mt-[30px] px-[20px]">
        Our Popular Courses
      </h1>

      <span className="lg:w-[50%] md:w-[80%] text-[15px] text-center mt-[30px] mb-[30px] px-[20px]">
        Explore top-rated courses designed to boost your skills, enhance
        careers, and unlock opportunities in tech, AI, business, and beyond.
      </span>

      {/* Course Cards Grid */}
      <div className="w-full flex items-center justify-center flex-wrap gap-[30px] lg:p-[50px] md:p-[30px] p-[10px] mb-[20px]">
        {popularCourses.map((course, index) => (
          <CourseCard
            key={index}
            id={course._id}
            thumbnail={course.thumbnail}
            title={course.title}
            price={course.price}
            category={course.category}
            reviews={course.reviews}
          />
        ))}
      </div>

      {/* View All Courses Button */}
      <button
        className="mt-6 mb-10 px-5 py-2 border-2 border-black bg-black text-white rounded-lg text-base lg:border-white font-light flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform"
        onClick={() => navigate("/allcourses")}
      >
        View all Courses
        <SiViaplay className="w-6 h-6 lg:w-7 lg:h-7 fill-white" />
      </button>
    </div>
  );
}

export default Cardspage;
