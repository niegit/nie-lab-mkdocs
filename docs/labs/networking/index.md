# Overview

The Networking lab section is intended to help get you comfortable with general networking information and processes related to Network It Easy. From configuring new hardware like firewalls and switches, to implementing VLANs for VoIP platforms, to troubleshooting common networking problems. All we ask is for your attention and effort in working through these logs. Let's raise the tide together!

The information below will be useful throughout the networking portion of the labs. Here you will find common VLANs and networks, device specific information, and common tasks used throughout such as backing up and restoring configurations. 

Good luck! Please reach out to your manager or appropriate resources if you need assistance.

<br><br>

# Lab Information and Details

## 🔶 VLAN Summary

This section provides an overview of all VLANs in the lab, including their associated IDs, subnets, default gateways, DHCP servers, and ranges. Each VLAN serves to isolate network traffic for different purposes, ensuring better security and performance.

| **VLAN Name** | **VLAN ID** | **Subnet**         | **Default Gateway** | **DHCP Server** | **DHCP Range**          |
|---------------|-------------|--------------------|---------------------|-----------------|-------------------------|
{% for vlan in extra.vlans.values() -%}
| {{ vlan.name }} | {{ vlan.id }} | {{ vlan.subnet }} | {{ vlan.gateway }} | {{ vlan.dhcp_server | default("Not Assigned") }} | {{ vlan.dhcp_range | default("Not Defined") }} |
{% endfor %}

---

## 🖧 Device Summary

This section lists all devices in the lab environment. It includes details about each device's name, type, IP address, and which VLAN it belongs to. This helps in identifying the devices and understanding how they are connected within the network.

| **Device Name** | **Type**          | **IP Address**     | **VLAN**   | **MAC Address**        | **Description**        |
|-----------------|-------------------|--------------------|-----------|------------------------|-------------------------|
{% for device in extra.devices.values() -%}
| {{ device.name }} | {{ device.type }}  | {{ device.ip }}     | {{ device.vlan }} | {{ device.mac | default("Not Available") }} | {{ device.description | default("No description defined.") }} |
{% endfor %}

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
