import Sinon, { stub } from 'sinon';

import { GenerateReport } from './generate-report';
import { InMemoryRepository } from '../../../external/repositories/inMemoryRepository/in-memory-repository';
import { PuppeteerScreenShot } from '../../../external/pdf/puppeteerSreenshot/puppeteer-screenshot';
import { CreatePDF } from '../../../external/pdf/createPDF/jsPdf';

describe('Generate Report', () => {
  let findServiceByOwnerStub: Sinon.SinonStub;
  let takeScreenShotStub: Sinon.SinonStub;
  let createPDFStub: Sinon.SinonStub;

  beforeEach(() => {
    findServiceByOwnerStub = stub(InMemoryRepository.prototype, 'findServiceByOwner');
    takeScreenShotStub = stub(PuppeteerScreenShot.prototype, 'takeScreenShot');
    createPDFStub = stub(CreatePDF.prototype, 'createPDF');
  });

  afterEach(() => {
    findServiceByOwnerStub.restore();
    takeScreenShotStub.restore();
    createPDFStub.restore();
  });

  it('Should create report', async () => {
    findServiceByOwnerStub.returns([
      {
        uuid: '1',
        name: 'fake service',
        owner: 'fakeOwner',
        incidents: [],
        url: 'https://prehire.evercheck.com/api/applicants/v1/',
        status: 'pass'
      }
    ]);
    takeScreenShotStub.returns(['image in base64 1', 'image in base64 2']);
    createPDFStub.returns('file path');

    const inMemoryRepository = new InMemoryRepository();
    const puppeteerSreenshot = new PuppeteerScreenShot();
    const createPDF = new CreatePDF();

    const generateReport = new GenerateReport(inMemoryRepository, puppeteerSreenshot, createPDF);

    await generateReport.makeReport('fakeOwner');

    expect(findServiceByOwnerStub.calledOnce).toBeTruthy();
    expect(takeScreenShotStub.calledOnce).toBeTruthy();
    expect(createPDFStub.calledOnce).toBeTruthy();
  });

  it("Shouldn't create report if owner doesnt exist", async () => {
    findServiceByOwnerStub.returns([]);

    const inMemoryRepository = new InMemoryRepository();
    const puppeteerSreenshot = new PuppeteerScreenShot();
    const createPDF = new CreatePDF();

    const generateReport = new GenerateReport(inMemoryRepository, puppeteerSreenshot, createPDF);

    await generateReport.makeReport('fakeOwner');

    expect(findServiceByOwnerStub.calledOnce).toBeTruthy();
    expect(takeScreenShotStub.calledOnce).toBeFalsy();
    expect(createPDFStub.calledOnce).toBeFalsy();
  });

  it('Shouldnt create report if their screenshot doenst take', async () => {
    findServiceByOwnerStub.returns([
      {
        uuid: '1',
        name: 'fake service',
        owner: 'fakeOwner',
        incidents: [],
        url: 'https://prehire.evercheck.com/api/applicants/v1/',
        status: 'pass'
      }
    ]);
    takeScreenShotStub.returns([]);

    const inMemoryRepository = new InMemoryRepository();
    const puppeteerSreenshot = new PuppeteerScreenShot();
    const createPDF = new CreatePDF();

    const generateReport = new GenerateReport(inMemoryRepository, puppeteerSreenshot, createPDF);

    await generateReport.makeReport('fakeOwner');

    expect(findServiceByOwnerStub.calledOnce).toBeTruthy();
    expect(takeScreenShotStub.calledOnce).toBeTruthy();
    expect(createPDFStub.calledOnce).toBeFalsy();
  });
});
