import { now } from "core-js/core/date";

export class DataParser {
  constructor(emails) {
    this.emails = emails;
  }

  parseData() {
    const { edgesCount, nodesMap } = this._parseRawEmails();

    let links = this._computeUniqueLinks(edgesCount);
    let nodes = this._computeUniqueNodes(nodesMap);

    return { nodes, links };
  }

  // This method is overcomplicated, but not worth changing right now
  _parseRawEmails() {
    const emails = this.emails;

    // Maps for finding unique nodes and edges
    const nodesMap = new Map(),
      edgesCount = [];

    // Iterate through {emails} to compute {nodesMap} and {edgesCount}
    for (let i = 0; i < emails.length; i++) {
      let u = parseInt(emails[i]["fromId"]);
      let v = parseInt(emails[i]["toId"]);
      let sentiment = parseFloat(emails[i]["sentiment"]);

      nodesMap.set(u, { id: u });
      nodesMap.set(v, { id: v });

      // Get index of edge in {edges}
      let indexOfEdge = edgesCount.findIndex(
        (element) => element["source"] === u && element["target"] === v
      );
      // If edge does not exist
      if (indexOfEdge === -1) {
        // Push the edge
        edgesCount.push({
          source: u,
          target: v,
          index: [i],
          sentiment: [sentiment],
        });
      } else {
        // Else add new index
        edgesCount[indexOfEdge]["index"].push(i);
        edgesCount[indexOfEdge]["sentiment"].push(sentiment);
      }
    }
    return { edgesCount, nodesMap };
  }

  _computeUniqueLinks(edgesCount) {
    const links = [];

    // Compute {links} from {edgesCount} because Maps are stupid in JS
    for (let i = 0; i < edgesCount.length; i++) {
      links.push({
        source: edgesCount[i]["source"],
        target: edgesCount[i]["target"],
        weight: edgesCount[i]["index"].length,
        avgSentiment:
          edgesCount[i]["sentiment"].reduce((a, b) => a + b, 0) /
          edgesCount[i]["sentiment"].length,
      });
    }

    return links;
  }

  _computeUniqueNodes(nodesMap) {
    const nodes = [];

    // Compute {nodes} from {nodesMap} by iterating because JS! >:(
    var temp = Array.from(nodesMap.values());
    for (let i = 0; i < temp.length; i++) nodes.push(temp[i]);

    return nodes;
  }
}
