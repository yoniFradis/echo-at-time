const chai = require('chai');
const chaiHttp = require('chai-http');
const { describe, before, it } = require('mocha');

chai.use(chaiHttp);
const { expect } = chai;
let app;

describe('Route tests', () => {
  before(async () => {
    const bootstrapHelper = require('../../e2e-tools/bootstrap-helper');
    app = bootstrapHelper.getInstance();
  });

  describe('api echoAtTime Get action', () => {
    it('should put message in queue', async () => {
      let runAt = new Date();
      runAt.setSeconds(runAt.getSeconds() - 10);

      let response = await chai.request(app).get('/api/echoAtTime?msg=HelloTest&time=' + runAt.getTime());
      expect(response.status).to.eql(200);
      expect(JSON.parse(response.text).msg.text).to.eql('HelloTest');
    });
  });
});
