export default {
  // 简单判断是不是JSON字符串
  isJSON(val) {
    if (!val) {
      return false;
    }
    if (typeof val === 'number') {
      return false;
    }
    if (val.charAt(0) !== '{') {
      return false;
    }

    try {
      JSON.parse(val);
      return true;
    } catch (e) {
      return false;
    }
  },
};
