class APIFEATURES {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};
    // console.log("Keyword: ",keyword)

    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const queryTemp = { ...this.queryStr };

    // console.log(`Before removing fields: `, queryTemp);

    const fields = ["keyword", "page", "limit"];

    fields.forEach((i) => delete queryTemp[i]);
    // console.log(`After removing fields: `, queryTemp);

    let tempString = JSON.stringify(queryTemp);
    tempString = tempString.replace(/\b(gt|gte|lt|lte)\b/g, (i) => `$${i}`);

    // console.log(queryTemp);
    // console.log(tempString);

    this.query = this.query.find(JSON.parse(tempString));
    return this;
  }

  pagination(perPage){
    // let currentPage=1;

    // if(this.queryStr.page){
    //   currentPage = Number(this.queryStr.page)
    // }
    const currentPage = this.queryStr.page || 1;

    const skip = perPage * (currentPage-1);
    this.query = this.query.limit(perPage).skip(skip)
    return this
  }
}

module.exports = APIFEATURES;
