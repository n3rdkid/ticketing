import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";
import request from "supertest";
// If any errors occurs set signIn:Promise<string[]>
declare global {
  namespace NodeJS {
    interface Global {
      signIn(): Promise<string[]>;
    }
  }
}
let mongo: any;
beforeAll(async () => {
  // Create a separate environment file for this
  process.env.JWT_KEY = "abcdef";
  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signIn = async () => {
  const email = "test@test.com";
  const password = "123456789";
  const response = await request(app)
    .post("/api/users/signup")
    .send({ email, password })
    .expect(201);

  return response.get("Set-Cookie");
};
