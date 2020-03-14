import mongoose from 'mongoose';

const SourceHtmlSchema = mongoose.Schema({
  megyeKod: Number,
  telepulesKod: Number,
	szavkorSorszam: Number,
	url: String,
	html: String,
},
{
  timestamps: true
})

export default mongoose.model('SourceHtml', SourceHtmlSchema);