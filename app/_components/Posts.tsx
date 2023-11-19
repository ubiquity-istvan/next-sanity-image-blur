// ./nextjs-app/app/_components/Posts.tsx

import Link from "next/link";
import type { SanityDocument } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import getBase64 from "../lib/getLocalBase64";
import { getPlaiceholder } from "plaiceholder";
import axios from "axios";

const builder = imageUrlBuilder(client);

export default async function Posts({
  posts = [],
}: {
  posts: SanityDocument[];
}) {
  const title = posts.length === 1 ? `1 Post` : `${posts.length} Posts`;

  // Create an array to store the promises for fetching blurDataURL
  const blurDataURLPromises = posts.map(async (post) => {
    // Fetch the image data from the URL and convert it to a Buffer
    const response = await axios.get(
      builder.image(post.mainImage).width(300).height(300).url(),
      { responseType: "arraybuffer" }
    );
    const imageData = Buffer.from(response.data);

    // Get the blurDataURL using getPlaiceholder
    const { base64 } = await getPlaiceholder(imageData);

    return base64;
  });

  // Use Promise.all to fetch all blurDataURLs in parallel
  const blurDataURLs = await Promise.all(blurDataURLPromises);

  return (
    <main className="container mx-auto grid grid-cols-1 divide-y divide-blue-100">
      {/* ... rest of your component */}
    </main>
  );
}

// Plaice
// export default async function Posts({
//   posts = [],
// }: {
//   posts: SanityDocument[];
// }) {
//   const title = posts.length === 1 ? `1 Post` : `${posts.length} Posts`;
//
//   // Create an array to store the promises for fetching blurDataURL
//   const blurDataURLPromises = posts.map(async (post) => {
//     const { base64 } = await getPlaiceholder(
//       builder.image(post.mainImage).width(300).height(300).url()
//     );
//     return base64;
//   });
//
//   // Use Promise.all to fetch all blurDataURLs in parallel
//   const blurDataURLs = await Promise.all(blurDataURLPromises);
//
//   return (
//     <main className="container mx-auto grid grid-cols-1 divide-y divide-blue-100">
//       <h1 className="text-2xl p-4 font-bold">{title}</h1>
//       <div className="grid grid-cols-3">
//         {posts.map((post, index) => (
//           <Link
//             key={post._id}
//             href={post.slug.current}
//             className="p-4 hover:bg-blue-50"
//           >
//             <h2>{post.title}</h2>
//             <Image
//               className="float-left m-0 w-1/3 mr-4 rounded-lg"
//               src={builder.image(post.mainImage).width(300).height(300).url()}
//               width={300}
//               height={300}
//               alt={post?.mainImage?.alt}
//               placeholder="blur"
//               blurDataURL={blurDataURLs[index]} // Use the corresponding blurDataURL
//             />
//           </Link>
//         ))}
//       </div>
//     </main>
//   );
// }

// Original code
// export default async function Posts({
//   posts = [],
// }: {
//   posts: SanityDocument[];
// }) {
//   const title = posts.length === 1 ? `1 Post` : `${posts.length} Posts`;
//
//   {
//     posts.map((post) =>
//       console.log(builder.image(post.mainImage).options.source)
//     );
//   }
//
//   const myBlurDataUrl = await getBase64("http://localhost:3000/coffee.jpg");
//   console.log(myBlurDataUrl);
//
//
//   return (
//     <main className="container mx-auto grid grid-cols-1 divide-y divide-blue-100">
//       <h1 className="text-2xl p-4 font-bold">{title}</h1>
//       <div className="grid grid-cols-3">
//         {posts.map((post) => (
//           <Link
//             key={post._id}
//             href={post.slug.current}
//             className="p-4 hover:bg-blue-50"
//           >
//             <h2>{post.title}</h2>
//             <Image
//               className="float-left m-0 w-1/3 mr-4 rounded-lg"
//               src={builder.image(post.mainImage).width(300).height(300).url()}
//               width={300}
//               height={300}
//               alt={post?.mainImage?.alt}
//               placeholder="blur"
//               blurDataURL={myBlurDataUrl}
//             />
//           </Link>
//         ))}
//       </div>
//     </main>
//   );
// }

// Promise all (This works but there's one issue with it (require)
// export default async function Posts({
//   posts = [],
// }: {
//   posts: SanityDocument[];
// }) {
//   const title = posts.length === 1 ? `1 Post` : `${posts.length} Posts`;
//
//   // Create an array to store the promises for fetching blurDataURL
//   const blurDataURLPromises = posts.map(async (post) => {
//     return getBase64(
//       builder.image(post.mainImage).width(300).height(300).url()
//     ); // Replace with the actual source of your images
//   });
//
//   // Use Promise.all to fetch all blurDataURLs in parallel
//   const blurDataURLs = await Promise.all(blurDataURLPromises);
//
//   return (
//     <main className="container mx-auto grid grid-cols-1 divide-y divide-blue-100">
//       <h1 className="text-2xl p-4 font-bold">{title}</h1>
//       <div className="grid grid-cols-3">
//         {posts.map((post, index) => (
//           <Link
//             key={post._id}
//             href={post.slug.current}
//             className="p-4 hover:bg-blue-50"
//           >
//             <h2>{post.title}</h2>
//             <Image
//               className="float-left m-0 w-1/3 mr-4 rounded-lg"
//               src={builder.image(post.mainImage).width(300).height(300).url()}
//               width={300}
//               height={300}
//               alt={post?.mainImage?.alt}
//               placeholder="blur"
//               blurDataURL={blurDataURLs[index]} // Use the corresponding blurDataURL
//             />
//           </Link>
//         ))}
//       </div>
//     </main>
//   );
// }
