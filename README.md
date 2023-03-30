# WAIPE

Don't you think our loyal friends deserve public appreciation? Waipe is just for that. Share pictures and videos of your animal friends, get various likes and follows and discover more cuties!

![Logo](https://user-images.githubusercontent.com/15816386/228488438-6d7f4f3f-c0c6-433f-bfa1-2c925a56b3b7.png)

## Authors

- [@berkpeker2707](https://github.com/berkpeker2707)
- [@doga-ozsoyler](https://github.com/doga-ozsoyler)

## 🔗 Links

Berk Peker
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://tr.linkedin.com/in/berk-peker-46a453108/)

Şirin Doğa Özsöyler
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://tr.linkedin.com/in/sirin-doga-ozsoyler/)

## Features

- Login
- Register
- Update Profile
- Get Logged In User
- Get a User
- Get All Users
- Block/Unblock User
- Follow/Unfollow Pet
- Block/Unblock Pet
- Update User Profile Photo
- Delete User Profile Photo
- Delete User
- Create Pet
- Get Pet
- Update Pet
- Update Pet Profile Photo
- Delete Pet Profile Photo
- Delete Pet
- Create Post
- Get Specific Post
- Get All Posts of a Pet
- Get All Posts
- Get Followed Pet Posts
- Update Post
- Delete Post
- Archive Post
- Get Archived Posts
- Like/UnLike Post
- Get Post Like
- Send a Comment
- Delete a Comment
- Get Post Comments
- Create a Post Report
- Create a User Report
- Create a Comment Report
- Create a Pet Report

## Tech (MERN STACK)

**Client:** React Native Async Storage, React Native Community Masked View, React Native Seoul Masonry List, Rreact Navigation, Redux Toolkit, Axios, Deprecated React Native Prop Types, Expo, Expo AV, Expo Image Picker, Expo Modules Core, Expo Status Bar, Expo Updates, Formik, Install Expo Modules, Lottie React Native, Mime, Native Base, React, React DOM, React Native, React Native Aria, React Native Gesture Handler, React Native Material Menu, React Native Reanimated, React Native Safe Area Context, React Native Screens, React Native SVG, React Native UUID, React Native Vector Icons, React Native Web, React Redux, Redux Persist, React Aria/SSR, Yarn

**Server:** node, bcryptjs, body-parser, cloudinary, cors, crypto, dotenv, express, express-async-handler, express-form-data, express-formidable, express-rate-limit, express-session, fs, helmet, jsonwebtoken, mongoose, multer, nodemailer, nodemon, passport, passport-google-oauth2, randomatic, rate-limiter-flexible, sharp, sib-api-v3-sdk, uuidv4


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file:

`CLIENT_URL`
`PRODUCTION_URL`
`MONGO_URI`
`JWT_SECRET`
`SENDINBLUE_API_KEY`
`CLOUDINARY_CLOUD_NAME`
`CLOUDINARY_API_KEY`
`CLOUDINARY_API_SECRET`

## Installation

Install WAIPE with node package manager.

Make sure installing correct versions of node & expo.

## Run Locally

Get environment variables for api and add them into .env file.

Clone the project:

```bash
  https://github.com/berkpeker2707/WAIPE.git
```

Go to the api directory:

```bash
  cd api
```

Install dependencies:

```bash
  npm install
```

Start the api server:

```bash
  npm run api
```

Go to the client directory:

```bash
  cd client
```

Install dependencies:

```bash
  npm install
```

Start the client server:

```bash
  npm run client
```

## WAIPE DEPLOYMENT

WAIPE APP API DEPLOYMENT

Follow links below to create an account and install azure for deployment:
- [Azure Microsoft](https://azure.microsoft.com/en-us/ "Azure Microsoft")
- [Install Azure CLI macOS](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli-macos "Install Azure CLI macOS")
- [Azure Microsoft](https://azure.microsoft.com/en-us/ "Azure Microsoft")
- [Azure Microsoft](https://learn.microsoft.com/en-us/azure/app-service/configure-common?tabs=portal#configure-app-settings "Azure Microsoft")
- [Azure Youtube Tutorial 1](https://www.youtube.com/watch?v=0QO2jdinCoQ "Azure Youtube Tutorial 1")
- [Azure Youtube Tutorial 2](https://www.youtube.com/watch?v=EbVZJEadRkQ&list=PLLasX02E8BPADO_R-D6ctSoV4EeE8ow9B&index=5 "Azure Youtube Tutorial 2")

WAIPE CLIENT GOOGLE PLAY DEPLOYMENT

- First create an expo account
- Create a project at your expo account website.
```bash
npm install --global eas-cli
```
```bash
eas init --id <id of project which can be accesed from expo website>
```
- Then type eas build and select andorid.
- Check this for google play upload: [Expo Dev](https://docs.expo.dev/submit/android/ "Expo Dev")
- Create a google play developer account
- Check google service account creation: [How to Create Google Service Account](https://github.com/expo/fyi/blob/main/creating-google-service-account.md "How to Create Google Service Account")
- First andorid submission: [First Android Submission](https://github.com/expo/fyi/blob/main/first-android-submission.md "First Android Submission")

## Database Collection
#### User

| Key                               | Type          |
| :-------------------------------- | :------------ |
| `firstname`                       | `string`      |
| `lastname`                        | `string`      |
| `password`                        | `string`      |
| `passwordChangeAt`                | `Date`        |
| `passwordResetToken`              | `string`      |
| `passwordResetExpires`            | `Date`        |
| `accountVerificationToken`        | `string`      |
| `accountVerificationTokenExpires` | `Date`        |
| `picture`                         | `string`      |
| `biography`                       | `string`      |
| `location`                        | `object`      |
| `location.city`                   | `string`      |
| `location.country`                | `string`      |
| `phone`                           | `number`      |
| `email`                           | `string`      |
| `termsOfUse`                      | `boolean`     |
| `privacyPolicy`                   | `boolean`     |
| `age`                             | `boolean`     |
| `visibility`                      | `boolean`     |
| `handOrientation`                 | `string`      |
| `pets`                            | `PetID[]`     |
| `likedPosts`                      | `PostID[]`    |
| `likedComments`                   | `LikeID[]`    |
| `postedComments`                  | `CommentID[]` |
| `archivedPosts`                   | `PostID[]`    |
| `followedPets`                    | `PetID[]`     |
| `blockedUsers`                    | `UserID[]`    |
| `blockedPets`                     | `PetID[]`     |
| `accountVerified`                 | `boolean`     |
| `expireAt`                        | `Date`        |

#### Pet

| Key            | Type       |
| :------------- | :--------- |
| `name`         | `string`   |
| `picture`      | `string`   |
| `age`          | `number`   |
| `biography`    | `string`   |
| `species`      | `string`   |
| `breed`        | `string`   |
| `interestedIn` | `string`   |
| `ownerID`      | `User[]`   |
| `petPost`      | `PostID[]` |

#### Post

| Key               | Type          |
| :---------------- | :------------ |
| `petID`           | `PetID[]`     |
| `picture`         | `string`      |
| `postDescription` | `string`      |
| `like`            | `LikeID[]`    |
| `comment`         | `CommentID[]` |

#### Like

| Key                | Type       |
| :----------------- | :--------- |
| `postID`           | `PostID[]` |
| `like`             | `Object[]` |
| `like[n].ownerID`  | `UserID`   |
| `like[n].likeType` | `string`   |


#### Comment

| Key                              | Type       |
| :------------------------------- | :--------- |
| `postID`                         | `PostID`   |
| `comment`                        | `Object[]` |
| `comment[n].ownerID`             | `UserID`   |
| `comment[n].commentText`         | `string`   |
| `comment[n].likedBy`             | `Object[]` |
| `comment[n].likedBy[n].ownerID`  | `UserID`   |
| `comment[n].likedBy[n].likeType` | `string`   |

## API Reference

#### Presignup

```http
  POST /api/auth/presignup
```

| Parameter.      | Type      | Description                               |
| :-------------- | :-------- | :---------------------------------------- |
| `email`         | `string`  | **Required**. Registered email address    |
| `firstname`     | `string`  | **Required**.                             |
| `lastname`      | `string`  | **Required**.                             |
| `phone`         | `number`  | **Required**.                             |
| `termsOfUse`    | `boolean` | **Required**.                             |
| `privacyPolicy` | `boolean` | **Required**.                             |
| `age`           | `boolean` | **Required**.                             |
| `password`      | `string`  | **Required**. Registered password address |
| `expireAt`      | `Date`    | **Required**.                             |

#### Get item

```http
  GET /api/auth/verify-signup/*
```

?????????

#### Forgot Password

```http
  POST /api/auth/forgot-password
```

| Parameter  | Type     | Description                            |
| :--------- | :------- | :------------------------------------- |
| `email`    | `string` | **Required**. Registered email address |

#### Verify Password

```http
  POST /api/auth/verify-password
```

| Parameter     | Type     | Description   |
| :------------ | :------- | :------------ |
| `newPassword` | `string` | **Required**. |
| `token`       | `string` | **Required**. |

#### Fetch Current User

```http
  GET /api/user/me
```

| Headers         | Description                        |
| :-------------- | :--------------------------------- |
| `Authorization` | JWT to get user's all information. |

#### Fetch User

```http
  GET /api/user/${id}
```
| Headers         | Description                        |
| :-------------- | :--------------------------------- |
| `Authorization` | JWT to get user's all information. |

| Parameter | Type     | Description              |
| :-------- | :------- | :----------------------- |
| `id`      | `string` | **Required** User's id. |

#### Fetch All Users

```http
  GET /api/user/fetch/all
```
| Headers         | Description                        |
| :-------------- | :--------------------------------- |
| `Authorization` | JWT to get user's all information. |

#### Update User

```http
  PUT /api/user/update
```
| Headers         | Description                        |
| :-------------- | :--------------------------------- |
| `Authorization` | JWT to get user's all information. |

| Parameter           | Type      | Description                        |
| :------------------ | :-------- | :--------------------------------- |
| `firstname`         | `string`  | User's firstname.                  |
| `lastname`          | `string`  | User's lastname.                   |
| `biography`         | `string`  | User's biography.                  |
| `locations`         | `object`  | User's locations.                  |
| `locations.country` | `string`  | User's country.                    |
| `locations.city`    | `string`  | User's city.                       |
| `phone`             | `number`  | User's phone.                      |
| `email`             | `string`  | User's Registered email address.   |
| `visibility`        | `boolean` | Visibility of user's profile.      |
| `handOrientation`   | `string`  | Left or right. Default is "right". |

#### Block User

```http
  PUT /api/user/block/user
```
| Headers         | Description                        |
| :-------------- | :--------------------------------- |
| `Authorization` | JWT to get user's all information. |

| Parameter      | Type      | Description            |
| :------------- | :-------- | :--------------------- |
| `blockedUsers` | `string`  | ID of user is blocked. |

#### Follow Pet

```http
  PUT /api/user/follow/pet
```
| Headers         | Description                        |
| :-------------- | :--------------------------------- |
| `Authorization` | JWT to get user's all information. |

| Parameter      | Type      | Description            |
| :------------- | :-------- | :--------------------- |
| `followedPets` | `string`  | ID of pet is followed. |

#### Block Pet

```http
  PUT /api/user/block/pet
```
| Headers         | Description                        |
| :-------------- | :--------------------------------- |
| `Authorization` | JWT to get user's all information. |

| Parameter     | Type     | Description           |
| :------------ | :------- | :-------------------- |
| `blockedPets` | `string` | ID of pet is blocked. |

#### Update Profile Image

```http
  POST /api/user/upload/profile/image
```
| Headers         | Description                        |
| :-------------- | :--------------------------------- |
| `Authorization` | JWT to get user's all information. |

| File    | Type     | Description   |
| :------ | :------- | :------------ |
| `image` | `string` | Image's path. |

#### Delete Profile Image

```http
  DELETE /api/user/delete/profile/image
```
| Headers         | Description                        |
| :-------------- | :--------------------------------- |
| `Authorization` | JWT to get user's all information. |

| Parameter | Type     | Description |
| :-------- | :------- | :---------- |
| `picture` | `string` | Image's id. |

#### Delete User

```http
  DELETE /api/user/delete
```
| Headers         | Description                        |
| :-------------- | :--------------------------------- |
| `Authorization` | JWT to get user's all information. |

#### Fetch Pet

```http
  GET /api/pet/${id}
```
| Headers         | Description                        |
| :-------------- | :--------------------------------- |
| `Authorization` | JWT to get user's all information. |

| Parameter | Type     | Description |
| :-------- | :------- | :---------- |
| `id`      | `string` | Pet's id.   |

#### Create New Pet

```http
  POST /api/pet/new
```
| Headers         | Description                        |
| :-------------- | :--------------------------------- |
| `Authorization` | JWT to get user's all information. |

| Parameter      | Type     | Description                   |
| :------------- | :------- | :---------------------------- |
| `name`         | `string` | **Required** Pet's name.      |
| `picture`      | `string` | **Required** Pet's picture.   |
| `age`          | `number` | **Required** Pet's age.       |
| `biography`    | `string` | **Required** Pet's biography. |
| `species`      | `string` | **Required** Pet's species.   |
| `breed`        | `string` | **Required** Pet's breed.     |
| `interestedIn` | `string` | **Required** Pet's interests. |
| `ownerID`      | `string` | **Required** Owners's id.     |
| `petPost`      | `array`  | **Required** Pet's posts.     |

#### Create New Pet

```http
  PUT /api/pet/update/${id}
```
| Headers         | Description                        |
| :-------------- | :--------------------------------- |
| `Authorization` | JWT to get user's all information. |

| Parameter      | Type     | Description      |
| :------------- | :------- | :--------------- |
| `name`         | `string` | Pet's name.      |
| `picture`      | `string` | Pet's picture.   |
| `age`          | `number` | Pet's age.       |
| `biography`    | `string` | Pet's biography. |
| `species`      | `string` | Pet's species.   |
| `breed`        | `string` | Pet's breed.     |
| `interestedIn` | `string` | Pet's interests. |

#### Update Pet's Profile Image

```http
  POST /api/pet/upload/photo/${id}
```
| Headers         | Description                        |
| :-------------- | :--------------------------------- |
| `Authorization` | JWT to get user's all information. |

| File    | Type     | Description   |
| :------ | :------- | :------------ |
| `id`    | `string` | Pet's id.     |
| `image` | `string` | Image's path. |

#### Delete Pet's Profile Image

```http
  DELETE /api/user/delete/photo/${id}
```
| Headers         | Description                        |
| :-------------- | :--------------------------------- |
| `Authorization` | JWT to get user's all information. |

| Parameter | Type     | Description |
| :-------- | :------- | :---------- |
| `id`      | `string` | Pets's id.  |
| `picture` | `string` | Image's id. |

#### Delete Pet

```http
  DELETE /api/user/delete/${id}
```
| Headers         | Description                        |
| :-------------- | :--------------------------------- |
| `Authorization` | JWT to get user's all information. |

| Parameter | Type     | Description |
| :-------- | :------- | :---------- |
| `id`      | `string` | Pets's id.  |

#### Create New Post

```http
  POST /api/post/newPost/newPetPost
```
| Headers         | Description                        |
| :-------------- | :--------------------------------- |
| `Authorization` | JWT to get user's all information. |

| Parameter         | Type     | Description                      |
| :---------------- | :------- | :------------------------------- |
| `petID`           | `string` | **Required** Pets's id.          |
| `picture`         | `string` | **Required** Image's secure url. |
| `postDescription` | `string` | **Required** Post's description. |

#### Fetch Post

```http
  GET /api/post/fetch/${postID}
```
| Headers         | Description                        |
| :-------------- | :--------------------------------- |
| `Authorization` | JWT to get user's all information. |

| Parameter | Type     | Description |
| :-------- | :------- | :---------- |
| `postID`  | `string` | Post's id.  |

#### Fetch All Pet's Post

```http
  GET /api/post/fetch/pet/${petID}
```
| Headers         | Description                        |
| :-------------- | :--------------------------------- |
| `Authorization` | JWT to get user's all information. |

| Parameter | Type     | Description |
| :-------- | :------- | :---------- |
| `petID`   | `string` | Pet's id.   |

#### Fetch All Post

```http
  GET /api/post/fetch
```
| Headers         | Description                        |
| :-------------- | :--------------------------------- |
| `Authorization` | JWT to get user's all information. |

#### Fetch All Followed Post

```http
  GET /api/post/fetch/all/followed
```
| Headers         | Description                        |
| :-------------- | :--------------------------------- |
| `Authorization` | JWT to get user's all information. |

| Parameter | Type     | Description |
| :-------- | :------- | :---------- |
| `petID`   | `string` | Pet's id.   |

#### Update Post

```http
  PUT /api/post/update/${postID}
```
| Headers         | Description                        |
| :-------------- | :--------------------------------- |
| `Authorization` | JWT to get user's all information. |

| Parameter         | Type     | Description         |
| :---------------- | :------- | :------------------ |
| `postID`          | `string` | Post's id.          |
| `postDescription` | `string` | Post's description. |

#### Delete Post

```http
  DELETE /api/post/delete/${postID}
```
| Headers         | Description                        |
| :-------------- | :--------------------------------- |
| `Authorization` | JWT to get user's all information. |

| Parameter | Type     | Description |
| :-------- | :------- | :---------- |
| `postID`  | `string` | Post's id.  |

#### Fetch All Archived Post

```http
  GET /api/post/fetch/all/archived
```
| Headers         | Description                        |
| :-------------- | :--------------------------------- |
| `Authorization` | JWT to get user's all information. |

#### Delete Post

```http
  PUT /api/post/archive
```
| Headers         | Description                        |
| :-------------- | :--------------------------------- |
| `Authorization` | JWT to get user's all information. |

| Parameter | Type     | Description |
| :-------- | :------- | :---------- |
| `postID`  | `string` | Post's id.  |

#### Update Comment

```http
  PUT /api/comment/update/${id}
```
| Headers         | Description                        |
| :-------------- | :--------------------------------- |
| `Authorization` | JWT to get user's all information. |

| Parameter     | Type     | Description                  |
| :------------ | :------- | :--------------------------- |
| `id`          | `string` | **Required** Comment's id.   |
| `commentText` | `string` | **Required** Comment's text. |

#### Fetch Comment

```http
  GET /api/comment/fetch/${id}
```
| Headers         | Description                        |
| :-------------- | :--------------------------------- |
| `Authorization` | JWT to get user's all information. |

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id`      | `string` | **Required** Comment's id. |

#### Delete Comment

```http
  DELETE /api/comment/delete
```
| Headers         | Description                        |
| :-------------- | :--------------------------------- |
| `Authorization` | JWT to get user's all information. |

| Parameter         | Type     | Description        |
| :---------------- | :------- | :----------------- |
| `parentCommentID` | `string` | Comment list's id. |
| `childCommentID`  | `string` | Comment's id.      |

#### Update Post's Like

```http
  PUT /api/like/update/post/${id}
```
| Headers         | Description                        |
| :-------------- | :--------------------------------- |
| `Authorization` | JWT to get user's all information. |

| Parameter  | Type     | Description  |
| :--------- | :------- | :----------- |
| `id`       | `string` | Post's id.   |
| `likeType` | `string` | Like's type. |

#### Update Comment's Like

```http
  PUT /api/like/update/comment/${id}
```
| Headers         | Description                        |
| :-------------- | :--------------------------------- |
| `Authorization` | JWT to get user's all information. |

| Parameter  | Type     | Description   |
| :--------- | :------- | :------------ |
| `id`       | `string` | Comment's id. |
| `likeType` | `string` | Like's type.  |

## Color Reference

| Color                            | Hex                                                              |
| -------------------------------- | ---------------------------------------------------------------- |
| Primary Color                    | ![#3A6B35](https://via.placeholder.com/10/3A6B35?text=+) #3A6B35 |
| Secondary Color                  | ![#E38E48](https://via.placeholder.com/10/E38E48?text=+) #E38E48 |
| Tertiary Color                   | ![#CBD18F](https://via.placeholder.com/10/CBD18F?text=+) #CBD18F |
| Quaternary Color                 | ![#F8FFE3](https://via.placeholder.com/10/F8FFE3?text=+) #F8FFE3 |
| Quinary Color                    | ![#E3B448](https://via.placeholder.com/10/E3B448?text=+) #E3B448 |
| Background Color Secondary Color | ![#6B7280](https://via.placeholder.com/10/6B7280?text=+) #6B7280 |
| Background Color Color           | ![#CBD18F](https://via.placeholder.com/10/CBD18F?text=+) #CBD18F |
| Accent                           | ![#DE5246](https://via.placeholder.com/10/DE5246?text=+) #DE5246 |

## Screenshots

<details>
  <summary>Login</summary>
  
  <img src="https://user-images.githubusercontent.com/15816386/228759449-4fb86a8e-6961-4a2a-87e9-3285bc2d6833.png" width="400" title="Login">
  
</details>

<details>
  <summary>Register</summary>
  
  <img src="https://user-images.githubusercontent.com/15816386/228759466-f76fe894-cf65-48d1-9878-72192c2fbf25.png" width="400" title="Register">
  
</details>

<details>
  <summary>Discover</summary>
  
  <img src="https://user-images.githubusercontent.com/15816386/228759438-48efb1ce-773d-4180-983d-28968796a21f.png" width="400" title="Login">

</details>

<details>
  <summary>Feed</summary>

  <img src="https://user-images.githubusercontent.com/15816386/228759445-653d60b2-72ea-40e5-9e3c-a5c0109bbb16.png" width="400" title="Login">

</details>

<details>
  <summary>Post</summary>

  <img src="https://user-images.githubusercontent.com/15816386/228759463-eb2295b3-1f55-4727-b0f3-e202971c8081.png" width="400" title="Login">

</details>

<details>
  <summary>Long Press Pet Post</summary>

  <img src="https://user-images.githubusercontent.com/15816386/228759456-0a0c2d67-f04f-4b3c-b170-d3ad726d739f.png" width="400" title="Login">

</details>

<details>
  <summary>Long Press Another Pet Post</summary>

  <img src="https://user-images.githubusercontent.com/15816386/228759452-907862ca-0c92-4377-8b6c-dafb9de85904.png" width="400" title="Login">

</details>

<details>
  <summary>New Post</summary>
  
  <img src="https://user-images.githubusercontent.com/15816386/228759457-b038c9e0-fe21-408d-99b2-30310893a48f.png" width="400" title="Login">

</details>

<details>
  <summary>Profile</summary>

  <img src="https://user-images.githubusercontent.com/15816386/228759465-d4e0771e-10b2-4827-a235-94c4a3db339a.png" width="400" title="Login">

</details>

<details>
  <summary>Edit Profile</summary>

  <img src="https://user-images.githubusercontent.com/15816386/228759441-c5439055-5318-4a7e-9c85-075f765bbd21.png" width="400" title="Login">

</details>

<details>
  <summary>Another User Profile Settings</summary>

  <img src="https://user-images.githubusercontent.com/15816386/228759435-4d5c84ac-7e08-42b6-af05-302d46e53b80.png" width="400" title="Login">

</details>

<details>
  <summary>Pet Profile</summary>

  <img src="https://user-images.githubusercontent.com/15816386/228761141-063a0839-0b5b-40cc-afdf-d7a4100c2567.png" width="400" title="Login">

</details>

<details>
  <summary>Edit Pet Profile</summary>

  <img src="https://user-images.githubusercontent.com/15816386/228759439-5d1df80e-7613-45d1-920e-e5b682043a87.png" width="400" title="Login">

</details>

<details>
  <summary>Another Pet Profile Settings</summary>

  <img src="https://user-images.githubusercontent.com/15816386/228759432-66fb747e-e4b9-4dee-bd73-a698d7c11870.png" width="400" title="Login">

</details>

<details>
  <summary>Loading</summary>

  <img src="https://user-images.githubusercontent.com/15816386/228759448-3f71878f-20a2-4d1a-a2ab-4f585164f947.png" width="400" title="Login">

</details>

<details>
  <summary>Settings</summary>

  <img src="https://user-images.githubusercontent.com/15816386/228759469-00c05821-e444-4f96-bbe9-5e152f92ae84.png" width="400" title="Login">

</details>


## Roadmap

- Add forgot password screen.

- Add browser only admin page. 

## Used By

This project is used by the following:

- [WAIPE](https://play.google.com/store/apps/details?id=com.waipe.client&hl=en&gl=US)

## License

[MIT](https://choosealicense.com/licenses/mit/)
