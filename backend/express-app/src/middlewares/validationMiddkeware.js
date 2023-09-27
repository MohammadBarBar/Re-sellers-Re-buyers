// Middleware to validate and associate Re-seller and Re-buyer
function validateAndAssociate(reSellersRebuyers) {
  return (req, res, next) => {
    try {
      const { reSeller, reBuyer } = req.body;

      const ValuesofReSeller = reSeller.split(/\s*,\s*/); // Split using a regex with comma as the separator
      const ValuesofReBuyer = reBuyer.split(/\s*,\s*/); // Split using a regex with comma as the separator

      if (ValuesofReSeller.length > 1 || ValuesofReBuyer.length > 1) {
        throw new Error(`Please Enter one ReSeller & one ReBuyer per once !!`);
      }
      const existingSeller = reSellersRebuyers.find(
        (entry) => entry.reSeller === reSeller
      );
      const existingBuyerIndex = reSellersRebuyers.findIndex((entry) =>
        entry.reBuyer.includes(reBuyer)
      );

      req.Seller = reSeller;
      req.Buyer = reBuyer;
      req.existingSeller = existingSeller;
      req.existingBuyerIndex = existingBuyerIndex;

      // Proceed to the next middleware or route handler
      next();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
}

module.exports = validateAndAssociate;
