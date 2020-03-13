// debounce.js  防抖封装
let timeout = null;
const debounce = (cb, wait = 500) => {
  if (timeout !== null) clearTimeout(timeout);
  timeout = setTimeout(() => {
    timeout = null;
    cb && cb()
  }, wait);
};
export {debounce}
