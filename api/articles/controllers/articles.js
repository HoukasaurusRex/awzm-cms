'use strict';
const { sanitizeEntity } = require('strapi-utils')

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

/** Filter to include only "published" articles in api response */
module.exports = {
  async find(ctx) {

    ctx.query = {
      ...ctx.query,
      status: 'published'
    }

    const entities = ctx.query._q
      ? await strapi.services.articles.search(ctx.query)
      : await strapi.services.articles.find(ctx.query)

    return entities.map(entity =>
      sanitizeEntity(entity, { model: strapi.models.articles })
    )
  },
}

