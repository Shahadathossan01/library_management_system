const mongoose=require('mongoose')
const {Schema,model}=mongoose

const bookSchema = new Schema({
    name: String,
    authorName: String,
    summary: String,
    image: String,
    inStock: Number,
    status: {
      type: String,
      enum: ['available', 'out_of_stock'],
      default: 'available'
    }
  }, {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true, versionKey: false,transform: (_, ret) => {
        delete ret.id;
        return ret;
      } }
  })

bookSchema.virtual('reviews',{
    ref:'Review',
    localField: '_id',
    foreignField: 'book'
})

const Book=model('Book',bookSchema)

module.exports=Book;