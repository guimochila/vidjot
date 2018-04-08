const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const slug = require('slug');

// Slug default configuration
slug.defaults.modes['rfc3986'] = {
	lower: true
};

// Create Schema
const ideaSchema = new Schema({
	title: {
		type: String,
		required: 'Please, provide a title'
	},
	details: {
		type: String,
		required: 'Please, provide details.'
	},
	date: {
		type: Date,
		default: Date.now()
	},
	slug: {
		type: String,
		lowercase: true,
	}
});

ideaSchema.pre('save', async function (next) {
	if(!this.isModified('title')) {
		next();
		return;
	}

	this.slug = slug(this.title);

	const slugRegex = new RegExp(`ˆ(${this.slug})(-[0-9]*$)`, 'i');
	const ideaSlug = await this.constructor.find({ slug: slugRegex });

	if(ideaSlug.length) {
		this.slug = `${this.slug}-${ideaSlug.length + 1}`;
	}
	next();
});

module.exports = mongoose.model('Ideas', ideaSchema);
