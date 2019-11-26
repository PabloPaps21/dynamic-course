const { model, Schema } = require("mongoose");

const courseSchema = new Schema(
  {
    title: String,
    categoria: {
      type: String,
      enum: ["Ciencia", "Arte", "Tecnología"]
    },
    user_id:{
      type: Schema.Types.ObjectId,
      ref:"User"
    },
    description: String,
    fecha: String,
  }
);



module.exports = model("Course", courseSchema)
