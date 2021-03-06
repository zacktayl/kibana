import _ from 'lodash';

export function FilterBarLibMapGeoBoundingBoxProvider(Promise, courier) {
  return function (filter) {
    let key;
    let value;
    let topLeft;
    let bottomRight;
    let field;
    if (filter.geo_bounding_box) {
      return courier
      .indexPatterns
      .get(filter.meta.index).then(function (indexPattern) {
        key = _.keys(filter.geo_bounding_box)
          .filter(key => key !== 'ignore_unmapped')[0];
        field = indexPattern.fields.byName[key];
        topLeft = field.format.convert(filter.geo_bounding_box[field.name].top_left);
        bottomRight = field.format.convert(filter.geo_bounding_box[field.name].bottom_right);
        value = topLeft + ' to ' + bottomRight;
        return { key: key, value: value };
      });
    }
    return Promise.reject(filter);
  };
}
