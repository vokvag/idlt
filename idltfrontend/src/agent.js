const superagent = require('superagent-promise')(require('superagent'), global.Promise);

const API_ROOT = 'http://127.0.0.1:8000/api';

//const encode = encodeURIComponent;
const responseBody = res => res.body;

let token = null;
const tokenPlugin = req => {
    if (token) {
        req.set('authorization', `Token ${token}`);
    }
}

const requests = {
    del: url =>
        superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
    get: url =>
        superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
    put: (url, body) =>
        superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
    post: (url, body) =>
        superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
};

const Auth = {
    current: () =>
        requests.get('/user'),
    login: (email, password) =>
        requests.post('/users/login', { user: { email, password } }),
    register: (username, email, password) =>
        requests.post('/users', { user: { username, email, password } }),
    save: user =>
        requests.put('/user', { user })
};

const Prolang = {
    get: () =>
        requests.get('/prolangs'),
};

const Articles = {
    plCategories: (firstpl, secondpl) =>
        requests.get(`/categories?prolang1=${firstpl}&prolang2=${secondpl}`),
    plArticle: (nameslug, firstpl, secondpl,subcategory='yes') =>
        requests.get(`/articles?prolang1=${firstpl}&prolang2=${secondpl}&nameslug=${nameslug}&subcategory=${subcategory}`),
    createCategory: (name, nameslug, sort_order, parentcategory) =>
        requests.post(`/modifycategory`, {"category":{name, nameslug, sort_order, parentcategory}}),
    updateCategory: (nameslug, category) =>
        requests.put(`/modifycategory/${nameslug}`, { category }),
    deleteCategory: (nameslug) =>
        requests.del(`/modifycategory/${nameslug}`),
    createArticle: (prolang,category,article) =>
        requests.post(`/modifyarticle`, {"newarticle":{prolang,category,article}}),
    deleteArticle: (id) =>
        requests.del(`/modifyarticle/${id}`),
    updateArticle: (plwc, title, body) =>
        requests.put(`/updatearticle/${plwc}`, {"article": {plwc, title, body}})
};


// const Comments = {
//     create: (slug, comment) =>
//         requests.post(`/articles/${slug}/comments`, { comment }),
//     delete: (slug, commentId) =>
//         requests.del(`/articles/${slug}/comments/${commentId}`),
//     forArticle: slug =>
//         requests.get(`/articles/${slug}/comments`)
// };

const Profile = {
    follow: username =>
        requests.post(`/profiles/${username}/follow`),
    get: username =>
        requests.get(`/profiles/${username}`),
    unfollow: username =>
        requests.del(`/profiles/${username}/follow`)
};

export default {
    Articles,
    Auth,
    // Comments,
    Profile,
    Prolang,
    setToken: _token => { token = _token; },
};