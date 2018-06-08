import * as types from '../../constants/actionTypes';
import * as urls from '../../constants/urls';

const setRoutes = routes => {
  return { type: types.FETCH_ROUTES_SUCCESS, routes };
};

const setError = error => {
  return { type: types.FETCH_ROUTES_ERROR, error };
};

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

// const compare = (a,b) => {
//   return a.name > b.name ? 1 : -1;
// };

// const fetchRoutes = () => async dispatch => {
//   dispatch({ type: types.FETCH_ROUTES_PENDING });

//   try {
//     const fetchedRoutes = await fetch(urls.MENUS_URL, { method: 'GET' });
//     const fetchedRoutesToJSON = await fetchedRoutes.json();
//     console.log(fetchedRoutesToJSON);

//     // const sortedRoutes = fetchedRoutesToJSON.sort(compare);

//     return dispatch(setRoutes(fetchedRoutesToJSON));
//   } catch (e) {
//     return dispatch(setError(e));
//   }
// };

const getPath = url => {
  const parts = url.split('/');
  return parts.length > 2 ? parts[parts.length - 2] : '';
};

const filterRouteData = menuData => {
  return menuData.map((item, idx) => {
    if (item.children) {
      item.children.map((item, idx) => {
        item.path = getPath(item.url);
        return item;
      });
    }
    item.path = getPath(item.url);
    return item;
  });
};

const fetchRoutes = () => dispatch => {
  dispatch({ type: types.FETCH_ROUTES_PENDING });

  return fetch(urls.MENUS_URL)
    .then(handleErrors)
    .then(res => res.json())
    .then(json => {
      const data = filterRouteData(json.items);
      dispatch(setRoutes(data));
      return data;
    })
    .catch(error => dispatch(setError(error)));
};

export default fetchRoutes;
