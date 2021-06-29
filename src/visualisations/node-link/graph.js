export class Graph {
  constructor(emails, sentimentThreshold) {
    this.emails = emails;
    this.sentimentThreshold = sentimentThreshold;
  }

  parse() {
    const { edgesCount, nodesMap } = this._parseRawEmails(this.emails);

    let links = this._computeUniqueLinks(edgesCount);
    let nodes = this._computeUniqueNodes(nodesMap);

    return { nodes, links };
  }

  // This method is overcomplicated, but not worth changing right now
  _parseRawEmails(emails) {
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
        (element) =>
          // Edges are undirected
          (element["source"] === u && element["target"] === v) ||
          (element["source"] === v && element["target"] === u)
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
      const avgSentiment =
        edgesCount[i]["sentiment"].reduce((a, b) => a + b, 0) /
        edgesCount[i]["sentiment"].length;
      let sentimentType = 0;
      if (avgSentiment < -this.sentimentThreshold) sentimentType = -1;
      if (avgSentiment > this.sentimentThreshold) sentimentType = 1;

      links.push({
        source: edgesCount[i]["source"],
        target: edgesCount[i]["target"],
        weight: edgesCount[i]["index"].length,
        avgSentiment: avgSentiment,
        sentimentType: sentimentType,
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
