
function extractFormData (formRef) {
  const form_data = new FormData(formRef.current);
  let payload = {};
  form_data.forEach(function (value, key) {
    payload[key] = value;
  });

  return payload
}

export default {
  extractFormData
}
