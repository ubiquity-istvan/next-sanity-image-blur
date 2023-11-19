// // ./nextjs-pages/next.config.js
//
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     images: {
//       remotePatterns: [
//         {
//           protocol: 'https',
//           hostname: 'cdn.sanity.io',
//         },
//       ],
//     },
//     // ...other config settings
//   };
//
//   module.exports = nextConfig;
//
//
/** @type {import('next').NextConfig} */
// @ts-check
import withPlaiceholder from "@plaiceholder/next";
/**
 * @type {import('next').NextConfig}
 */
const config = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  // ...other config settings
};

export default withPlaiceholder(config);
