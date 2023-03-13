FROM node:alpine

ENV CLIENT_URL=http://localhost:3000
ENV MONGO_URI=mongodb+srv://sirin_berk:XTeYD5UXNfJJbadl@cluster0.czqlnsa.mongodb.net/WAIPE_db?retryWrites=true&w=majority
ENV JWT_SECRET=GPF*9%PE64$euSd?
ENV SENDINBLUE_API_KEY=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
ENV CLOUDINARY_CLOUD_NAME=dbtykofld CLOUDINARY_API_KEY=333399919299186 CLOUDINARY_API_SECRET=TFi28NDrfF_qA9FnFxXTuzNNJpE

WORKDIR /usr/api

COPY package.json .

RUN npm install

COPY . .

EXPOSE 5001

CMD ["node", "server.js"]
