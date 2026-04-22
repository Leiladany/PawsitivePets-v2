const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const petSchema = new Schema(
  {
    petname: {
      type: String,
      required: true,
    },
    petsort: {
      type: [String],
      required: true,
      enum: ['cat', 'dog'],
    },
    petbreed: {
      type: String,
      required: true,
    },
    petbirth: {
      type: Date,
      required: true,
      trim: true,
    },
    petgender: {
      type: [String],
      required: true,
      enum: ['male', 'female'],
    },
    petcolor: {
      type: String,
      required: true,
    },
    pethair: {
      type: [String],
      required: true,
      enum: ['long hair', 'medium hair', 'short hair', 'no hair',
      'wavy hair', 'curly hair'],
    },
    petvaccines: {
      type: String,
    },
    petvaccinesdate: {
      type: Date,
    },
    petpicture: {
      type: String
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
  
);

const Pet = model("Pet", petSchema);

module.exports = Pet;