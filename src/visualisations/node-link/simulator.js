import * as d3 from "d3";

export class Simulator {
  constructor(nodes, links, width, height) {
    this.nodes = nodes;
    this.links = links;
    this.width = width;
    this.height = height;
    this.centerX = width / 2;
    this.centerY = height / 2;
  }

  createForceSimulation() {
    this.simulation = d3.forceSimulation(this.nodes);

    this.simulation = this._addCenteringForce();
    this.simulation = this._addChargeForce();
    this.simulation = this._addLinkForce();
    this.simulation = this._addXYForces();

    return this.simulation;
  }

  // Add force that pulls nodes to center
  _addCenteringForce() {
    return this.simulation.force(
      "center",
      d3.forceCenter(this.centerX, this.centerY).strength(0.01)
    );
  }

  // Add force that makes nodes repel each other so they don't overlap
  _addChargeForce() {
    return this.simulation.force(
      "charge",
      d3
        .forceManyBody()
        .strength(function (d, i) {
          return i === 0 ? -60 : -40;
        })
        .distanceMax([Math.max(this.width, this.height) * 0.8])
    );
  }

  // Add force that pushes elements to be a fixed distance apart
  _addLinkForce() {
    return this.simulation.force(
      "link",
      d3.forceLink(this.links).id((link) => link.id)
    );
  }

  // Add force that attracts elements to specified positions
  _addXYForces() {
    return this.simulation
      .force("x", d3.forceX(this.centerX).strength(0.1))
      .force("y", d3.forceY(this.centerY).strength(0.1));
  }
}
