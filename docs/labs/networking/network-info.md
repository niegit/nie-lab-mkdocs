
# Lab Resources

The information below will be used throughout all Networking labs and will be a helpful "cheat sheet" of information. While each lab will strive to give you the information needed to complete it, this page will serve as a single resource where common information such as VLANs and IP addresses can be located for all networking labs. 

If you find any consistencies please let the proper resources know so that we can address them! We want to give you the best lab experience possible. 😊

### 🌐 **VLAN Summary**

Get an at-a-glance overview of VLAN configurations, including IDs, subnets, and DHCP settings.

| **VLAN Name** | **VLAN ID** | **Subnet**         | **Default Gateway** | **DHCP Server**       | **DHCP Range**          |
|---------------|-------------|--------------------|---------------------|-----------------------|-------------------------|
{% for vlan in extra.vlans.values() -%}
| {{ vlan.name }} | {{ vlan.id }} | {{ vlan.subnet }} | {{ vlan.gateway }} | {{ vlan.dhcp_server | default("Not Assigned") }} | {{ vlan.dhcp_range | default("Not Defined") }} |
{% endfor %}

---

### 💻 **Device Summary**

Easily locate lab devices and their key details, including IPs, VLANs, and descriptions.

| **Device Name** | **Type**          | **IP Address**     | **VLAN**   | **MAC Address**        | **Description**        |
|-----------------|-------------------|--------------------|-----------|------------------------|-------------------------|
{% for device in extra.devices.values() -%}
| {{ device.name }} | {{ device.type | default("Not Available")}}  | {{ device.ip | default("Not Available")}}     | {{ device.vlan }}| default("Not Available") | {{ device.mac | default("Not Available") }} | {{ device.description | default("No description defined.") }} |
{% endfor %}

---

### 🔄 **Network Design and Topology**

This section outlines the physical and logical setup of the lab network for better visualization and troubleshooting.

#### Firewall Uplink
- **Port 0 (WAN)**: Connects to the Lab Internet wall port  
- **Port 1 (LAN)**: Connects to **{{ devices.cisco_switch.name }}**'s GE1  

#### Cisco Switch Uplinks
- **GE1**: Connects to **{{ devices.firewall.name }}** Port 1 (LAN)  
- **GE2**: Connects to **{{ devices.ap01.name }}**
- **GE3**: Connects to **{{ devices.dc01.name }}**'s NIC (Raspberry Pi)  
- **GE24**: Connects to **{{ devices.aruba_switch.name }}**'s GE1  

#### Aruba Switch Uplinks
- **GE1**: Connects to **{{ devices.cisco_switch.name }}**'s GE24 

