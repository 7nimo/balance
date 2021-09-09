export const capitalize = (string: string) =>
  string[0].toUpperCase() + string.slice(1);

export const parseDate = (input, format) => {
  format = format || 'yyyy-mm-dd'; // default format
  let parts = input.match(/(\d+)/g), 
      i = 0, fmt = {};
  // extract date-part indexes from the format
  format.replace(/(yyyy|dd|mm)/g, (part) => { fmt[part] = i++; });

  return new Date(parts[fmt['yyyy']], parts[fmt['mm']]-1, parts[fmt['dd']]);
}