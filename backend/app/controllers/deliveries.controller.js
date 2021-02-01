const db = require("../models");
const Delivery = db.deliveries;
const Op = db.Sequelize.Op;
const Pagination = require("../utils/pagination");

// Create and Save a new Deliveries
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
  if (!req.body.purchasesId) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  } else {
    // Products ID 유무 체크
    const Purchase = db.purchases;
    Purchase.findByPk(req.body.purchasesId)
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
  if (!req.body.country) {
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
  if (!req.body.courier) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  if (!req.body.trackingNumber) {
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

  // Create a Delivery
  const cart = {
    usersId: req.body.usersId ? req.body.usersId : req.user.id,
    purchasesId: req.body.purchasesId,
    name: req.body.name,
    email: req.body.email,
    tel: req.body.tel,
    country: req.body.country,
    address: req.body.address,
    detailAddress: req.body.detailAddress,
    postcode: req.body.postcode,
    courier: req.body.courier,
    trackingNumber: req.body.trackingNumber,
    memo: req.body.memo,
    ipAddress: req.headers["x-forwarded-for"] || req.connection.remoteAddress,
  };

  // Save Delivery in the database
  Delivery.create(cart)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Delivery.",
      });
    });
};

// Retrieve all Deliveries from the database.
exports.findAll = (req, res) => {
  const { page, size, title } = req.query;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  const { limit, offset } = Pagination.getPagination(page, size);

  Delivery.findAndCountAll({ where: condition, limit: limit, offset: offset })
    .then((data) => {
      const response = Pagination.getPagingData(data, page, limit);
      res.send(response);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Deliveries.",
      });
    });
};

// Find a single Delivery with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Delivery.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Delivery with id=" + id,
      });
    });
};

// Update a Delivery by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Delivery.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        Delivery.findByPk(id)
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message: "Error retrieving Delivery with id=" + id,
            });
          });
      } else {
        res.send({
          message: `Cannot update Delivery with id=${id}. Maybe Delivery was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Delivery with id=" + id,
      });
    });
};

// Delete a Delivery with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Delivery.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Delivery was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Delivery with id=${id}. Maybe Delivery was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Delivery with id=" + id,
      });
    });
};

// Delete all Deliveries from the database.
exports.deleteAll = (req, res) => {
  Delivery.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Deliveries were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all deliveries.",
      });
    });
};

// find all published Delivery
exports.findAllPublished = (req, res) => {
  Delivery.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving deliveries.",
      });
    });
};
