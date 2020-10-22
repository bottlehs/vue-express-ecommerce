const db = require("../models");
const Purchase = db.purchases;
const Op = db.Sequelize.Op;
const Pagination = require("../utils/pagination");

// Create and Save a new Purchases
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

  // Create a Purchase
  const purchase = {
    usersId: req.user.id,
    title: req.body.title,
    content: req.body.content,
    ipAddress: req.headers["x-forwarded-for"] || req.connection.remoteAddress,
  };

  // Save Purchase in the database
  Purchase.create(purchase)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Purchase.",
      });
    });
};

// Retrieve all Purchases from the database.
exports.findAll = (req, res) => {
  const { page, size, title } = req.query;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  const { limit, offset } = Pagination.getPagination(page, size);

  Purchase.findAndCountAll({ where: condition, limit: limit, offset: offset })
    .then((data) => {
      const response = Pagination.getPagingData(data, page, limit);
      res.send(response);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Purchases.",
      });
    });
};

// Find a single Purchase with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Purchase.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Purchase with id=" + id,
      });
    });
};

// Update a Purchase by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Purchase.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        Purchase.findByPk(id)
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message: "Error retrieving Purchase with id=" + id,
            });
          });
      } else {
        res.send({
          message: `Cannot update Purchase with id=${id}. Maybe Purchase was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Purchase with id=" + id,
      });
    });
};

// Delete a Purchase with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Purchase.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Purchase was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Purchase with id=${id}. Maybe Purchase was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Purchase with id=" + id,
      });
    });
};

// Delete all Purchases from the database.
exports.deleteAll = (req, res) => {
  Purchase.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Purchases were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all purchases.",
      });
    });
};

// find all published Purchase
exports.findAllPublished = (req, res) => {
  Purchase.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving purchases.",
      });
    });
};
