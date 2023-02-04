const Redis = require("ioredis");
const users = "http://localhost:3001";
const apps = "http://localhost:3002";

const redis = new Redis({
  host: "redis-11064.c252.ap-southeast-1-1.ec2.cloud.redislabs.com",
  port: 11064,
  password: "9Jr7Vojr7N7n02KAr7hm5iDWDR45U3BK",
});

module.exports = { redis, users, apps };
