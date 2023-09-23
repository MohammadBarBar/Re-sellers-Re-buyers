const expree = require("express");
const route = expree.Router();
const validateAndAssociate = require("../middlewares/validationMiddkeware"); // Import the middleware

// Create maps for reSellers, reBuyers, and reSellersRebuyers
const reSellers = [];
const reBuyers = [];
const reSellersRebuyers = [];

let newResellerRebuyer = {
  reSeller: "",
  reBuyer: [], // Create an array with the buyer name
};

// GET request
route.get("/ResellerRebuyers", (req, res) => {
  res.json({ userData: reSellersRebuyers });
});

// POST /ResellerRebuyers: Add a new ResellerRebuyer with validation
route.post(
  "/ResellerRebuyers",
  validateAndAssociate(reSellers, reBuyers),
  (req, res) => {
    try {
      const { Seller, Buyer, existingSeller } = req;
      // Add the ReSeller & ReBuyer to theier arrays if not already added
      if (!existingSeller) {
        reSellers.push(Seller);
        reBuyers.push(Buyer);

        newResellerRebuyer = {
          reSeller: Seller,
          reBuyer: [Buyer], // Create an array with the buyer name
        };

        reSellersRebuyers.push(newResellerRebuyer); // Add the newResellerRebuyer to the resellerBuyerPairs array
      } else {
        throw new Error(
          `ReSeller : ${Seller} is Already exist you need to create a new one!! You can add new buyers using update`
        );
      }
      res.status(200).json({ message: "Record Added Successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

route.post(
  "/ResellerRebuyers/:id",
  validateAndAssociate(reSellers, reBuyers),
  (req, res) => {
    try {
      const { Buyer } = req;
      const reSellerId = req.params.id;

      const getRecord = reSellersRebuyers.find(
        (reSellerRebuyer) => reSellerRebuyer.reSeller === reSellerId
      );

      if (!getRecord) {
        throw new Error(`ReSeller : ${reSellerId} Not Found !!`);
      } else {
        reBuyers.push(Buyer);
        const reSellerIndex = reSellersRebuyers.findIndex(
          (pair) => pair.reSeller === reSellerId
        );

        if (reSellerIndex !== -1) {
          // If the reseller exists in resellerBuyer, add the buyer to the reBuyer array
          reSellersRebuyers[reSellerIndex].reBuyer.push(Buyer);
        }
      }
      res
        .status(200)
        .json({ message: `ReSeller : ${reSellerId} Updated Successfully` });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

module.exports = route;
