import { Schema, model } from "mongoose";

const LanguageSchema = new Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const LanguageModel = model("Language", LanguageSchema);

export { LanguageModel };
