import request from "supertest";
import { app } from "../../app";

it("responds with detail about current user", async () => {
  const cookie = await global.signIn();

  let response = await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(response.body.currentUser.email).toEqual("test@test.com");
});

it("responds with null for non-authenticated user", async () => {
  let response = await request(app)
    .get("/api/users/currentuser")
    .send()
    .expect(200);

  expect(response.body.currentUser).toBeNull();
});
