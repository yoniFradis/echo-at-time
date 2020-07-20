# echo-at-time
A service for output messages by future time using Redis

## Usage

To run it locally use:
localhost:3000/api/echoAtTime?msg=[Your Message]&time=[Your desired time]
```javascript

'localhost:3000/api/echoAtTime?msg=Hello&time=1539430684913;'
```

### Flow
1. Messages will be saved in Redis zset by their time
2. A Polling mechanism will check for messages and output them when their time comes   

# installation
```bash
npm install
```

# package dependencies
## dependencies
* express - as the http server
* redis - as redis client
* redlock - as a redis distributed lock.
* bluebird - as promise library for redis (bluebird.promisifyAll(redis))
