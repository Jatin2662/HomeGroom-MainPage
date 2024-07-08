

const Employee = require('../models/employeeNew');


const getEmployee = async (req, res, next)=>{

    try{
        const employeeData = await Employee.find();
        res.json(employeeData);
    } catch(error){
        res.status(500).json({ error: error.message });
    }
}

const deleteEmployee = async (req, res) => {
    const { id } = req.params; 

    try {
        console.log(`Attempting to delete employee with ID: ${id}`); 
        const deletedEmployee = await Employee.findByIdAndDelete(id);

        if (!deletedEmployee) {
            console.log(`Employee not found with ID: ${id}`);
            return res.status(404).json({ error: 'Employee not found' });
        }

        res.json({ message: 'Employee deleted successfully', deletedEmployee });
    } catch (error) {
        console.error('Error deleting employee:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}



exports.getEmployee = getEmployee;
exports.deleteEmployee = deleteEmployee;