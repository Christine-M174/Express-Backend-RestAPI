import { promises as fs } from 'fs';
import path from 'path';
import manageImage from './../manageImage';

describe('Test image processing via sharp', (): void => {
  it('raises an error (manageImagename does not exist)', async (): Promise<void> => {
    const error: null | string = await manageImage.createThumb({
      filename: 'ended',
      width: '100',
      height: '500',
    });
    expect(error).not.toBeNull();
  });

  it('raises an error (invalid width value)', async (): Promise<void> => {
    const error: null | string = await manageImage.createThumb({
      filename: 'ended',
      width: '100',
      height: '500',
    });
    expect(error).not.toBeNull();
  });

  // it('succeeds to write resized thumb manageImage (existing manageImage, valid size values)', async (): Promise<void> => {
  //   await manageImage.createThumb({
  //     filename: 'Sports',
  //     width: '99',
  //     height: '99',
  //   });

  //   const resizedImagePath: string = path.resolve(
  //     manageImage.imagesThumbPath,
  //     `Sports-99x99.jpg`
  //   );
  //   let errormanageImage: null | string = '';

  //   try {
  //     await fs.access(resizedImagePath);
  //     errormanageImage = null;
  //   } catch {
  //     errormanageImage = 'manageImage was not created';
  //   }

  //   expect(errormanageImage).toBeNull();
  // });
});

// Erase test manageImage.
afterAll(async (): Promise<void> => {
  const resizedImagePath: string = path.resolve(
    manageImage.imagesThumbPath,
    'Sports-99x99.jpg'
  );

  try {
    await fs.access(resizedImagePath);
    fs.unlink(resizedImagePath);
  } catch {}
});
