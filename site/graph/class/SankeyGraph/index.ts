import data from './data.json';
import { SankeyGraph } from '../../../../source';
import img from '../../../assets/Sankey.png'

export default {
  type: 'render',
  data,
  GraphClass: SankeyGraph,
  className: 'SankeyGraph',
  title: 'Sankey Graph',
  description: 'Flow in flow out, analyse inside out',
  img,
  structure: {
    id: `string`,
    label: `string`,
    color: `string?`,
    to: `{ target: nodeId, value: number }[]`,
  }
}