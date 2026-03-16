from api.services.registry_service import RegistryService
import json

class GovernanceAPI:
    def __init__(self):
        self.service = RegistryService()

    def system_health(self):
        # /system-health
        return json.dumps(self.service.get_health_status(), indent=2)

    def repository_topology(self):
        # /repository-topology
        return json.dumps(self.service.get_full_topology(), indent=2)

    def governance_alerts(self):
        # /governance-alerts
        health = self.service.get_health_status()
        alerts = []
        if not health['is_valid']:
            alerts.append({"severity": "CRITICAL", "message": "System integrity compromised!"})
        return json.dumps(alerts, indent=2)

if __name__ == "__main__":
    api = GovernanceAPI()
    print("--- System Health ---")
    print(api.system_health())
