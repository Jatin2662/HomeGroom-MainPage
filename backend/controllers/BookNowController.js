


// const express = require('express');
// const app = express();
// const mongoose = require('mongoose');
// const Grid = require('gridfs-stream');

// // Assuming you've established the connection in your main file and exported it
// const conn = mongoose.connection;

// // Initialize GridFS stream using the existing connection
// let gfs, gridFSBucket;
// mongoose.connection.once('open', () => {
//   gridFSBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
//     bucketName: 'uploads'
//   });
//   gfs = Grid(mongoose.connection.db, mongoose.mongo);
//   gfs.collection('uploads');
// });

// // Fetch image from MongoDB using GridFS
// const fetchImage = (filename, res) => {
//   gridFSBucket.find({ filename }).toArray((err, files) => {
//     if (!files || files.length === 0) {
//       return res.status(404).json({ error: 'File not found' });
//     }
//     const readStream = gridFSBucket.openDownloadStreamByName(filename);
//     readStream.pipe(res);
//   });
// };

// exports.fetchImage = fetchImage;

// Start the server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');

// Assuming you've established the connection in your main file and exported it
const conn = mongoose.connection;

// Initialize GridFS stream using the existing connection
let gfs, gridFSBucket;
conn.once('open', () => {
  gridFSBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: 'uploads'
  });
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

// Fetch all images from MongoDB using GridFS
// const fetchAllImages = (req, res) => {
//   console.log("function fetchAllImages")
//   gfs.files.find().toArray((err, files) => {
//       if (!files || files.length === 0) {
//           return res.status(404).json({ error: 'No files found' });
//       }

//       // Array to store image data
//       const images = [];

//       // Iterate over each file
//       files.forEach((file) => {
//           const readStream = gridFSBucket.openDownloadStreamByName(file.filename);
//           const data = [];
//           readStream.on('data', (chunk) => {
//               data.push(chunk);
//           });
//           readStream.on('end', () => {
//               const imageBuffer = Buffer.concat(data);
//               images.push({
//                   id: file._id,
//                   title: file.metadata.title,
//                   image: imageBuffer.toString('base64')
//               });
              

//               // If all images have been processed, send the response
//               if (images.length === files.length) {
//                   res.json(images);
//               }
//               console.log(images);
//           });
//       });
//   });
  
//   console.log("function fetchAllImages end")

// };

// const fetchAllImages = (req, res) => {
//   console.log("function fetchAllImages")
//   gfs.files.find().toArray((err, files) => {
//       if (!files || files.length === 0) {
//           return res.status(404).json({ error: 'No files found' });
//       }

//       // Array to store image data
//       const images = [];

//       // Array to store promises for image processing
//       const promises = files.map((file) => {
//           return new Promise((resolve, reject) => {
//               const readStream = gridFSBucket.openDownloadStreamByName(file.filename);
//               const data = [];
//               readStream.on('data', (chunk) => {
//                   data.push(chunk);
//               });
//               readStream.on('end', () => {
//                   const imageBuffer = Buffer.concat(data);
//                   images.push({
//                       id: file._id,
//                       title: file.metadata.title,
//                       image: imageBuffer.toString('base64')
//                   });
//                   resolve();
//               });
//               readStream.on('error', (err) => {
//                   reject(err);
//               });
//           });
//       });

//       // Wait for all promises to resolve
//       Promise.all(promises)
//           .then(() => {
//             console.log(images);
//               res.json(images);
//           })
//           .catch((err) => {
//               console.error('Error processing images:', err);
//               res.status(500).json({ error: 'Failed to process images' });
//           });
//   });

//   console.log("function fetchAllImages end")
// };

const fetchAllImages = async (req, res) => {
  try {
    const files = await gfs.files.find().toArray();

    if (!files || files.length === 0) {
      return res.status(404).json({ error: 'No files found' });
    }

    const images = [];

    for (let file of files) {
      const readStream = gridFSBucket.openDownloadStreamByName(file.filename);
      const data = await new Promise((resolve, reject) => {
        const chunks = [];
        readStream.on('data', (chunk) => {
          chunks.push(chunk);
        });
        readStream.on('end', () => {
          resolve(Buffer.concat(chunks));
        });
        readStream.on('error', (err) => {
          reject(err);
        });
      });

      images.push({
        id: file._id,
        title: file.metadata.title,
        image: data.toString('base64')
      });
    }

    res.json(images);
  } catch (err) {
    console.error('Error fetching images:', err);
    res.status(500).json({ error: 'Failed to fetch images' });
  }
};

exports.fetchAllImages = fetchAllImages;



// exports.fetchAllImages = fetchAllImages;


// Fetch image from MongoDB using GridFS

// const fetchImage = (req, res) => {
//     const { title } = req.params;
//     gfs.files.findOne({ 'metadata.title': title }, (err, file) => {
//       if (!file) {
//         return res.status(404).json({ error: 'File not found' });
//       }
  
//       const readStream = gridFSBucket.openDownloadStreamByName(file.filename);
//       res.set('Content-Type', file.contentType);
//       readStream.pipe(res);
//     });
// };

// exports.fetchImage = fetchImage;

// eh chal reha si par images nhi aa reha

// const fetchImage = (req, res) => {
//     const { title } = req.params;
//     gfs.files.findOne({ 'metadata.title': title }, (err, file) => {
//       if (!file) {  // || file.length === 0
//         return res.status(404).json({ error: 'File not found' });
//       }
  
//       const readStream = gridFSBucket.openDownloadStreamByName(file.filename);
//       const data = [];
//       readStream.on('data', (chunk) => {
//         data.push(chunk);
//       });
//       readStream.on('end', () => {
//         const imageBuffer = Buffer.concat(data);
//         res.set('Content-Type', file.contentType);
//         res.json({
//           id: file._id,
//           title: file.metadata.title,
//           image: imageBuffer.toString('base64')
//         });
//       });
//     });
//   };

// exports.fetchImage = fetchImage;



// Fetch image, ID, and title by title from MongoDB using GridFS
// app.get('/image/title/:title', (req, res) => {
//     const { title } = req.params;
//     gfs.files.findOne({ 'metadata.title': title }, (err, file) => {
//       if (!file || file.length === 0) {
//         return res.status(404).json({ error: 'File not found' });
//       }
  
//       const readStream = gridFSBucket.openDownloadStreamByName(file.filename);
//       const data = [];
//       readStream.on('data', (chunk) => {
//         data.push(chunk);
//       });
//       readStream.on('end', () => {
//         const imageBuffer = Buffer.concat(data);
//         res.set('Content-Type', file.contentType);
//         res.json({
//           id: file._id,
//           title: file.metadata.title,
//           image: imageBuffer.toString('base64')
//         });
//       });
//     });
//   });
  