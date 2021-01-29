const db = require("../models");
const Purchase = db.purchases;
const Op = db.Sequelize.Op;
const Pagination = require("../utils/pagination");

// Create and Save a new Purchases
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
  
  if (!req.body.cartsId) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  } else {
    // Carts ID 유무 체크
    const Cart = db.carts;
    Cart.findByPk(req.body.cartsId)
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

  if (!req.body.productsId) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  } else {
    // Products ID 유무 체크
    const Product = db.products;
    Product.findByPk(req.body.productsId)
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
  
  if (!req.body.productsOptionsId) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  } else {
    // ProductsOptions ID 유무 체크
    const ProductOption = db.productsOptions;
    ProductOption.findByPk(req.body.productsOptionsId)
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

  if (!req.body.thirdPartyUid) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }  

  if (!req.body.merchantUid) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  
  if (!req.body.method) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  
  if (!req.body.amount) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  
  if (!req.body.pgProvider) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  
  if (!req.body.pgId) {
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
  
  if (!req.body.customData) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  
  if (!req.body.purchasesAt) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  
  if (!req.body.receiptUrl) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  
  if (!req.body.applyNumber) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  if (!req.body.vbankNumber) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  
  if (!req.body.vbankName) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  
  if (!req.body.vbankHolder) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  
  if (!req.body.vbankDate) {
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
    
  // Create a Purchase
  const purchase = {
    usersId: req.body.usersId ? req.body.usersId : req.user.id,
    cartsId: req.body.cartsId,
    productsId: req.body.productsId,
    productsOptionsId: req.body.productsOptionsId,
    thirdPartyUid: req.body.thirdPartyUid,
    merchantUid: req.body.merchantUid,
    method: req.body.method,
    amount: req.body.amount,
    pgProvider: req.body.pgProvider,
    pgId: req.body.pgId,
    name: req.body.name,
    email: req.body.email,
    tel: req.body.tel,
    country: req.body.country,
    address: req.body.address,
    detailAddress: req.body.detailAddress,
    postcode: req.body.postcode,
    customData: req.body.customData,
    purchasesAt: req.body.purchasesAt,
    receiptUrl: req.body.receiptUrl,
    applyNumber: req.body.applyNumber,
    vbankNumber: req.body.vbankNumber,
    vbankName: req.body.vbankName,
    vbankHolder: req.body.vbankHolder,
    vbankDate: req.body.vbankDate,
    memo: req.body.memo,
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
