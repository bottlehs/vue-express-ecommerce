const db = require("../models");
const Cart = db.carts;
const Op = db.Sequelize.Op;
const Pagination = require("../utils/pagination");

// Create and Save a new Carts
exports.create = (req, res, next) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  if (!req.body.content) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Cart
  const cart = {
    usersId: req.user.id,
    title: req.body.title,
    content: req.body.content,
    ipAddress: req.headers["x-forwarded-for"] || req.connection.remoteAddress,
  };

  // Save Cart in the database
  Cart.create(cart)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Cart.",
      });
    });
};

// Retrieve all Carts from the database.
exports.findAll = (req, res) => {
  const { page, size, title } = req.query;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  const { limit, offset } = Pagination.getPagination(page, size);

  Cart.findAndCountAll({ where: condition, limit: limit, offset: offset })
    .then((data) => {
      const response = Pagination.getPagingData(data, page, limit);
      res.send(response);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Carts.",
      });
    });
};

// Find a single Cart with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Cart.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Cart with id=" + id,
      });
    });
};

// Update a Cart by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Cart.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        Cart.findByPk(id)
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message: "Error retrieving Cart with id=" + id,
            });
          });
      } else {
        res.send({
          message: `Cannot update Cart with id=${id}. Maybe Cart was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Cart with id=" + id,
      });
    });
};

// Delete a Cart with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Cart.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Cart was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Cart with id=${id}. Maybe Cart was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Cart with id=" + id,
      });
    });
};

// Delete all Carts from the database.
exports.deleteAll = (req, res) => {
  Cart.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Carts were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all carts.",
      });
    });
};

// find all published Cart
exports.findAllPublished = (req, res) => {
  Cart.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving carts.",
      });
    });
};
