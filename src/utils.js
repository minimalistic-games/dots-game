import config from 'src/config';

export function getColorCode(color, opacity) {
  return `rgba(${config.colorCodes[color].concat(opacity).join(',')})`;
}
