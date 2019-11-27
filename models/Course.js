const { model, Schema } = require("mongoose");

const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    category: {
      type: String,
      enum: ["Ciencia", "Arte", "Tecnología"],
      default: "Ciencia"
    },
    authorId:{
      type: Schema.Types.ObjectId,
      ref:"User"
    },
    studentId: {
      type: Schema.Types.ObjectId,
      ref:'User'
    },
    imageURL: {
      type: String
    },
    description: String,
    date: String,
    reviews:[{
      type: Schema.Types.ObjectId,
      ref:'Review'
     }]  
  }
);



module.exports = model("Course", courseSchema)
