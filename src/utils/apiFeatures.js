class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
    this.where = {};
    this.pagination = {};
  }

  // Filtering
  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'limit', 'search', 'sort'];
    excludedFields.forEach((field) => delete queryObj[field]);

    // Build where clause for Prisma
    if (queryObj.status) {
      this.where.status = queryObj.status;
    }

    if (queryObj.priority) {
      this.where.priority = queryObj.priority;
    }

    return this;
  }

  // Search
  search() {
    if (this.queryString.search) {
      this.where.OR = [
        {
          title: {
            contains: this.queryString.search,
            mode: 'insensitive',
          },
        },
        {
          description: {
            contains: this.queryString.search,
            mode: 'insensitive',
          },
        },
      ];
    }

    return this;
  }

  // Pagination
  paginate() {
    const page = parseInt(this.queryString.page) || 1;
    const limit = parseInt(this.queryString.limit) || 10;
    const skip = (page - 1) * limit;

    this.pagination = {
      skip,
      take: limit,
      page,
      limit,
    };

    return this;
  }

  // Get where clause
  getWhere() {
    return this.where;
  }

  // Get pagination
  getPagination() {
    return this.pagination;
  }
}

module.exports = APIFeatures;
