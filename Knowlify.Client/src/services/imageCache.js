import { getEventImage } from "@/services/event";

export const cacheImage = async (key) => {
  const cache = await caches.open("image-cache");
  const response = await getEventImage(key);
  const image = await response.blob();

  await cache.put(key, new Response(image));
  return URL.createObjectURL(image);
};

export const getCachedImage = async (key) => {
  const cache = await caches.open("image-cache");
  const cachedResponse = await cache.match(key);

  if (cachedResponse) {
    const imageBlob = await cachedResponse.blob();
    return URL.createObjectURL(imageBlob);
  } else {
    return "";
  }
};

export const cacheLocalImage = async (key, image) => {
  const cache = await caches.open("image-cache");
  const response = new Response(image);
  await cache.put(key, response);
  return URL.createObjectURL(image);
};
