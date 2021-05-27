import * as d3 from "d3";

// Creates simulation & drag behaviour
export class Simulation {
  createForceSimulation(nodes, links, width, height) {
    this.simulation = d3.forceSimulation(nodes);

    this.simulation = this._addCenteringForce(width, height);
    this.simulation = this._addChargeForce(width, height);
    this.simulation = this._addLinkForce(links);
    this.simulation = this._addXYForces(width, height);

    return this.simulation;
  }

  drag(simulation) {
    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    return d3
      .drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);
  }

  // Add force that pulls nodes to center
  _addCenteringForce(width, height) {
    return this.simulation.force(
      "center",
      d3.forceCenter(width / 2, height / 2).strength(0.01)
    );
  }

  // Add force that makes nodes repel each other so they don't overlap
  _addChargeForce(width, height) {
    return this.simulation.force(
      "charge",
      d3
        .forceManyBody()
        .strength(function (d, i) {
          return i == 0 ? -60 : -40;
        })
        .distanceMax([Math.max(width, height) * 0.8])
    );
  }

  // Add force that pushes elements to be a fixed distance apart
  _addLinkForce(links) {
    return this.simulation.force(
      "link",
      d3.forceLink(links).id((link) => link.id)
    );
  }

  // Add force that attracts elements to specified positions
  _addXYForces(width, height) {
    return this.simulation
      .force("x", d3.forceX(width / 2).strength(0.1))
      .force("y", d3.forceY(height / 2).strength(0.1));
  }
}
