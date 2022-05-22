const db = require("../models");
const Tutorial = db.tutorials;

// Create and Save a new Tutorial
exports.create = function (req,res) {
    if(!req.body.title) {
        res.status(400).send({
            message: 'Content can not be empty'
        });
        return;
    }
    //Create a Tutorial 
    const tutorial = new Tutorial({
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    });
    //Save Tutorial in the database
    tutorial.save(tutorial)
    .then(data => res.send(data))
    .catch(err => res.status(500).send({
        message: err.message || 'Some error occured while creating the Tutorial'
    }))
};
exports.findAll = function (req,res) {
    const title = req.query.title;
    //! ???
    //* This can use for getting all data or searching for the title 
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
    Tutorial.find(condition)
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some eror occurres while retrieving tutorials"
        })
    })

};
exports.findOne = function (req,res) {
    const id = req.params.id;
    Tutorial.findById(id)
    .then(data => {
        if(!data) {
            res.status(404).send({
                message: `Not found Tutorial with id ${id}`
            })
        }
        else {
            res.send(data);
        }
    })
    .catch(err => {
        res.status(500).send({
            message: `Error retrieving Tutorial with id ${id}`
        })
    })
};
exports.update = function (req,res) {
    if(!req.body) {
        return res.status(400).send({
            message: 'Data to update can not be empty'
        })
    }
    const id = req.params.id;
    Tutorial.findByIdAndUpdate(id,req.body,{ useFindAndModify: false})
    .then(data => {
        if(!data) {
            res.status(404).send({
                message: `Can not updata Tutorial with id = ${id}`
            })}
            else {
                res.send({
                    message: 'Tutorial was updated seccessfully'
                })
            }  
    })
    .catch(err => {
        res.status(500).send({
            message: `Error updating Tutorial with id= ${id}`
        })
    })
};
exports.delete = function (req,res) {
    const id = req.params.id;
    Tutorial.findByIdAndRemove(id)
    .then(data => {
        if(!data) {
            res.status(404).send({
                message: `Can not delete Tutorial , maybe can not find the Tutorial with id = ${id}`
            })
        }
        else {
            res.send({
                message: 'Tutorial was deleted successfully'
            })
        }
    })
    .catch(err => {
        res.status(500).send({
            message: 'Error while deleting the Tutorial'
        })
    })
};
exports.deleteAll = (req,res) => {
    Tutorial.deleteMany({})
    .then(data => {
        res.send({
            message: `${data.deletedCount} Tutorial was deleted successfully`
        })
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while removing all tutorials."
        })
    })
};
exports.findAllpublished = function (req,res) {
    Tutorial.find({published: true})
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving the data"
        })
    })
};

