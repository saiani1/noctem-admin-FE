const wrapPromise = promise => {
  let status = 'pending';
  let result;
  const suspender = promise.then(
    response => {
      status = 'success';
      result = response;
    },
    error => {
      status = 'error';
      result = error;
    },
  );
  const read = () => {
    if (status === 'pending') throw suspender;
    else if (status === 'error') throw result;
    else if (status === 'success') return result;
    return null;
  };

  return { read };
};

export default wrapPromise;
