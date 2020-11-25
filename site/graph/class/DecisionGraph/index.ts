import data from './data.json';
import { DecisionGraph } from '../../../../source';
import img from '../../../assets/DecisionGraph.jpg'

export default {
  type: 'render',
  data,
  GraphClass: DecisionGraph,
  className: 'DecisionGraph',
  title: 'Decision Graph',
  description: 'Every decision matters, display in a graph',
  img,
  structure: {
    id: `string`,
    label: `string`,
    options: `{ [label: string]: id }`,
  }
}