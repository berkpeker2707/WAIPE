const redis = require("redis");
require("dotenv").config();

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT),
});

function getOrSetCache(key, cb) {
  return new Promise((resolve, reject) => {
    redisClient.get(key, async (error, data) => {
      if (error) return reject(error);
      if (data != null) return resolve(JSON.parse(data));
      const freshData = await cb();
      redisClient.setex(key, 60, JSON.stringify(freshData));
      resolve(freshData);
    });
  });
}

module.exports = { getOrSetCache };
