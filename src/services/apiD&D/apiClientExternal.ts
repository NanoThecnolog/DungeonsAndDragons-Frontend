import { setupAPIClientExternal } from './apiExternal';

const apiClient = setupAPIClientExternal();

apiClient.get('/spells')
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error("Error fetching data:", error);
    });