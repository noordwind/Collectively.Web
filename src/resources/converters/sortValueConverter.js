export class SortValueConverter {
  toView(array, config) {
    let factor = (config.direction || 'ascending') === 'ascending' ? 1 : -1;
    return array
      .slice(0)
      .sort((a, b) => {
        return (Number(a[config.propertyName]) - Number(b[config.propertyName])) * factor;
      });
  }
}
