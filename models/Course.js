const { model, Schema } = require("mongoose");

const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    category: {
      type: String,
      enum: ["Ciencia", "Arte", "Tecnología"]
    },
    creatorId:{
      type: Schema.Types.ObjectId,
      ref:"User"
    },
    studentId: {
      type: Schema.Types.ObjectId,
      ref:'User'
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
