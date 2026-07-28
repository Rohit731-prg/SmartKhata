import getAIresponse from "../GenAI/genAI.js";
import DailyJournal from "../Models/DailyJurnalsModel.js";
import Product from "../Models/ProductModel.js";

export const create_journals = async (req, res) => {
  const { products } = req.body;
  if (!products || products.length == 0)
    return res.status(500).json({ message: "All details are require" });

  try {
    let total_amout_calculated = 0;
    for (const product of products) {
      let product_details = await Product.findById(product.product);
      if (!product_details)
        return res
          .status(404)
          .json({ message: `Product with id ${product.product} not found` });
      if (product_details.quantity_available < product.quantity)
        return res
          .status(400)
          .json({
            message: `Not enough quantity for product with id ${product.product.name}`,
          });
      console.log(product_details.quantity_available, product.quantity);
      await Product.findByIdAndUpdate(product.product, {
        $inc: { quantity_available: -product.quantity },
      });
      total_amout_calculated += product_details.price * product.quantity;
    }

    const newJournal = new DailyJournal({
      admin: req.admin,
      products: products,
      total_amout: total_amout_calculated,
    });
    await newJournal.save();
    return res.status(201).json({ message: "New jounal added..!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAllJounals = async (req, res) => {
  try {
    const journals = await DailyJournal.find({ admin: req.admin }).sort({
      createdAt: -1,
    });
    if (!journals || journals.length == 0)
      return res.status(400).json({ message: "No records found" });
    return res.status(200).json({ journals });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getJounalDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const jounals = await DailyJournal.findById(id);
    if (!jounals) return res.status(400).json({ message: "No records found" });

    let response = [];
    for (const journal of jounals.products) {
      console.log("journal: ", journal);
      const data = await Product.findById(journal.product).select(
        "product_name price type",
      );
      if (!data)
        return res
          .status(400)
          .json({ message: "Data missing from product list" });
      let obj = {
        product_details: data,
        quantity: journal.quantity,
      };
      response.push(obj);
    }

    return res.status(200).json({ response });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const getAiResponse = async (req, res) => {
  try {
    const now = new Date();
    const current_month = new Date(now.getFullYear(), now.getMonth());
    const previous_month = new Date(now.getFullYear(), now.getMonth() - 1);

    const transactions = await DailyJournal.find({
      createdAt: {
        $gte: previous_month,
        $lt: current_month,
      },
      admin: req.admin
    });

    let products_list = [];
    for (const products of transactions) {
      for (const product of products.products) {
        const product_details_info = await Product.findById(product.product);
        products_list.push({ product_details: product_details_info, quantity: product.quantity});
      }
    }

    if (products_list == []) return res.status(400).json({ message: "No Record found" });

    const response = await getAIresponse(products_list);
    console.log(response);
    return res.status(200).json({ response });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
