import mongoose from "mongoose";
const scheema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  EmailActive: {
    type: Boolean,
    default: false,
  },
});
const model = mongoose.model("user", scheema);
export { model as user };
