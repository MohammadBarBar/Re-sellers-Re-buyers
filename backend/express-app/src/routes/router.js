const expree = require("express");
const route = expree.Router();
const validateAndAssociate = require("../middlewares/validationMiddkeware"); // Import the middleware

// Create maps for reSellers, reBuyers, and reSellersRebuyers
// const reSellers = [];
// const reBuyers = [];

let newResellerRebuyer = {
  reSeller: "",
  reBuyer: [], // Create an array with the buyer name
};
var reSellersRebuyers = [];

// GET request
route.get("/ResellerRebuyers", (req, res) => {
  res.json({ userData: reSellersRebuyers });
});

// POST /ResellerRebuyers: Add a new ResellerRebuyer with validation
route.post(
  "/ResellerRebuyers",
  validateAndAssociate(reSellersRebuyers),
  (req, res) => {
    try {
      const { Seller, Buyer, existingSeller, existingBuyerIndex } = req;

      if (existingBuyerIndex !== -1) {
        throw new Error(`ReBuyer : ${Buyer} is Already have a ReSeller`);
      }
      // Add the ReSeller & ReBuyer to theier arrays if not already added
      if (!existingSeller) {
        newResellerRebuyer = {
          reSeller: Seller,
          reBuyer: [Buyer], // Create an array with the buyer name
        };

        reSellersRebuyers.push(newResellerRebuyer); // Add the newResellerRebuyer to the resellerBuyerPairs array
      } else {
        const updatedReSeller = { ...existingSeller };

        // Add the new reBuyer to the reBuyer array of the cloned reSeller
        updatedReSeller.reBuyer.push(Buyer);

        // Update the original array with the cloned and updated reSeller object
        reSellersRebuyers = reSellersRebuyers.map((entry) =>
          entry.reSeller === Seller ? updatedReSeller : entry
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
  validateAndAssociate(reSellersRebuyers),
  (req, res) => {
    try {
      const { Buyer, existingBuyerIndex } = req;
      const reSellerId = req.params.id;

      const destinationReSellerIndex = reSellersRebuyers.findIndex(
        (pair) => pair.reSeller === reSellerId
      );
      console.log(reSellersRebuyers);
      console.log(existingBuyerIndex);
      // Check if both source and destination reSellers are found
      if (destinationReSellerIndex !== -1 && existingBuyerIndex !== -1) {
        const reBuyerIndexInSource =
          reSellersRebuyers[existingBuyerIndex].reBuyer.indexOf(Buyer);

        // Check if the reBuyer is found in the source reSeller's reBuyer array
        if (reBuyerIndexInSource !== -1) {
          // Add the reBuyer to the destination reSeller's reBuyer array
          reSellersRebuyers[destinationReSellerIndex].reBuyer.push(Buyer);

          // Remove the reBuyer from the source reSeller's reBuyer array
          reSellersRebuyers[existingBuyerIndex].reBuyer.splice(
            reBuyerIndexInSource,
            1
          );
          console.log(reSellersRebuyers);
        }
      } else {
        throw new Error(`ReSeller : ${reSellerId} Not Found !!`);
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
