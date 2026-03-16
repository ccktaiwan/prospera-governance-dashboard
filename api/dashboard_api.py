from api.services.registry_service import RegistryService
import json
from datetime import date, datetime

# 修正處理程序：將日期物件轉為字串
def json_serial(obj):
    if isinstance(obj, (datetime, date)):
        return obj.isoformat()
    raise TypeError ("Type %s not serializable" % type(obj))

class GovernanceAPI:
    def __init__(self):
        self.service = RegistryService()

    def system_health(self):
        data = self.service.get_health_status()
        return json.dumps(data, default=json_serial, indent=2)

    def repository_topology(self):
        data = self.service.get_full_topology()
        return json.dumps(data, default=json_serial, indent=2)

    def governance_alerts(self):
        health = self.service.get_health_status()
        alerts = []
        if not health.get('is_valid', False):
            alerts.append({"severity": "CRITICAL", "message": "System integrity compromised!"})
        return json.dumps(alerts, default=json_serial, indent=2)

if __name__ == "__main__":
    api = GovernanceAPI()
    print("\n--- [API OUTPUT: SYSTEM HEALTH] ---")
    print(api.system_health())
    print("\n--- [API OUTPUT: REPOSITORY TOPOLOGY] ---")
    print(api.repository_topology())
