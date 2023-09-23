// Middleware to validate and associate Re-seller and Re-buyer
function validateAndAssociate(reSellers, reBuyers) {
  return (req, res, next) => {
    try {
      const { reSeller, reBuyer } = req.body;

      // Check if seller and buyer IDs are provided
      if (!reSeller || !reBuyer) {
        throw new Error("ReSeller and ReBuyer are required");
      }

      const ValuesofReSeller = reSeller.split(/\s*,\s*/); // Split using a regex with comma as the separator
      const ValuesofReBuyer = reBuyer.split(/\s*,\s*/); // Split using a regex with comma as the separator

      if (ValuesofReSeller.length > 1 || ValuesofReBuyer.length > 1) {
        throw new Error(`Please Enter one ReSeller & one ReBuyer per once !!`);
      }
      // Check if the seller and buyer IDs exist in their respective lists
      const existingSeller = reSellers.includes(reSeller);
      const existingBuyer = reBuyers.includes(reBuyer);

      if (existingBuyer) {
        throw new Error(`ReBuyer : ${reBuyer} is Already have a ReSeller`);
      }

      req.Seller = reSeller;
      req.Buyer = reBuyer;
      req.existingSeller = existingSeller;

      // Proceed to the next middleware or route handler
      next();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
}

module.exports = validateAndAssociate;
