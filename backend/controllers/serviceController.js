


const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const fs = require('fs');
const path = require('path');
const multer = require('multer');


let gfs, gridFSBucket;
mongoose.connection.once('open', () => {
  gridFSBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: 'uploads'
  });
  gfs = Grid(mongoose.connection.db, mongoose.mongo);
  gfs.collection('uploads');
});


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'C:\\Users\\kanch\\Desktop\\Web Development\\Web Hoping Minds\\Task\\task8adminpage\\src\\assets') 
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});
const upload = multer({ storage });


const uploadImage = (filePath, filename, mimeType, title) => {
  const readStream = fs.createReadStream(filePath);
  const writeStream = gridFSBucket.openUploadStream(filename, { contentType: mimeType, metadata: { title } });
  readStream.pipe(writeStream).on('error', (err) => {
    console.error('Error uploading image:', err);
  }).on('finish', () => {
    console.log('Image uploaded successfully');
  });
};



const fetchImage = (filename, res) => {
  gridFSBucket.find({ filename }).toArray((err, files) => {
    if (!files || files.length === 0) {
      return res.status(404).json({ error: 'File not found' });
    }
    const file = files[0];
    const readStream = gridFSBucket.openDownloadStreamByName(filename);

    const responseHeaders = {
      'Content-Type': file.contentType,
      'Title': file.metadata.title
    };

    res.writeHead(200, responseHeaders);
    readStream.pipe(res);
  });
};


const handleImageUpload = (req, res) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    const filePath = path.join('C:\\Users\\kanch\\Desktop\\Web Development\\Web Hoping Minds\\Task\\task8adminpage\\src\\assets', req.file.filename);
    const { title } = req.body; 
    uploadImage(filePath, req.file.filename, req.file.mimetype, title);
    res.status(200).json({ message: 'Image uploaded successfully' });
  });
};

const handleImageFetch = (req, res) => {
  const { filename } = req.params;
  fetchImage(filename, res);
};


module.exports = {
  handleImageUpload,
  handleImageFetch
};



// const Service = require('../models/services');


// const uploadService = async (req, res, next)=>{

//     const {title, image} = req.body;
//     try {
//         const newService = new Service({ title, image });
//         await newService.save();
//         res.status(201).json({ message: 'Upload successful' });
//       } catch (error) {
//         console.error('Error uploading data:', error);
//         res.status(500).json({ error: 'Internal server error' });
//       }
// } 

// exports.uploadService = uploadService;


// image ka path ja rha tha

// const multer = require('multer');
// const Service = require('../models/services');

// // Multer setup for handling file uploads
// const storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//     cb(null, 'C:/Users/kanch/Desktop/Web Development/Web Hoping Minds/Task/task8adminpage/src/assets/'); // Set the destination folder for uploaded files
//   },
//   filename: function(req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname); // Set the filename to be unique
//   }
// });
// const upload  = multer({ storage: storage, limits: {
//     fileSize: 4 * 1024 * 1024, 
//   } }).single('image');

// const uploadService = async (req, res, next) => {
//   try {
//     // Call multer middleware to handle file upload
//     upload(req, res, async function(err) {
//       if (err) {
//         console.error('Error uploading file:', err);
//         return res.status(500).json({ error: 'Internal server error' });
//       }

//       // File upload successful, get the file path
//       const imagePath = req.file.path;

//       // Create a new Service document with title and image path
//       const { title } = req.body;
//       const newService = new Service({ title, image: imagePath });
      
//       // Save the new Service document to the database
//       await newService.save();
      
//       // Send success response
//       res.status(201).json({ message: 'Upload successful' });
//     });
//   } catch (error) {
//     console.error('Error uploading data:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

// exports.uploadService = uploadService;





// yeh hai jis par kam karna hai

// const mongoose = require('mongoose');
// const Grid = require('gridfs-stream');
// const fs = require('fs');
// const path = require('path');

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true, useUnifiedTopology: true });
// const conn = mongoose.connection;

// // Initialize GridFS stream
// let gfs;
// conn.once('open', () => {
//   gfs = Grid(conn.db, mongoose.mongo);
//   gfs.collection('uploads'); // Name of the GridFS collection
// });

// // Upload image to MongoDB
// const uploadImage = (filePath, filename, mimeType) => {
//   const readStream = fs.createReadStream(filePath);
//   const writeStream = gfs.createWriteStream({ filename, contentType: mimeType });
//   readStream.pipe(writeStream);
// };

// // Fetch image from MongoDB
// const fetchImage = (filename) => {
//   gfs.files.findOne({ filename }, (err, file) => {
//     if (!file || file.length === 0) {
//       console.log('File not found');
//       return;
//     }
//     const readStream = gfs.createReadStream({ filename });
//     // Use readStream to serve the image data to your frontend
//   });
// };

// // Usage example
// const imagePath = '/path/to/your/image.jpg';
// const imageName = 'image.jpg';
// const imageMimeType = 'image/jpeg';

// uploadImage(imagePath, imageName, imageMimeType);
// fetchImage(imageName);
