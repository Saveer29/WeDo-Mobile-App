import AWS from "aws-sdk";

const bucketName = "saveertest";

AWS.config.update({
  region: "ap-southeast-2",
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: "ap-southeast-2:3f97b400-4d59-434c-9f78-b707a6391131",
  }),
});

const s3 = new AWS.S3();

const uploadFileToS3 = async (fileName, filePath) => {
  const params = {
    Bucket: bucketName,
    Key: fileName,
    Body: filePath,
    ContentType: "image/jpeg",
  };
  return s3.upload(params).promise();
};

// Function to generate a unique file name
const generateUniqueFileName = () => {
  const timestamp = new Date().getTime();
  const randomString = Math.random().toString(36).substring(2, 8); // Generate a random string
  return `${timestamp}-${randomString}`;
};

export const uploadImages = async (event) => {
  const imageUriList = [];
  const uniqueImageName = generateUniqueFileName();

  try {
    for (const [index, image] of event.images?.entries() || []) {
      const imagePath = image.replace("file://", "");
      const imageName = uniqueImageName + index;

      const fileData = await fetch(imagePath).then((response) =>
        response.blob()
      );

      const { Location } = await uploadFileToS3(imageName, fileData);
      imageUriList.push(Location);
    }
    return imageUriList;
  } catch (err) {
    console.error("Error in uploadImages: ", err);
    return [];
  }
};
