import fetch from 'auth/FetchInterceptor'

const exampleService = {}

exampleService.getUsers = function () {
  return fetch({
    url: '/users',
    method: 'get',
    headers: {
      'public-request': 'true'
    },
  })
}

exampleService.getPost = function (params) {
  return fetch({
    url: '/posts/1',
    method: 'get',
    params
  })
}

exampleService.setPost = function (data) {
  return fetch({
    url: '/posts',
    method: 'post',
    data: data
  })
}

export default exampleService