import { Company } from "../models/companyModel.js";


export const register = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res.status(400).json({
        message: "Company name required",
        success: false,
      });
    }

    const company = await Company.findOne({ companyName });
    if (company) {
      return res.status(400).json({
        message: "Company already exists",
        success: false,
      });
    }

    const newCompany = await Company.create({
      companyName,
      userId: req.id,
    });

    return res.status(201).json({
      message: "New company created",
      success: true,
      company: newCompany,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const getCompany = async (req, res) => {
  try {
    const userId = req.id;
    console.log("User ID:", userId); // Debugging line

    const companies = await Company.find({ userId: userId }); // Find companies by userId
    console.log("Companies:", companies); // Debugging line

    if (!companies || companies.length === 0) {
      return res.status(404).json({
        message: "Companies not found",
        success: false,
      });
    }

    return res.status(200).json({
      companies,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching companies:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }

    return res.status(200).json({
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateCompany = async (req, res) => {
  try {
    const { companyName, location, website, description } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        message: "No file uploaded",
        success: false,
      });
    }

    // Construct the file URL for local storage
    const logo = `http://localhost:${process.env.PORT || 6000}/uploads/${file.filename}`;

    const updatedCompany = { companyName, location, website, description, logo };

    const company = await Company.findByIdAndUpdate(
      req.params.id,
      updatedCompany,
      { new: true }
    );
    

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Company data updated",
      success: true,
    });
  } catch (error) {
    console.error("Error updating company:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};