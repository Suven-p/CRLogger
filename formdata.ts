function constructFormData(
  boundary: string,
  payloadData,
  blob: GoogleAppsScript.Base.Blob
) {
  let data = '';
  let payload: number[] = null;
  for (const key in payloadData) {
    if (payloadData.hasOwnProperty(key)) {
      data += '--' + boundary + '\r\n';
      data +=
        'Content-Disposition: form-data; name="' +
        key +
        '"; \r\n\r\n' +
        payloadData[key] +
        '\r\n';
    }
  }
  data += '--' + boundary + '\r\n';
  if (blob !== null) {
    data +=
      'Content-Disposition: form-data; name="file"; filename="' +
      blob.getName() +
      '"\r\n';
    data += 'Content-Type:' + blob.getContentType() + '\r\n\r\n';
    payload = Utilities.newBlob(data)
      .getBytes()
      .concat(blob.getBytes())
      .concat(Utilities.newBlob('\r\n--' + boundary + '--').getBytes());
  } else {
    payload = Utilities.newBlob(data).getBytes();
  }
  return payload;
}
