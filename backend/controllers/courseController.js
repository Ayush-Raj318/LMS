import Course from "../models/courseModel.js";
import uploadOnCloudinary from "../config/cloudinary.js";
import User from "../models/userModel.js";

const createCourse = async (req, res) => {
  try {
    const { title, category } = req.body;
    if (!title || !category) {
      return res
        .status(400)
        .json({ message: "Title and category are required" });
    }
    const course = await Course.create({
      title,
      category,
      creator: req.userId,
    });
    return res.status(201).json(course);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error in creating course ${error}` });
  }
};

const getPublishedCourses = async (req, res) => {
  try {
    const courses = await Course.find({ isPublished: true }).populate("lectures reviews");
    if (!courses) {
      return res.status(400).json({ message: "No published courses found" });
    }
    return res.status(200).json(courses);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Failed to get isPublished courses ${error}` });
  }
};

const getCreatorCourses = async (req, res) => {
  try {
    const userId = req.userId;
    const courses = await Course.find({ creator: userId });
    if (!courses) {
      return res.status(400).json({ message: "No courses found" });
    }
    return res.status(200).json(courses);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Failed to get creator courses ${error}` });
  }
};

const editCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const {
      title,
      subTitle,
      description,
      category,
      level,
      price,
      isPublished,
    } = req.body;
    let thumbnail;
    if (req.file) {
      thumbnail = await uploadOnCloudinary(req.file.path);
    }
    let course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    const updateData = {
      title,
      subTitle,
      description,
      category,
      level,
      price,
      isPublished,
      thumbnail,
    };

    course = await Course.findByIdAndUpdate(courseId, updateData, {
      new: true,
    });
    return res.status(201).json(course);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Failed to update course ${error}` });
  }
};

const getCourseById = async (req, res) => {
  try {
    const { courseId } = req.params;
    let course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    return res.status(200).json(course);
  } catch (error) {
    return res.status(500).json({ message: `Failed to get course ${error}` });
  }
};

const removeCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    await course.deleteOne();
    return res.status(200).json({ message: "Course Removed Successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: `Failed to remove course ${error}` });
  }
};


const getCreatorById = async (req, res) => {
  try {
    const {userId} = req.body;

    const user = await User.findById(userId).select("-password"); // Exclude password

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json( user );
  } catch (error) {
    console.error("Failed to get creator:", error);
    return res.status(500).json({ message: "get Creator error" });
  }
};


export {
  createCourse,
  getPublishedCourses,
  getCreatorCourses,
  editCourse,
  getCourseById,
  removeCourse,
  getCreatorById,
};
