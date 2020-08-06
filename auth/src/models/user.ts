import mongoose, { Mongoose } from "mongoose";
import { Password } from "../services/password";
/*An interface that describe the properties that
are required to create an user*/
interface UserAttrs {
  email: String;
  password: String;
}
/*An interface that describe the properties that
a User model has.*/
interface UserModel extends mongoose.Model<any> {
  build(attrs: UserAttrs): UserDoc;
}
/*An interface that describe the properties that
a User document has.*/
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};
userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});
const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
