const db = require("../models");
const ProductOption = db.productsOptions;
const Op = db.Sequelize.Op;
const Pagination = require("../utils/pagination");

// Create and Save a new ProductsOptions
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

  // Create a ProductOption
  const productOption = {
    usersId: req.user.id,
    title: req.body.title,
    content: req.body.content,
    ipAddress: req.headers["x-forwarded-for"] || req.connection.remoteAddress,
  };

  // Save ProductOption in the database
  ProductOption.create(productOption)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the ProductOption.",
      });
    });
};

// Retrieve all ProductsOptions from the database.
exports.findAll = (req, res) => {
  const { page, size, title } = req.query;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  const { limit, offset } = Pagination.getPagination(page, size);

  ProductOption.findAndCountAll({ where: condition, limit: limit, offset: offset })
    .then((data) => {
      const response = Pagination.getPagingData(data, page, limit);
      res.send(response);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving ProductsOptions.",
      });
    });
};

// Find a single ProductOption with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  ProductOption.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving ProductOption with id=" + id,
      });
    });
};

// Update a ProductOption by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  ProductOption.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        ProductOption.findByPk(id)
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message: "Error retrieving ProductOption with id=" + id,
            });
          });
      } else {
        res.send({
          message: `Cannot update ProductOption with id=${id}. Maybe ProductOption was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating ProductOption with id=" + id,
      });
    });
};

// Delete a ProductOption with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  ProductOption.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "ProductOption was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete ProductOption with id=${id}. Maybe ProductOption was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete ProductOption with id=" + id,
      });
    });
};

// Delete all ProductsOptions from the database.
exports.deleteAll = (req, res) => {
  ProductOption.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} ProductsOptions were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all productsOptions.",
      });
    });
};

// find all published ProductOption
exports.findAllPublished = (req, res) => {
  ProductOption.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving productsOptions.",
      });
    });
};
