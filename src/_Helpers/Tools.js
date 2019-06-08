const moment = require('moment');
module.exports = {
  formatDate(date) {
    return moment(date).format('YYYY-MM-DD');
  },
  validateFields(body, requiredFields, notRequiredFields)  {
    let fields = [];
    Object.keys(body).forEach(prop => {
      let field = requiredFields.find(item => item.name == prop);
      if (!field && !notRequiredFields.includes(prop))
        fields.push(prop);
    });
    return fields
  }
}