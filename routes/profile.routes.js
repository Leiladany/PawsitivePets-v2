const express = require('express')
const { isLoggedIn } = require('../middleware/route-guard')
const router = express.Router()
const Pet = require('../models/Pet.model')
const User = require('../models/User.model')


// require fileUploader in order to use it 
const fileUploader = require('../config/cloudinary.config').uploader;


router.get('/', isLoggedIn, (req, res) => {
  if (req.session.user) {
    // If signed in, render the 'profile' page
    res.render('profile', { user: req.session.user });
  } else {
    // If not signed in, render a different page (e.g., 'index' or 'home')
    res.render('index');
  }
  })



  router.get('/addpet', (req, res) => {
    res.render('animals/addpet', { user: req.session.user })

  })
//create a new pet
router.post('/addpet', fileUploader.single('petpicture'), async (req, res, next) => {
  try {
    if (!req.file) {
      // If req.file is undefined, log an error and return a response
      console.error('Error: No file uploaded');
      return res.status(400).send('No file uploaded');
    }

    const body = req.body;
    console.log(req.file);

    const createPet = await Pet.create({
      owner: req.session.user.id,
      petname: body.petname,
    petsort: body.petsort,
    petbreed: body.petbreed,
    petbirth: body.petbirth,
    petgender: body.petgender,  // Assuming there's a field named petgender in your form
    petcolor: body.petcolor,
    pethair: body.pethair,
    petvaccines: body.petvaccines,
    petvaccinesdate: body.petvaccinesdate,
    petpicture: req.file.path,
  });

  res.redirect('/profile');
  } catch (error) {
    // Handle any other errors that might occur during the process
    console.error('Error during file upload:', error);
    res.status(500).send('Internal Server Error');
  }
});

  router.get('/mypets', async (req, res) => {
    try {
      console.log(req.session.user)
      const allPets = await Pet.find({owner: req.session.user.id})

      res.render('animals/mypets', { mypets: allPets, user: req.session.user })
    } catch (error) {
      console.log('Route to all pets', error)
    }
  })

  router.get('/:mypetsId/details', async (req, res) => {
    try {
      const petFound = await Pet.findById(req.params.mypetsId);
      res.render('animals/one', { petFound, user: req.session.user });
    } catch (error) {
      console.error('Error fetching pet details:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  //  show pet & edit
  router.get('/:mypetsId/edit', async (req, res) => {
    try {
      const petFound = await Pet.findById(req.params.mypetsId).populate('owner');
      res.render('animals/updatePet', { petFound, user: req.session.user });
    } catch (error) {
      console.error('Error fetching pet details for editing:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  router.post('/:mypetsId/edit', fileUploader.single('petpicture'), async (req, res) => {
    try {
      if (req.file) {
        const newPet = {
          ...req.body,
          petpicture: req.file.path,
        };
  
        await Pet.findByIdAndUpdate(req.params.mypetsId, newPet);
        res.redirect(`/profile/${req.params.mypetsId}/details`);
      } else {
        const petFound = await Pet.findByIdAndUpdate(req.params.mypetsId, req.body);
        res.redirect(`/profile/${req.params.mypetsId}/details`);
      }
    } catch (error) {
      console.error('Error updating pet details:', error);
      res.status(500).send('Internal Server Error');
    }
  });




  router.post('/:mypetsId/delete', async (req, res) => {
    await Pet.findByIdAndDelete(req.params.mypetsId)
    res.redirect('/profile/mypets')
  })
  
  module.exports = router