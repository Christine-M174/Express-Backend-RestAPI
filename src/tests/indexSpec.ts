//import myFunc from '../index';

// it('expect myFunc(5) to equal 25', () => {
//   expect(myFunc(5)).toEqual(25);
// });

import supertest from 'supertest';
import app from '../index';
import { promises as fs } from 'fs';
import path from 'path';
import manageImage from './../manageImage';

const request: supertest.SuperTest<supertest.Test> = supertest(app);

describe('Test responses from endpoints', (): void => {
  describe('endpoint: /', (): void => {
    it('gets /', async (): Promise<void> => {
      const response: supertest.Response = await request.get('/');

      expect(response.status).toBe(200);
    });
  });

  describe('endpoint: /api/image', (): void => {
    it('gets /api/image?filename=Sports (valid args)', async (): Promise<void> => {
      const response: supertest.Response = await request.get(
        '/api/image?filename=Sports'
      );

      expect(response.status).toBe(200);
    });

    it('gets /api/image?filename=Sports&width=199&height=199 (valid args)', async (): Promise<void> => {
      const response: supertest.Response = await request.get(
        '/api/image?filename=Sports&width=431&height=242'
      );

      expect(response.status).toBe(200);
    });

    it('gets /api/image?filename=Sports&width=-200&height=200 (invalid args)', async (): Promise<void> => {
      const response: supertest.Response = await request.get(
        '/api/image?filename=Sports&width=-200&height=200'
      );

      expect(response.status).toBe(200);
    });

    it('gets /api/image (no arguments)', async (): Promise<void> => {
      const response: supertest.Response = await request.get('/api/image');

      expect(response.status).toBe(200);
    });
  });

  describe('endpoint: /endd', (): void => {
    it('returns 404 for invalid endpoint', async (): Promise<void> => {
      const response: supertest.Response = await request.get('/endd');

      expect(response.status).toBe(404);
    });
  });
});

//  Test should not run on productive system to avoid cache loss
afterAll(async (): Promise<void> => {
  const resizedImagePath: string = path.resolve(
    manageImage.imagesThumbPath,
    'Sports-199x199.jpg'
  );

  try {
    await fs.access(resizedImagePath);
    fs.unlink(resizedImagePath);
  } catch {}
});
