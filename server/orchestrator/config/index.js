const Redis = require("ioredis");
// const users = "http://localhost:3001";
// const apps = "http://localhost:3002";
const users = "https://p3-challenge-2-production-a006.up.railway.app";
const apps = "https://wanted-magic-production.up.railway.app";

const redis = new Redis({
  host: "redis-11064.c252.ap-southeast-1-1.ec2.cloud.redislabs.com",
  port: 11064,
  password: "9Jr7Vojr7N7n02KAr7hm5iDWDR45U3BK",
});

module.exports = { redis, users, apps };
