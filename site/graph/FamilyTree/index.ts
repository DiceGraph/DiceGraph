import * as data from './data.json';
import { FamilyTreeGraph } from '../../../source';
import img from '../../assets/familytree.jpg'

export default {
  type: 'render',
  data,
  GraphClass: FamilyTreeGraph,
  className: 'FamilyTreeGraph',
  title: 'Family Tree',
  description: 'All family together, no matter now or later',
  img,
  structure: {
    name: `string`,
    img: `string`,
    desc: `string`,
    children: `data[]`,
    mate: `data`,
    gender: `male | female`
  }
}