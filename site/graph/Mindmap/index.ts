import * as data from './data.json';
import { MindMapGraph } from '../../../source';
import img from '../../assets/mindMap.jpg'

export default {
  type: 'render',
  data,
  GraphClass: MindMapGraph,
  className: 'MindMapGraph',
  title: 'Mind Map',
  description: 'Brain storm need a map to solve your mind.',
  img,
  structure: {
    id: `string`,
    label: `string`,
    color: `string`,
    children: `data[]`,
  }
}