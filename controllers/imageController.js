const imageModel = require('../models/imageModel');
const fs = require('fs');


const createImage = async (req, res)=>{
    const { imageDescription } = req.body;
    // console.log(req.files)
    const profile = new imageModel( {
        imageDescription,
        image: req.files[ "image" ][ 0 ].filename,
    } );
    try {
        const savedImage = await profile.save();
        if ( savedImage ) {
            res.status( 201 ).json( {
                message: "Image Details saved successfully",
                data: savedImage
            })
        } else {
            res.status( 400 ).json( {
                message: "Could not create Image Details"
            })
        }
    } catch ( e ) {
        res.status( 500 ).json( {
            message: e.message
        })
    }
};


const getImages = async ( req, res ) => {
    try {
        const images = await imageModel.find();
        if ( images.length === 0 ) {
            res.status( 400 ).json( {
                message: "No profile is available"
            })
        } else {
            res.status( 200 ).json( {
                message: "All images",
                data: images,
                totalimages: images.length
            })
        }
    } catch ( e ) {
        res.status( 500 ).json( {
            message: e.message
        })
    }
}



const getImage = async ( req, res ) => {
    try {
        const imageId = req.params.id;
        const imageDetails = await imageModel.findById( imageId );
        if ( !imageDetails ) {
            res.status( 404 ).json( {
                message: "No Image found."
            })
        } else {
            res.status( 200 ).json( {
                data: imageDetails
            })
        }
    } catch ( e ) {
        res.status( 500 ).json( {
            message: e.message
        })
    }
};




const updateImage = async (req, res) => {
    const imageId = req.params.id;
    const profile = await imageModel.findById( imageId );
    try {
      const { imageDescription } = req.body;
      const updateFields = {
        imageDescription: imageDescription || profile.imageDescription,
        image: profile.image,
        };
  
      // check if the profileImage is to be updated
      if (req.files && req.files["image"]) {
        const oldProfileImagePath = `uploads/${profile.image}`;
        // Delete the old image if it exists
        if (fs.existsSync(oldProfileImagePath)) {
          fs.unlinkSync(oldProfileImagePath);
        }
        updateFields.image = req.files.image[0].filename;
      }
  
      const updatedProfile = await imageModel.findByIdAndUpdate(
        imageId,
        updateFields,
        { new: true }
        );
        // console.log(updatedProfile)
      if (updatedProfile) {
        res.status(200).json({
          message: 'Updated successfully',
          data: updatedProfile,
        });
      } else {
        res.status(404).json({
          message: 'Profile not found.',
        });
      }
    } catch (e) {
      res.status(500).json({
        message: e.message,
      });
    }
  };




// Delete a particular profile
const deleteImage = async (req, res) => {
    const imageId = req.params.id;
    try {
      const profile = await imageModel.findById(imageId);
      if (!profile) {
        return res.status(404).json({
          message: 'Profile not found.',
        });
      }
      const profileImagePath = `uploads/${profile.image}`;
      if (fs.existsSync(profileImagePath)) {
        fs.unlinkSync(profileImagePath);
      }
      await imageModel.findByIdAndDelete(imageId);
      res.status(200).json({
        message: 'Profile deleted successfully',
      });
    } catch (e) {
      res.status(500).json({
        message: e.message,
      });
    }
};



module.exports = {
    createImage,
    getImages,
    getImage,
    updateImage,
    deleteImage
}