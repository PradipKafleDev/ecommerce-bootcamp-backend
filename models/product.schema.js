import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please provide a product name"],
      trim: true,
      maxLength: [120, "Product name should be max of 120 characters"],
    },
    price: {
      type: Number,
      required: [true, "please provide a product price"],
      maxLength: [5, "Product price should not be more thatn 5 digit"],
    },
    description: {
      type: String,
      //use some form of editor - personal assignment
    },
    photos: [
      {
        secure_url: {
          type: String,
          required: true,
        },
      },
    ],
    stock: {
      type: Number,
      default: 0,
    },
    sold: {
      type: Number,
      default: 0,
    },
    //Each product should be part of collection or category
    collectionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Collection",
    },
  },
  { timestamps: true }
);
export default mongoose.model("Product", productSchema);
