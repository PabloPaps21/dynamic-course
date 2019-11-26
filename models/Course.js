const { model, Schema } = require("mongoose");

const courseSchema = new Schema(
  {
    title: String,
    categoria: {
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
    fecha: String,
    reviews:[{
      type: Schema.Types.ObjectId,
      ref:'Review'
     }]  
  }
);



module.exports = model("Course", courseSchema)
