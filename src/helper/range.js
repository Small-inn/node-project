module.exports = (totalSize, req, res) => {
  const range = req.headers['range'];
  if (!range) {
    code: 200;
  }

  const sizes = range.match(/bytes=(\d*)-(\d*)/);
  const end = sizes[2] || totalSize - 1;
  const start = size[1] || totalSize - end;

  if (start > end || start < 0 || end > totalSize) {
      return { code: 200 };
  }
  res.setHeader('Accept-Ranges', 'bytes');
  res.setHeader('Content-Range', `bytes ${start} - ${end}`);
  res.setHeader('Content-Length', end - start);

  return {
      code: 206,
      start: parseInt(start),
      end: parseInt(end)
  };
};
