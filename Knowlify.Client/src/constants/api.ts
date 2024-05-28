export const API_URL = 'https://localhost:7273/api'

const ROUTES: IApiRoutes = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
  },
  user: {
    get: '/user',
    update: '/user',
    updateBasicProfileInfo: '/user/updateBasicProfileInfo',
    delete: '/user',
    add: '/user',
    all: '/user/all',
  },
  skill: {
    get: '/skill',
    update: '/skill',
    delete: '/skill',
    add: '/skill',
    all: '/skill/all',
  },
  transaction: {
    get: '/transaction',
    update: '/transaction',
    delete: '/transaction',
    add: '/transaction',
    all: '/transaction/all',
  },
  review: {
    get: '/review',
    update: '/review',
    delete: '/review',
    add: '/review',
    all: '/review/all',
  },
  barter: {
    get: '/barter',
    update: '/barter',
    delete: '/barter',
    add: '/barter',
    all: '/barter/all',
    GetAllBarterBySkillId: '/barter/GetAllBySkillId',
  },
}

function integrateApiUrl(apiRoutes: IApiRoutes) {
  const categories = Object.keys(apiRoutes)
  const integratedRoutes = {} as IApiRoutes
  categories.forEach((category) => {
    integratedRoutes[category] = {}
    Object.keys(apiRoutes[category]).forEach((action) => {
      integratedRoutes[category][action] =
        `${API_URL}${apiRoutes[category][action]}`
    })
  })

  return integratedRoutes
}

export const API_ROUTES = integrateApiUrl(ROUTES)

type IApiRoutes = Record<string, Record<string, string>>
