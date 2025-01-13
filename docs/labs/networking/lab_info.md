# Network Inventory

## VLAN Summary

| VLAN Name    | VLAN ID | Subnet           | Default Gateway |
|--------------|---------|------------------|-----------------|
| LAN | 1   | 192.168.10.0/24 | 192.168.10.1 |
| SECURITY | 20   | 192.168.20.0/24 | 192.168.20.1 |
| VOIP | 30   | 192.168.30.0/24 | 192.168.30.1 |
| GUEST | 40   | 192.168.40.0/26 | 192.168.40.1 |


## Device Summary

| Device Name | Type           | IP Address      | VLAN |
|-------------|----------------|-----------------|------|
| SW01 | Cisco Switch | 192.168.10.2 | LAN |
| SW02 | Aruba Switch | 192.168.10.3 | LAN |
| AP01 | Access Point | 192.168.10.5 | LAN |
| DC01 | Windows Server | 192.168.10.10 | LAN |
| Allworx | Allworx Server | 192.168.30.254 | VOIP |
