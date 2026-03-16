/* =========================================================
AI HEADER
=========================================================
FILE: governance_graph.js
MODULE: prospera_governance_dashboard
COMPONENT: Governance Graph Engine
TYPE: Visualization Engine

PURPOSE
-------
Render the Prospera ecosystem topology graph in the
Governance Dashboard.

The graph represents relationships between:

• repositories
• agents
• workflows
• assets

The visualization allows architects to inspect the
structural integrity of the Prospera ecosystem.

ARCHITECTURE LAYER
------------------
SG - Observability

DATA SOURCES
------------
/repository-topology

DEPENDENCIES
------------
dashboard_api.py
registry_service.py
Cytoscape.js (graph engine)

GOVERNANCE AUTHORITY
--------------------
Prospera Governance Core

SPECIFICATION MATRIX
--------------------
PGC-REG-MATRIX-2026-034

SCHEMA VERSION
--------------
1.0
========================================================= */


/* -------------------------------------------------------
GRAPH INITIALIZATION
------------------------------------------------------- */

async function renderGovernanceGraph() {

    const response = await fetch("/repository-topology")

    const topology = await response.json()

    const elements = []


    /* ---------------------------------------------
    REPOSITORY NODES
    --------------------------------------------- */

    topology.repositories.forEach(repo => {

        elements.push({
            data: {
                id: repo.id,
                label: repo.name,
                type: "repository"
            }
        })

    })


    /* ---------------------------------------------
    DEPENDENCY EDGES
    --------------------------------------------- */

    topology.dependencies.forEach(dep => {

        elements.push({
            data: {
                id: dep.source + "_" + dep.target,
                source: dep.source,
                target: dep.target
            }
        })

    })


    /* ---------------------------------------------
    CYTOSCAPE RENDER
    --------------------------------------------- */

    const cy = cytoscape({

        container: document.getElementById("governance-graph"),

        elements: elements,

        style: [

            {
                selector: "node",
                style: {
                    "background-color": "#4aa3ff",
                    "label": "data(label)",
                    "color": "#fff",
                    "text-valign": "center"
                }
            },

            {
                selector: "edge",
                style: {
                    "line-color": "#888",
                    "width": 2
                }
            }

        ],

        layout: {
            name: "cose"
        }

    })

}
