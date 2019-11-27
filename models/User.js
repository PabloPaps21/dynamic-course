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
    token: String,
    telephone_number: {
      type: String,
      trim: true
    },
    credit: Number,
    inscrito: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
    catedra: [{
     type: Schema.Types.ObjectId,
     ref: 'User' 
    }]
  },
  {
    timestamps: true,
    versionKey: false
  }
);
 

userSchema.plugin(passportLocalMongoose, {usernameField: "email"});

module.exports = model("User", userSchema)