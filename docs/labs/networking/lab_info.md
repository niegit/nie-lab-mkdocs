# Lab Information and Details

## 🔶 VLAN Summary

This section provides an overview of all VLANs in the lab, including their associated IDs, subnets, and default gateways. Each VLAN serves to isolate network traffic for different purposes, ensuring better security and performance.

| **VLAN Name** | **VLAN ID** | **Subnet**         | **Default Gateway** | **Description**                          |
|---------------|-------------|--------------------|---------------------|------------------------------------------|
{% for vlan in extra.vlans.values() -%}
| {{ vlan.name }} | {{ vlan.id }} | {{ vlan.subnet }} | {{ vlan.gateway }} | {{ vlan.description | default("No description available.") }} |
{% endfor %}

---

## 🖧 Device Summary

This section lists all devices in the lab environment. It includes details about each device's name, type, IP address, and which VLAN it belongs to. This helps in identifying the devices and understanding how they are connected within the network.

| **Device Name** | **Type**          | **IP Address**     | **VLAN**   | **MAC Address**        | **Location**            | **Description**                                  |
|-----------------|-------------------|--------------------|-----------|------------------------|-------------------------|--------------------------------------------------|
{% for device in extra.devices.values() -%}
| {{ device.name }} | {{ device.type }}  | {{ device.ip }}     | {{ device.vlan }} | {{ device.mac_address | default("Not Available") }} | {{ device.location | default("Not Specified") }} | {{ device.description | default("No description defined.") }} |
{% endfor %}

---

## 🛠️ Configuration Details

This section outlines key configuration settings for the lab setup, including time settings, management IPs, and firmware versions.

- **Time Settings**: The lab's devices synchronize with an NTP server to ensure accurate timekeeping.
- **Management IPs**: Devices are assigned fixed IPs for remote management:
    - **Cisco Switch**: `{{ devices.cisco_switch.ip }}`
    - **Aruba Switch**: `{{ devices.aruba_switch.ip }}`
    - **Access Point**: `{{ devices.ap01.ip }}`
    - **Windows Server (DC01)**: `{{ devices.dc01.ip }}`
    - **Allworx Server**: `{{ devices.allworx.ip }}`
- **Firmware Versions**: Ensure that all devices run the latest available firmware.

---

## 🔄 Network Design and Topology

**Firewall Uplink**:

- Port 0 (WAN) to Lab Internet wall port
- Port 1 (LAN) to SW01's GE1

**Cisco Switch Uplinks**:

- GE1 to Firewall Port 1 (LAN)
- GE2 to Aruba Access Point
- GE3 to DC01's NIC (Raspberry Pi)
- GE24 to SW02's GE1

**Aruba Switch Uplinks**:

- GE1 to SW01's GE2

---

## 💾 Cisco Backup and Recovery Procedures

### Backup:
Configuration files are regularly backed up to ensure recovery in case of failure. **Backup Location**: `{{ devices.cisco_switch.backup_location | default("USB/HTTP") }}`
  
### Recovery:
To restore a configuration, use the **File Operations** section and upload the saved config file after performing a factory reset.

### End of Lab Information
