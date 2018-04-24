import {get} from './util'

export const getList = (params) => {
  return get('/api/list', params)
}