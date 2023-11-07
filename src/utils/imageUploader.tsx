const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string;
const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME as string;
const cloudinaryUrl = process.env.NEXT_PUBLIC_CLOUDINARY_URL as string;

export const uploadImageToCloudinary = async (imageData: any) => {
  const formData = new FormData();
  formData.append("file", imageData);
  formData.append("upload_preset", uploadPreset);
  formData.append("cloud_name", cloudName);

  const res = await fetch(cloudinaryUrl, {
    method: "post",
    body: formData,
  });
  const result = await res.json();
  return result;
};
