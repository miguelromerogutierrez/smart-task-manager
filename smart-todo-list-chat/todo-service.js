const apisauce = require('apisauce');
const api = apisauce.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  }
});

function callTodoAiApi(prompt) {
  return api.post('/todo/ai', { content: prompt });
}

module.exports = {
  callTodoAiApi,
};