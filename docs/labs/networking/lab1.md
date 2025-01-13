# Lab 1: Setting Up a Cisco SG-350X 24P Switch Using the Web GUI

This lab guides you through the complete setup process of a Cisco SG-350X 24P switch using its web GUI. By the end of this lab, you'll have configured the switch, saved and backed up its configuration, and tested factory reset and restoration.

🎯 **What You'll Learn:**

1. 🛠️ Update firmware and add users/passwords.

2. 💾 Save the running configuration to startup configuration.

3. ⏰ Configure time settings.

4. 🌐 Update the IP address for management access.

5. 📶 Add and configure VLANs.

6. 🔗 Update trunk ports for uplinks to a firewall and another switch.

7. 📂 Back up the configuration to a USB or PC.

8. 🔄 Factory reset the switch and restore the configuration.


---

## Prerequisites
⚡ **Before You Begin:**  

- Access to the Cisco SG-350X 24P switch.  

- A PC connected to the switch for accessing the web GUI. 

- Switch default IP address or a method to discover its current IP.  

- Cisco switch login credentials.  


---

# Cisco Switch Setup Lab 🛠️

## 1. Initial Setup - NIC Configuration and Reset ⚙️

Before beginning, update your NIC settings:

- Set your NIC IP to `192.168.1.100` and ensure the subnet mask is `255.255.255.0`. 🌐
- Try to access the switch at `192.168.1.254` using the default credentials (`{{ devices.cisco_switch.default_user }} / {{ devices.cisco_switch.default_pass }}`).

!!! tip "Oops! No access? 😬"
    If you can’t get in, perform a factory reset! **Here’s how:**
    
    Use a **paperclip** or another object to **carefully** press and hold the reset button on the front of the switch for **15-20 seconds**, then release. For more help, check out the [Cisco Reset Guide](https://www.cisco.com/c/en/us/support/docs/smb/switches/cisco-350-series-managed-switches/smb985-how-to-manually-reboot-or-reset-a-switch.html).

---

## 2. Reset the Switch 🔄

- **Ethernet Connection**: Connect your computer to the switch via Ethernet.
- **Set Static NIC Settings**: Set your computer to `192.168.1.100/255.255.255.0` (no gateway needed at this point).
- **Access the Switch**: Open a browser and visit `192.168.1.254` (or related DHCP address).
- **Login**: Use the default credentials: (`{{ devices.cisco_switch.default_user }} / {{ devices.cisco_switch.default_pass }}`) 🔑.
- **Change Password**: Please change the password to something secure, such as `{{ devices.cisco_switch.custom_pass }}`.

---

### 3. Add User and Update Settings 🧑‍💻

- **Add User**:
  - Go to `Administration > User Accounts > Add`.
  - Create a user with these details:
    - **Username**: `{{ devices.cisco_switch.custom_user }}`
    - **Password**: `{{ devices.cisco_switch.custom_pass }}`
    - **Level**: `15` (this gives admin privileges).
  - **Note**: Make sure the user has full administrative rights (Level 15) to make all necessary configuration changes. 🛠️

- **System Settings**:
  - Go to `Administration > System Settings`.
  - Set the **System Location** to `5400 Patton Dr. Unit 4A, Lisle, Illinois 60532`.
  - Set the **Contact** to `support@networkiteasy.com`.
  - Change the **Host Name** to a friendly name: `{{ devices.cisco_switch.name }}`
  - Set a **Login Banner** and **Welcome Banner** (you can use the same text): `NIE 24-Port Cisco Lab Switch`.
  - Click **Apply**. 👍

- **Time Settings**:
  - Go to `Administration > Time Settings > System Time`.
  - Configure the time zone to **UTC -6 (Central)** or set it from "Click Here" to import from your computer.
  - Click **Apply**. ⏰

---

## 4. Save Configuration 💾

- **Running Config vs Startup Config**: The running config is the current active configuration, while the startup config is what loads when the device reboots. Always save your configuration to both to ensure your changes persist across reboots.
  
---

## 5. Firmware Upgrade 🔧

- Search for the latest firmware version for your Cisco switch on Google or use the firmware provided in the lab files.
- **Check Firmware Version**: Compare the current firmware version with the one provided in the lab files to ensure an upgrade is necessary.
- Navigate to `Administration > File Management > Firmware Operations`.
- Click **Update Firmware**, browse to the folder containing the firmware, and apply the upgrade. 🚀

---

## 6. Configure IP Address 🌍

- Navigate to `IP Configuration > IPv4 Management and Interfaces > IPv4 Interface`.
- Add the new IP address:
  - **IP Address**: `{{ devices.cisco_switch.ip }}`
  - **Subnet Mask**: `{{ devices.cisco_switch.subnet_mask }}`
- Update your NIC adapter settings to a compatible address within the same subnet (e.g., `192.168.1.100`).
- Re-navigate to the switch's new IP (`{{ devices.cisco_switch.ip }}`) and log in again.

- **Save Config**: Don’t forget to save your changes! 💾

---

## 7. Name Critical Interfaces 🔌

- Go to `Port Management > Port Settings`.
- For each port:
  - **GE1**: Set the Description to `Firewall Uplink`.
  - **GE2**: Set the Description to `Aruba AP1`.
  - **GE3**: Set the Description to `DC1`.
  - **GE24**: Set the Description to `Uplink to Aruba Switch`.
- Click **Apply**. 🔧

---

## 8. Add VLANs 🖧

Navigate to `VLAN Management > VLAN Settings > Add`.

For each VLAN, enter the following configuration:

| **VLAN Name** | **VLAN ID** |
|---------------|-------------|
{% for vlan in vlans.values() -%}
| {{ vlan.name }} | {{ vlan.id }} |
{% endfor %}

Click **Apply** and save the configuration. 💾

---

## 9. Auto Voice VLAN and Smartport 🎤

- Navigate to `VLAN Management > Voice VLAN > Properties`.
- Set the **Voice VLAN ID** to `{{ vlans.voip.id }}` and click **Apply** and **OK**.
- Go to `Smartport > Properties`.
- Confirm that **Smartport** is enabled by **Auto Voice VLAN**. 🎶

---

## 10. Trunk vs Access Ports 🌐

- **Trunk Ports**: Used for devices that need to communicate with multiple VLANs (e.g., PC with both data and VoIP).
- **Access Ports**: Used for devices that only need to communicate with a single VLAN (e.g., security camera on the security VLAN).

---

## 11. Adjusting Interfaces ⚙️

- Navigate to `VLAN Management > Interface Settings`.
- Select the following interfaces and change them to **Trunk**:
  - **GE1**: Firewall Uplink.
  - **GE2**: Aruba AP1.
  - **GE24**: Uplink to Aruba Switch.
- Navigate to `VLAN Management > Port VLAN Membership > Select GE2 and Join VLAN`.
  - **GE2 (Access Point)** should only have VLAN `{{ vlans.guest.id }}` ({{ vlans.guest.name }} ) Tagged and Native VLAN set to `{{ vlans.lan.id }}` ({{ vlans.lan.name }}).
  
- **Save Config**: Make sure all your changes are saved! 💾

---

## 12. Backup Configuration 🔐

- Navigate to `Administration > File Management > File Operations`.
- Select **Backup File**.
- Choose either **Running Config** or **Startup Config**.
- Select **HTTP/HTTPS** or **USB** to download the backup file:
  - If using HTTP/HTTPS, the file will download directly to your browser.
  - If using USB, ensure a USB drive is inserted into the switch.
- **Encrypt Sensitive Data**: Always check the option to encrypt the configuration file to keep it secure. 🔒
- Name your backup file something useful: e.g., `username_cisco_config_lab1.txt`.

---

## 13. Reset the Switch and Restore Config 🔄

- Navigate to `Administration > Reboot`.

- Choose **Immediate** and select **Restore to Factory Defaults**. Click **Reboot**.

- Reset your NIC Adapter to something like `192.168.1.100` and reconnect to the switch at `192.168.1.254`.

- Log in using the temporary password and reset it.

- Navigate to `Administration > File Management > File Operations`.

- Choose **Update File** and upload your saved config file.

- Set the NIC to `192.168.1.100` and reconnect to the switch at `{{ devices.cisco_switch.ip }}`.

- Ensure all your settings are restored.

- **Save Config**: Don’t forget to save your running config to the startup config to ensure persistence after reboot.

---

## 14. Reset for Future Labs 🔄

- Navigate to `Administration > Reboot`.
- Select **Immediate** and **Restore to Factory Defaults**. Click **Reboot**.
- Reset your NIC adapter to **DHCP** for IPv4.
- Your lab is now ready for the next user! 🎉

---

**End of Lab Instructions**