const db = require("../models");
const Address = db.addresses;
const Op = db.Sequelize.Op;
const Pagination = require("../utils/pagination");

// Create and Save a new Addresses
exports.create = (req, res, next) => {
  // Validate request
  if (req.body.usersId) {
    // Users ID 유무 체크
    const User = db.users;
    User.findByPk(req.body.usersId)
      .then((data) => {
        if (!data) {
          res.status(400).send({
            message: "Content can not be empty!",
          });
          return;
        }
      })
      .catch((err) => {
        res.status(400).send({
          message: "Content can not be empty!",
        });
        return;
      });
  }

  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  if (!req.body.email) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  if (!req.body.tel) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  if (!req.body.address) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  if (!req.body.detailAddress) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  if (!req.body.postcode) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  if (!req.body.memo) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  if (!req.body.status) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  if (!req.body.basic) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Address
  const addresses = {
    usersId: req.body.usersId ? req.body.usersId : req.user.id,
    title: req.body.title,
    name: req.body.name,
    email: req.body.email,
    tel: req.body.tel,
    country: req.body.country,
    address: req.body.address,
    detailAddress: req.body.detailAddress,
    postcode: req.body.postcode,
    memo: req.body.memo,
    status: req.body.status,
    basic: req.body.basic,
    ipAddress: req.headers["x-forwarded-for"] || req.connection.remoteAddress,
  };

  // Save Address in the database
  Address.create(addresses)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Address.",
      });
    });
};

// Retrieve all Addresses from the database.
exports.findAll = (req, res) => {
  const { page, size, title } = req.query;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  const { limit, offset } = Pagination.getPagination(page, size);

  Address.findAndCountAll({ where: condition, limit: limit, offset: offset })
    .then((data) => {
      const response = Pagination.getPagingData(data, page, limit);
      res.send(response);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Addresses.",
      });
    });
};

// Find a single Address with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Address.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Address with id=" + id,
      });
    });
};

// Update a Address by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Address.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        Address.findByPk(id)
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message: "Error retrieving Address with id=" + id,
            });
          });
      } else {
        res.send({
          message: `Cannot update Address with id=${id}. Maybe Address was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Address with id=" + id,
      });
    });
};

// Delete a Address with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Address.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Address was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Address with id=${id}. Maybe Address was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Address with id=" + id,
      });
    });
};

// Delete all Addresses from the database.
exports.deleteAll = (req, res) => {
  Address.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Addresses were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all addresses.",
      });
    });
};

// find all published Address
exports.findAllPublished = (req, res) => {
  Address.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving addresses.",
      });
    });
};
