import * as data from './data.json';
import { ERGraph } from '../../../../source';
import img from '../../../assets/ER.jpg'

export default {
  type: 'render',
  data: data["default"],
  GraphClass: ERGraph,
  className: 'ERGraph',
  title: 'ER Graph',
  description: 'Entity & Relation, Success & Determination',
  img,
  structure: {
    "id": "info",
    "label": "Employee",
    "attrs?[]": {
      "key": "string",
      "type?": "string",
      "label?": "string",
      "relation?[]": {
        "nodeId": "string",
        "key": "string",
        "label?": "string"
      },
    }
  }
}