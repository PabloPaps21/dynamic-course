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
    photoURL: {
      type: String, 
      default: "https://microhealth.com/assets/images/illustrations/personal-user-illustration-@2x.png"
    },
    status: {
      type:String,
      enum: ["Pending Confirmation","Active"],
      default: "Pending Confirmation"
    },
    token: String,
    telephone_number: {
      type: String,
      trim: true
    },
    credit: Number,
    inscrito: [Schema.Types.ObjectId],
    catedra :[Schema.Types.ObjectId]
  },
  {
    timestamps: true,
    versionKey: false
  }
);


userSchema.plugin(passportLocalMongoose, {usersnameField: "email"});

module.exports = model("User", userSchema)