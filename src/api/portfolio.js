import http from './http';

export const getPublicData = async () => {
  const { data } = await http.get('/public');
  return data;
};

export const getProjects = async () => {
  const { data } = await http.get('/projects');
  return data;
};

export const getProjectBySlug = async (slug) => {
  const { data } = await http.get(`/projects/${slug}`);
  return data;
};

export const sendContactMessage = async (payload) => {
  const { data } = await http.post('/contact', payload);
  return data;
};

export const adminApi = {
  login: async (payload) => (await http.post('/auth/login', payload)).data,
  me: async () => (await http.get('/auth/me')).data,
  stats: async () => (await http.get('/admin/stats')).data,
  list: async (resource) => (await http.get(`/admin/${resource}`)).data,
  create: async (resource, payload) => (await http.post(`/admin/${resource}`, payload)).data,
  update: async (resource, id, payload) => (await http.put(`/admin/${resource}/${id}`, payload)).data,
  remove: async (resource, id) => (await http.delete(`/admin/${resource}/${id}`)).data,
  settings: async () => (await http.get('/admin/settings')).data,
  updateSettings: async (payload) => (await http.put('/admin/settings', payload)).data,
  upload: async (formData) =>
    (await http.post('/admin/uploads', formData, { headers: { 'Content-Type': 'multipart/form-data' } })).data
};
