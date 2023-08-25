const createAccessToken = () => {
    let _token = undefined; // The "protected" variable
  
    return {
      setAccessToken: (token) => {
        _token = token
      },
      getAccessToken: () => {
        return _token;
      }
    };
  };

export const accessToken = createAccessToken();

const createBatchId = () => {
  let _token = undefined; // The "protected" variable

  return {
    setBatchId: (token) => {
      _token = token
    },
    getBatchId: () => {
      return _token;
    }
  };
};

export const batchId = createBatchId();