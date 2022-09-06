"use strict";
// import express from 'express';
// import manageImage from '../manageImage';
// const logger = (
//   req: express.Request,
//   res: express.Response,
//   next: Function
// ): void => {
//   let url = req.url;
//   console.log(`${url} was visited`);
//   next();
// };
// interface Queries {
//   filename?: string;
//   height?: string;
//   width?: string;
// }
// const validate = async (paramteresquery: Queries): Promise<null | string> => {
//   // Check if requested image is exist
//   if (!(await manageImage.isImageExist(paramteresquery.filename))) {
//     const ImageName: string = (await manageImage.getImageName()).join(', ');
//     return `Please pass a valid filename .`;
//   }
//   if (!paramteresquery.width && !paramteresquery.height) {
//     return null;
//   }
//   // Check for valid width
//   const width: number = parseInt(paramteresquery.width || '');
//   if (Number.isNaN(width) || width < 1) {
//     return 'Please provide a positive numerical value .';
//   }
//   // Check for valid height
//   const height: number = parseInt(paramteresquery.height || '');
//   if (Number.isNaN(height) || height < 1) {
//     return 'Please provide a positive numerical value ';
//   }
//   return null;
// };
// export default { logger, validate };
