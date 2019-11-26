const { model, Schema } = require ("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');

const reviewSchema = new Schema (
  {
    descripcion: String,
    studentId: {
      type: Schema.Types.ObjectId,
      ref:"User"
    },
    claseId: {
      type: Schema.Types.ObjectId,
      ref: "Course"
    },
    calificacion: Number
  }
);

module.exports = model("Review", reviewSchema)