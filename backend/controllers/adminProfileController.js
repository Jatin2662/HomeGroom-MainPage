
// const express = require('express');
// const router = express.Router();
// const mongoose = require('mongoose');
// const Grid = require('gridfs-stream');
// const fs = require('fs');
// const path = require('path');
// const multer = require('multer');

// let gfs, gridFSBucket;
// mongoose.connection.once('open', () => {
//     gridFSBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
//         bucketName: 'adminData'
//     });
//     gfs = Grid(mongoose.connection.db, mongoose.mongo);
//     gfs.collection('adminData.files');
// });

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'C:\\Users\\kanch\\Desktop\\Web Development\\Web Hoping Minds\\Task\\task8adminpage\\src\\assets');
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + path.extname(file.originalname));
//     }
// });
// const upload = multer({ storage });

// const uploadImage = (filePath, filename, mimeType, metadata) => {
//     const readStream = fs.createReadStream(filePath);
//     const writeStream = gridFSBucket.openUploadStream(filename, { contentType: mimeType, metadata });
//     readStream.pipe(writeStream).on('error', (err) => {
//         console.error('Error uploading image:', err);
//     }).on('finish', () => {
//         console.log('Image uploaded successfully');
//         fs.unlink(filePath, (err) => {
//             if (err) {
//                 console.error('Error deleting file:', err);
//             }
//         });
//     });
// };


// const handleImageUpload = (req, res) => {
//     upload.single('image')(req, res, (err) => {
//         if (err) {
//             return res.status(400).json({ error: err.message });
//         }
//         const filePath = path.join('C:\\Users\\kanch\\Desktop\\Web Development\\Web Hoping Minds\\Task\\task8adminpage\\src\\assets', req.file.filename);
//         const { firstName, lastName, email, phone } = req.body;
//         const metadata = { firstName, lastName, email, phone };
//         uploadImage(filePath, req.file.filename, req.file.mimetype, metadata);
//         res.status(200).json({ message: 'Image uploaded successfully' });
//     });
// };

// const updateUserDetails = (req, res) => {
//     const { filename } = req.params;
//     const { firstName, lastName, email, phone } = req.body;

//     gridFSBucket.find({ filename }).toArray((err, files) => {
//         if (!files || files.length === 0) {
//             return res.status(404).json({ error: 'File not found' });
//         }
//         const file = files[0];
//         const updatedMetadata = { firstName, lastName, email, phone };

//         gfs.files.updateOne(
//             { _id: file._id },
//             { $set: { metadata: updatedMetadata } },
//             (err) => {
//                 if (err) {
//                     return res.status(500).json({ error: 'Error updating user details' });
//                 }
//                 res.status(200).json({ message: 'User details updated successfully' });
//             }
//         );
//     });
// };

// const fetchUserName = (filename, res) => {

//     gridFSBucket.find({ filename }).toArray((err, files) => {
//         if (!files || files.length === 0) {
//             return res.status(404).json({ error: 'File not found' });
//         }
//         const file = files[0];

//         const response = {
//             firstName: file.metadata.firstName,
//             lastName: file.metadata.lastName
//         };

//         res.status(200).json(response);
//     });
// };


// module.exports = {
//     handleImageUpload,
//     fetchUserName,
//     updateUserDetails
// };




const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

let gfs, gridFSBucket;
mongoose.connection.once('open', () => {
  gridFSBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: 'adminData'
  });
  gfs = Grid(mongoose.connection.db, mongoose.mongo);
  gfs.collection('adminData');
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'C:\\Users\\kanch\\Desktop\\Web Development\\Web Hoping Minds\\Task\\task8adminpage\\src\\assets');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

const uploadImage = (filePath, filename, mimeType, metadata) => {
  const readStream = fs.createReadStream(filePath);
  const writeStream = gridFSBucket.openUploadStream(filename, { contentType: mimeType, metadata });
  readStream.pipe(writeStream).on('error', (err) => {
    console.error('Error uploading image:', err);
  }).on('finish', () => {
    console.log('Image uploaded successfully');
    // Optionally delete the file after upload
    // fs.unlink(filePath, (err) => {
    //   if (err) {
    //     console.error('Error deleting file:', err);
    //   }
    // });
  });
};



const handleImageUpload = (req, res) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    const filePath = path.join('C:\\Users\\kanch\\Desktop\\Web Development\\Web Hoping Minds\\Task\\task8adminpage\\src\\assets', req.file.filename);
    const { firstName, lastName, email, phone } = req.body;
    const metadata = { firstName, lastName, email, phone };
    uploadImage(filePath, req.file.filename, req.file.mimetype, metadata);
    res.status(200).json({ message: 'Image uploaded successfully' });
  });
};

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
          firstName: file.metadata.firstName,
          lastName: file.metadata.lastName,
          email: file.metadata.email,
          phone: file.metadata.phone,
          image: data.toString('base64')
        });
      }
  
      res.json(images);
    } catch (err) {
      console.error('Error fetching images:', err);
      res.status(500).json({ error: 'Failed to fetch images' });
    }
  };

  const updateDetails = async (req, res) => {
    // const id = req.body.id;
    const id = "666d78064110b65f1f76fee3";
    // console.log("Backend : ", id);

    if (!id) {
        upload.single('image')(req, res, (err) => {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            const filePath = path.join('C:\\Users\\kanch\\Desktop\\Web Development\\Web Hoping Minds\\Task\\task8adminpage\\src\\assets', req.file.filename);
            const { firstName, lastName, email, phone } = req.body;
            const metadata = { firstName, lastName, email, phone };
            uploadImage(filePath, req.file.filename, req.file.mimetype, metadata);
            res.status(200).json({ message: 'Image uploaded successfully' });
        });
    } else {
        console.log("Aayya1")
        const idExist = await gfs.files.findOne({ _id: new mongoose.Types.ObjectId(id) });
        console.log("Aayya2")

        if (idExist) {
            try {
                const { firstName, lastName, email, phone } = req.body;
                const updateResult = await gfs.files.updateOne(
                    { _id: mongoose.Types.ObjectId(id) },
                    { $set: { "metadata.firstName": firstName, "metadata.lastName": lastName, "metadata.email": email, "metadata.phone": phone } }
                );
                if (updateResult.modifiedCount === 0) {
                    return res.status(404).json({ error: 'File not found' });
                }
                res.status(200).json({ message: 'Details updated successfully' });
            } catch (err) {
                console.error('Error updating details:', err);
                res.status(500).json({ error: 'Failed to update details' });
            }
        } else {
            res.status(404).json({ error: 'File not found' });
        }
    }
};

module.exports = {
  handleImageUpload,
  fetchAllImages,
  updateDetails
};


// const fetchImageById = async (req, res) => {
//     const fileId = req.params.id; // Assuming the ID is passed in the URL parameters
    
//     try {
//         const file = await gfs.files.findOne({ _id: fileId });
        
//         if (!file) {
//             return res.status(404).json({ error: 'File not found' });
//         }
        
//         const readStream = gridFSBucket.openDownloadStream(file._id);
//         const data = await new Promise((resolve, reject) => {
//             const chunks = [];
//             readStream.on('data', (chunk) => {
//                 chunks.push(chunk);
//             });
//             readStream.on('end', () => {
//                 resolve(Buffer.concat(chunks));
//             });
//             readStream.on('error', (err) => {
//                 reject(err);
//             });
//         });
        
//         const image = {
//             id: file._id,
//             firstName: file.metadata.firstName,
//             lastName: file.metadata.lastName,
//             email: file.metadata.email,
//             phone: file.metadata.phone,
//             image: data.toString('base64')
//         };
        
//         res.json(image);
//     } catch (err) {
//         console.error('Error fetching image:', err);
//         res.status(500).json({ error: 'Failed to fetch image' });
//     }
// };



// kuch kia hai yahan

//   const updateDetails = async (req, res) => {

//     const id = req.body;

//     if(!id){
//         upload.single('image')(req, res, (err) => {
//             if (err) {
//               return res.status(400).json({ error: err.message });
//             }
//             const filePath = path.join('C:\\Users\\kanch\\Desktop\\Web Development\\Web Hoping Minds\\Task\\task8adminpage\\src\\assets', req.file.filename);
//             const { firstName, lastName, email, phone } = req.body;
//             const metadata = { firstName, lastName, email, phone };
//             uploadImage(filePath, req.file.filename, req.file.mimetype, metadata);
//             res.status(200).json({ message: 'Image uploaded successfully' });
//           });
//     }

//     const idExist = await gfs.files.findOne({ _id: id });

//     if(idExist){
//         try {
//             const { id, firstName, lastName, email, phone } = req.body;
//             const updateResult = await gfs.files.updateOne(
//               { _id: mongoose.Types.ObjectId(id) },
//               { $set: { "metadata.firstName": firstName, "metadata.lastName": lastName, "metadata.email": email, "metadata.phone": phone } }
//             );
//             if (updateResult.modifiedCount === 0) {
//               return res.status(404).json({ error: 'File not found' });
//             }
//             res.status(200).json({ message: 'Details updated successfully' });
//           } catch (err) {
//             console.error('Error updating details:', err);
//             res.status(500).json({ error: 'Failed to update details' });
//           }
//     }
    
//   };



