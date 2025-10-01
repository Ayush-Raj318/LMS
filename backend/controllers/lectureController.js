import Lecture from "../models/lectureModel.js";
import Course from "../models/courseModel.js";
import uploadOnCloudinary from "../config/cloudinary.js";

const createLecture = async (req, res) => {
  try {
    const { lectureTitle } = req.body;
    const { courseId } = req.params;
    if (!lectureTitle || !courseId) {
      return res.status(400).json({ message: "Lecture title is required" });
    }
    const lecture = await Lecture.create({
      lectureTitle,
    });
    const course = await Course.findById(courseId);
    if (course) {
      course.lectures.push(lecture._id);
    }
    await course.populate("lectures");
    await course.save();
    return res.status(201).json({ lecture, course });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Failed to create lecture ${error}` });
  }
};

const getCourseLectures = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    await course.populate("lectures");
    return res.status(200).json({ lectures: course.lectures });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Failed to get course lectures ${error}` });
  }
};

const editLecture = async (req, res) => {
  try {
    const { lectureId } = req.params;
    const { isPreviewFree, lectureTitle } = req.body;
    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(404).json({ message: "Lecture not found" });
    }
    let videoUrl;
    if (req.file) {
      videoUrl = await uploadOnCloudinary(req.file.path);
      lecture.videoUrl = videoUrl;
    }
    if (lectureTitle) {
      lecture.lectureTitle = lectureTitle;
    }
    lecture.isPreviewFree = isPreviewFree;
    await lecture.save();
    return res.status(200).json(lecture);
  } catch (error) {
    return res.status(500).json({ message: `Failed to edit lecture ${error}` });
  }
};

const removeLecture = async (req, res) => {
  try {
    const { lectureId } = req.params;
    const lecture = await Lecture.findByIdAndDelete(lectureId);
    if (!lecture) {
      return res.status(404).json({ message: "Lecture not found" });
    }

    await Course.updateOne(
      { lectures: lectureId },
      { $pull: { lectures: lectureId } }
    );
    return res.status(200).json({ message: "Lecture Removed Successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Failed to remove Lectures ${error}` });
  }
};

export { createLecture, getCourseLectures, editLecture, removeLecture };
