const { model, Schema } = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");


const userSchema = new Schema (
  {
    email:{
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    username: {
      type:String,
      required: true,
    },
    status: {
      type:String,
      enum: ["Pending Confirmation","Active"],
      default: "Pending Confirmation"
    },
    credit: {
      type: Number,
      default: 10
    },
    inscrito: [{
      type: Schema.Types.ObjectId,
      ref: 'Course'
    }]
  },
  {
    timestamps: true,
    versionKey: false
  }
);
 

userSchema.plugin(passportLocalMongoose, {usernameField: "email"});

module.exports = model("User", userSchema)