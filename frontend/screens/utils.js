import vinylAxios from 'axios';

export const truncStr = (string, limit) => {
  return string.length > limit
    ? string
        .trim()
        .substring(0, limit - 3)
        .trim() + '...'
    : string;
};

const resources = {};

const makeRequestCreator = () => {
  let cancel;

  return async (query, accessData) => {
    if (cancel) {
      // Cancel the previous request before making a new request
      cancel.cancel();
    }
    // Create a new CancelToken
    cancel = vinylAxios.CancelToken.source();
    try {
      if (resources[query]) {
        // Return result if it exists
        return resources[query];
      }
      const result = await vinylAxios.post(query, accessData, {
        cancelToken: cancel.token,
      });

      // Store response
      resources[query] = result;

      return result;
    } catch (error) {
      if (vinylAxios.isCancel(error)) {
        // Handle if request was cancelled
        console.log('Request canceled', error.message);
      } else {
        // Handle usual errors
        console.log('Something went wrong: ', error.message);
      }
    }
  };
};

export const search = makeRequestCreator();
