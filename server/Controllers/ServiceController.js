const Service = require("../Models/ServiceModel");
const fs = require("fs").promises;
const path = require("path");

const deleteFile = async (filePath) => {
    try {
        if (filePath) {
            const fileToDelete = path.join(__dirname, "..", filePath);
            await fs.access(fileToDelete); 
            await fs.unlink(fileToDelete); 
            console.log("Deleted file:", filePath);
        }
    } catch (err) {
        console.log("File not found or already deleted:", filePath);
    }
};

const createService = async (req, res) => {
    let serviceLogoPath = null;
    let serviceImagePath = null;

    try {
        const { serviceName, serviceHeading, serviceDetails, sericePrice, sericeFinalPrice, sericeDiscount ,dropDownStatus } = req.body;
        const errorMessage = [];

        // Validate inputs
        if (!serviceName) errorMessage.push("Service Name is required");
        if (!serviceHeading) errorMessage.push("Service Heading is required");
        if (!serviceDetails) errorMessage.push("Service Details are required");
        if (!sericePrice) errorMessage.push("Service Price is required");
        if (!sericeFinalPrice) errorMessage.push("Service Final Price is required");

        if (!req.files || !req.files.serviceLogo || !req.files.serviceImage) {
            errorMessage.push("Both Service Logo and Service Image are required");
        } else {
            serviceLogoPath = req.files.serviceLogo[0].path;
            serviceImagePath = req.files.serviceImage[0].path;
        }

        if (errorMessage.length > 0) {
            deleteFile(serviceLogoPath);
            deleteFile(serviceImagePath);

            return res.status(400).json({
                success: false,
                message: errorMessage.join(", ")
            });
        }

        const chnageUpperCase = serviceName.toUpperCase()

        const exitServiceName = await Service.findOne({ serviceName: chnageUpperCase })
        if (exitServiceName) {
            deleteFile(serviceLogoPath);
            deleteFile(serviceImagePath);
            return res.status(400).json({
                success: false,
                message: "This Service Name is already exits"
            })
        }

        // Create new service
        const newService = new Service({
            serviceName: chnageUpperCase,
            serviceHeading,
            serviceDetails,
            sericePrice,
            sericeFinalPrice,
            sericeDiscount,
            serviceLogo: serviceLogoPath,
            serviceImage: serviceImagePath,
            dropDownStatus: dropDownStatus || "False",
        });

        // Attempt to save the service
        await newService.save();
        console.log("Service saved successfully:", newService);

        res.status(200).json({
            success: true,
            message: "Service created successfully!",
            service: newService
        });
    } catch (error) {
        console.error("An error occurred, attempting to delete uploaded files...");
        deleteFile(serviceLogoPath);
        deleteFile(serviceImagePath);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

// Get Single Service by ID
const getService = async (req, res) => {
    try {
        const service = await Service.find();
        if (!service) {
            return res.status(404).json({
                success: false,
                message: "Service not found"
            });
        }
        const reverseData = service.reverse()
        res.status(200).json({
            success: true,
            data: reverseData
        });
    } catch (error) {
        console.error("Error fetching service:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};


// Get Single Service by ID
const getServiceById = async (req, res) => {
    const { id } = req.params;
    try {
        const service = await Service.findById(id);
        if (!service) {
            return res.status(404).json({
                success: false,
                message: "Service not found"
            });
        }
        res.status(200).json({
            success: true,
            data: service
        });
    } catch (error) {
        console.error("Error fetching service:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};


// Get Single Service by ID
const getServiceByName = async (req, res) => {
    const { name } = req.params;
    try {
        const service = await Service.findOne({ serviceName: name });
        if (!service) {
            return res.status(404).json({
                success: false,
                message: "Service not found"
            });
        }
        res.status(200).json({
            success: true,
            data: service
        });
    } catch (error) {
        console.error("Error fetching service:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

// Update Service
const updateService = async (req, res) => {
    const { id } = req.params;
    let serviceLogoPath = null;
    let serviceImagePath = null;
    try {
        const { serviceName, serviceHeading, serviceDetails, sericePrice, sericeFinalPrice, sericeDiscount, dropDownStatus } = req.body;
        const errorMessage = [];
        if (!serviceName) errorMessage.push("Service Name is required");
        if (!serviceHeading) errorMessage.push("Service Heading is required");
        if (!serviceDetails) errorMessage.push("Service Details are required");
        if (!sericePrice) errorMessage.push("Service Price is required");
        if (!sericeFinalPrice) errorMessage.push("Service Final Price is required");

        if (req.files) {
            if (req.files.serviceLogo) {
                serviceLogoPath = req.files.serviceLogo[0].path;
            }
            if (req.files.serviceImage) {
                serviceImagePath = req.files.serviceImage[0].path;
            }
        }
        const chnageUpperCase = serviceName.toUpperCase()

        const service = await Service.findById(id);
        if (!service) {
            return res.status(404).json({
                success: false,
                message: "Service not found"
            });
        }

        if (service.serviceName != chnageUpperCase) {
            const exitServiceName = await Service.findOne({ serviceName: chnageUpperCase })
            if (exitServiceName) {
                return res.status(400).json({
                    success: false,
                    message: "This Service Name is already exits"
                })
            }
        }

        // Update fields
        service.serviceName = chnageUpperCase || service.serviceName;
        service.serviceHeading = serviceHeading || service.serviceHeading;
        service.serviceDetails = serviceDetails || service.serviceDetails;
        service.sericePrice = sericePrice || service.sericePrice;
        service.sericeFinalPrice = sericeFinalPrice || service.sericeFinalPrice;
        service.sericeDiscount = sericeDiscount || service.sericeDiscount;
        service.dropDownStatus = dropDownStatus || service.dropDownStatus; // Update dropDownStatus if provided

        if (serviceLogoPath) {
            deleteFile(service.serviceLogo); // Delete the old logo
            service.serviceLogo = serviceLogoPath; // Set new logo path
        }

        if (serviceImagePath) {
            deleteFile(service.serviceImage); // Delete the old image
            service.serviceImage = serviceImagePath; // Set new image path
        }

        // Save updated service
        await service.save();
        console.log("Service updated successfully:", service);

        res.status(200).json({
            success: true,
            message: "Service updated successfully!",
            service
        });
    } catch (error) {
        console.error("An error occurred while updating the service:", error);
        if (req.files) {
            if (req.files.serviceLogo) await fs.unlink(req.files.serviceLogo[0].path);
            if (req.files.serviceImage) await fs.unlink(req.files.serviceImage[0].path);
        }
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

// Delete Service
const deleteService = async (req, res) => {
    const { id } = req.params;
    try {
        const service = await Service.findById(id);
        if (!service) {
            return res.status(404).json({
                success: false,
                message: "Service not found"
            });
        }
        deleteFile(service.serviceLogo);
        deleteFile(service.serviceImage);
        await Service.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "Service deleted successfully!"
        });
    } catch (error) {
        console.error("An error occurred while deleting the service:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};


const getarrowData = async(req,res)=>{
    try {
        const data = await Service.findOne({arrow:"True"})
        if(!data){
            return res.status(404).json({
                success:false,
                message:"REcord Not Found"
            })
        }
        res.status(200).json({
            success:true,
            message:"Record Found",
            data:data
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    createService, getService, getServiceById, updateService, deleteService, getServiceByName ,getarrowData
};
