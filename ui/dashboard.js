/* =========================================================
AI HEADER
=========================================================
FILE: dashboard.js
MODULE: prospera_governance_dashboard
COMPONENT: Architect_UI
TYPE: Frontend Data Controller

PURPOSE
-------
Client-side controller responsible for fetching governance
data from the Prospera Governance Dashboard API and rendering
the results inside the Architect UI.

This module enables real-time visualization of system
observability signals derived from the SSOT registry layer.

ARCHITECTURE LAYER
------------------
SG - Observability

DATA SOURCES
------------
/system-health
/repository-topology
/governance-alerts

DEPENDENCIES
------------
dashboard_api.py
registry_service.py

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
UTILITY
------------------------------------------------------- */

async function fetchJSON(endpoint) {

    try {

        const response = await fetch(endpoint)

        if (!response.ok) {

            throw new Error("API request failed: " + endpoint)

        }

        return await response.json()

    }

    catch (error) {

        console.error("Governance Dashboard API error:", error)

        return { error: error.message }

    }

}



/* -------------------------------------------------------
SYSTEM HEALTH
------------------------------------------------------- */

async function renderSystemHealth() {

    const data = await fetchJSON("/system-health")

    const target = document.getElementById("system-health")

    if (!target) return

    target.textContent = JSON.stringify(data, null, 2)

}



/* -------------------------------------------------------
REPOSITORY TOPOLOGY
------------------------------------------------------- */

async function renderTopology() {

    const data = await fetchJSON("/repository-topology")

    const target = document.getElementById("repo-topology")

    if (!target) return

    target.textContent = JSON.stringify(data, null, 2)

}



/* -------------------------------------------------------
GOVERNANCE ALERTS
------------------------------------------------------- */

async function renderAlerts() {

    const data = await fetchJSON("/governance-alerts")

    const target = document.getElementById("alerts")

    if (!target) return

    target.textContent = JSON.stringify(data, null, 2)

}



/* -------------------------------------------------------
INITIALIZATION
------------------------------------------------------- */

async function initializeDashboard() {

    console.log("Prospera Architect UI initialized")

    await renderSystemHealth()

    await renderTopology()

    await renderAlerts()

}



/* -------------------------------------------------------
AUTO REFRESH LOOP
------------------------------------------------------- */

function startAutoRefresh(interval = 15000) {

    setInterval(async () => {

        console.log("Refreshing governance telemetry...")

        await initializeDashboard()

    }, interval)

}



/* -------------------------------------------------------
BOOTSTRAP
------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", async () => {

    await initializeDashboard()

    startAutoRefresh()

})
