import yaml
import os

class RegistryService:
    def __init__(self, ssot_path=r'C:\Prospera_Audit\prospera-global-inventory\inventory'):
        self.ssot_path = ssot_path

    def _load_yaml(self, filename):
        path = os.path.join(self.ssot_path, filename)
        if os.path.exists(path):
            with open(path, 'r', encoding='utf-8') as f:
                return yaml.safe_load(f)
        return {}

    def get_full_topology(self):
        return {
            "domains": self._load_yaml('REPOSITORY_DOMAIN_REGISTRY.yaml'),
            "assets": self._load_yaml('ASSET_DOMAIN_REGISTRY.yaml'),
            "agents": self._load_yaml('AGENT_REGISTRY.yaml')
        }

    def get_health_status(self):
        report = self._load_yaml('GOVERNANCE_VALIDATION_REPORT.yaml')
        return {
            "status": report.get('validation_status', 'UNKNOWN'),
            "timestamp": report.get('timestamp'),
            "is_valid": report.get('validation_status') == 'GOVERNANCE_VALIDATED'
        }
