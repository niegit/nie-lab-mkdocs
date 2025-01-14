# Networking Lab Overview

Welcome to the **Networking** section—a place designed to help you sharpen your networking skills and explore Network It Easy’s operations in a hands-on, safe environment. From configuring firewalls and switches to implementing VLANs for VoIP or troubleshooting network issues, this lab empowers you to experiment freely. Reset configurations and practice as much as you like without affecting a customer's network.  

!!! tip
    **This is your safe space to fail and learn, so step outside your comfort zone and dive in! For guidance, don’t hesitate to reach out to your manager or other resources.**

---

## Lab Resources

### 🔶 **VLAN Summary**

Get an at-a-glance overview of VLAN configurations, including IDs, subnets, and DHCP settings. These VLANs are designed to optimize security and network performance.

| **VLAN Name** | **VLAN ID** | **Subnet**         | **Default Gateway** | **DHCP Server**       | **DHCP Range**          |
|---------------|-------------|--------------------|---------------------|-----------------------|-------------------------|
{% for vlan in extra.vlans.values() -%}
| {{ vlan.name }} | {{ vlan.id }} | {{ vlan.subnet }} | {{ vlan.gateway }} | {{ vlan.dhcp_server | default("Not Assigned") }} | {{ vlan.dhcp_range | default("Not Defined") }} |
{% endfor %}

---

### 🖧 **Device Summary**

Easily locate lab devices and their key details, including IPs, VLANs, and descriptions, to understand their roles in the network.

| **Device Name** | **Type**          | **IP Address**     | **VLAN**   | **MAC Address**        | **Description**        |
|-----------------|-------------------|--------------------|-----------|------------------------|-------------------------|
{% for device in extra.devices.values() -%}
| {{ device.name }} | {{ device.type }}  | {{ device.ip }}     | {{ device.vlan }} | {{ device.mac | default("Not Available") }} | {{ device.description | default("No description defined.") }} |
{% endfor %}

---

### 🔄 **Network Design and Topology**

This section outlines the physical and logical setup of the lab network for better visualization and troubleshooting.

#### Firewall Uplink
- **Port 0 (WAN)**: Connects to the Lab Internet wall port  
- **Port 1 (LAN)**: Connects to SW01's GE1  

#### Cisco Switch Uplinks
- **GE1**: Connects to Firewall Port 1 (LAN)  
- **GE2**: Connects to Aruba Access Point  
- **GE3**: Connects to DC01's NIC (Raspberry Pi)  
- **GE24**: Connects to SW02's GE1  

#### Aruba Switch Uplinks
- **GE1**: Connects to SW01's GE2  

---

### 💾 **Cisco Backup and Recovery Procedures**

#### **Backup Process**  
Configurations are regularly backed up to prevent data loss.  
- **Backup Location**: `{{ devices.cisco_switch.backup_location | default("USB/HTTP") }}`  

#### **Recovery Process**  
Restore configurations by uploading the saved file via the **File Operations** section after performing a factory reset.  

---

## Tips for Success

- **Experiment Freely**: Feel confident resetting and reconfiguring devices.  
- **Learn Actively**: Refer to this page often for VLANs, devices, and network design details.  
- **Seek Support**: Your manager and peers are here to assist you when needed.  

Good luck and happy networking! 😊
