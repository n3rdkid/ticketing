import request from "supertest";
import { app } from "../../app";
//Jest automatically awaits return statements
it("fails when a email does not exist is supplied", async () => {
  await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@demo.com",
      password: "12345678",
    })
    .expect(400);
});

//Jest automatically awaits return statements
it("fails when a invalid password is supplied does not exist is supplied", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "12345678",
    })
    .expect(400);
});

it("responds with a cookie for valid credentials", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  const response = await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(200);
  expect(response.get("Set-Cookie")).toBeDefined();
});
