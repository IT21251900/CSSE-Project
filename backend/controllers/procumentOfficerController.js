const ProcurementOfficer = require("../models/ProcumentOfiicer");

// Create a Procurement Officer
const createProcurementOfficer = async (req, res) => {
  try {
    const { procumentOfficerID, procumentOfficerName } = req.body;
    const procurementOfficer = new ProcurementOfficer({
      procumentOfficerID,
      procumentOfficerName,
    });
    await procurementOfficer.save();
    res
      .status(201)
      .json({ message: "Procurement Officer created successfully" });
  } catch (error) {
    res
      .status(500)
      .json({
        error: "An error occurred while creating the Procurement Officer",
      });
  }
};

// Get all Procurement Officers
const allProcurementOfficers = async (req, res) => {
  try {
    const procurementOfficers = await ProcurementOfficer.find();
    res.status(200).json({ procurementOfficers });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching Procurement Officers" });
  }
};

// Get a single Procurement Officer by ID
const singleProcurementOfficer = async (req, res) => {
  try {
    const procurementOfficer = await ProcurementOfficer.findById(req.params.id);
    if (!procurementOfficer) {
      return res.status(404).json({ error: "Procurement Officer not found" });
    }
    res.status(200).json({ procurementOfficer });
  } catch (error) {
    res
      .status(500)
      .json({
        error: "An error occurred while fetching the Procurement Officer",
      });
  }
};

// Update a Procurement Officer
const editProcurementOfficer = async (req, res) => {
  try {
    const { procumentOfficerID, procumentOfficerName } = req.body;
    const procurementOfficer = await ProcurementOfficer.findById(req.params.id);
    if (!procurementOfficer) {
      return res.status(404).json({ error: "Procurement Officer not found" });
    }
    procurementOfficer.procumentOfficerID = procumentOfficerID;
    procurementOfficer.procumentOfficerName = procumentOfficerName;
    await procurementOfficer.save();
    res
      .status(200)
      .json({ message: "Procurement Officer updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({
        error: "An error occurred while updating the Procurement Officer",
      });
  }
};

// Delete a Procurement Officer
const deleteProcurementOfficer = async (req, res) => {
  try {
    const procurementOfficer = await ProcurementOfficer.findById(req.params.id);
    if (!procurementOfficer) {
      return res.status(404).json({ error: "Procurement Officer not found" });
    }
    await procurementOfficer.deleteOne();
    res
      .status(200)
      .json({ message: "Procurement Officer deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({
        error: "An error occurred while deleting the Procurement Officer",
      });
  }
};

module.exports = {
  createProcurementOfficer,
  allProcurementOfficers,
  singleProcurementOfficer,
  editProcurementOfficer,
  deleteProcurementOfficer,
};
