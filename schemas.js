const BaseJoi = require('joi');
const sanitizeHtml = require('sanitize-html');

const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value) return helpers.error('string.escapeHTML', { value })
                return clean;
            }
        }
    }
});

const Joi = BaseJoi.extend(extension)

module.exports.threadSchema = Joi.object({
    thread: Joi.object({
        // author: Joi.string().required().escapeHTML(),
        title: Joi.string().required().escapeHTML(),
        location: Joi.string().required().escapeHTML(),
    }).required(),
    deleteImages: Joi.array()
});

module.exports.postSchema = Joi.object({
    post: Joi.object({
        // author: Joi.string().required(),
        title: Joi.string().required(),
        body: Joi.string().required().escapeHTML()
    }).required()
})

module.exports.commentSchema = Joi.object({
    comment: Joi.object({
        title: Joi.string().required(),
        body: Joi.string().required().escapeHTML()
    }).required()
})