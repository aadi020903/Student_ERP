const Student_model = require('../models/student_model');

exports.view_student = async (req, res) => {
  try {
    // Extract filter parameters from the query string
    const filtername = req.query.filtername;
    const filtersid = req.query.filtersid;
    const filterclass = req.query.filterclass;

    // Trim white spaces from filter values
    const trimmedFiltername = filtername ? filtername.trim() : '';
    const trimmedFiltersid = filtersid ? filtersid.trim() : '';
    const trimmedFilterclass = filterclass ? filterclass.trim() : '';

    // Build the filter object based on the provided parameters
    const filter = {};
    if (trimmedFiltername) {
      filter.name = { $regex: new RegExp(trimmedFiltername, 'i') }; // Case-insensitive partial match
    }
    if (trimmedFiltersid) {
      filter.sid = { $regex: new RegExp(trimmedFiltersid, 'i') };
    }
    if (trimmedFilterclass) {
      filter.class = { $regex: new RegExp(trimmedFilterclass, 'i') };
    }

    // Apply the filter to the userModel.find() query
    let data = [];
    if (Object.keys(filter).length > 0) {
      // If at least one filter is provided, apply the filter
      data = await Student_model.find(filter);
    } else {
      // If no filters are provided, retrieve all users
      data = await Student_model.find();
    }

    // Check if filter parameters are present, and append them to the response
    const filterParams = {};
    if (trimmedFiltername) filterParams.filtername = trimmedFiltername;
    if (trimmedFiltersid) filterParams.filtersid = trimmedFiltersid;
    if (trimmedFilterclass) filterParams.filterclass = trimmedFilterclass;

    if (data) {
      return {
        message: "Data retrieved successfully",
        success: true,
        data: data,
        filterParams: filterParams, // Send filter parameters in the response
      };
    } else {
      return {
        message: "No data found",
        success: false,
        filterParams: filterParams, // Send filter parameters in the response
      };
    }
  } catch (error) {
    console.error("Error in view_student service:", error);
    return {
      message: "Internal server error",
      success: false,
    };
  }
};
