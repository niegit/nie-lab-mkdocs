<!-- To Fix

- Start with uplinking from your PC to a port into the switch

- Add generic instructions for configuring NIC. Might be best to add into a main page and link to it for multiple uses. Mention disabling dock if using on dock.

- Add ipconfig /all screenshots and steps when needed to help drive troubleshooting

- Step 2 should be "Connect to Switch" and reset if necessary vs just reset it. Mention why there's no gateway needed since it's all L2 and no L3/router

- Mention case sensitivity with uers/passwords

- Update the time settings to say that typically you'd use SNTP but we don't have Internet in this portion, so it can't talk to get out.

- Explain Run and Start config and why it's important to save!

- Explain the firmware process but skip it since it's already updated?

- Get Lab Sharepoint setup for Files

- Why we update critical interfaces!

- Recap at the end, mention the importance of saving your config files somewhere. 

 -->


# Lab 1: Setting Up a {{ devices.cisco_switch.type }}
## Overview

This lab guides you through the complete setup process of a {{ devices.cisco_switch.type }} using its web GUI. By the end of this lab, you'll have configured the switch, saved and backed up its configuration, and tested factory reset and restoration.

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

⚡ **Before You Begin:**  

- Access to the {{ devices.cisco_switch.type }} (_{{ devices.cisco_switch.name }}_).  

- A PC connected to the switch for accessing the web GUI. 

- A USB or PC to save and restore configuration files to and from.

---



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

## 3. Add User and Update Settings 🧑‍💻

**Add User**:

  - Go to `Administration > User Accounts > Add`.
  - Create a user with these details:
    - **Username**: `{{ devices.cisco_switch.custom_user }}`
    - **Password**: `{{ devices.cisco_switch.custom_pass }}`
    - **Level**: `15` (this gives admin privileges).
  - **Note**: Make sure the user has full administrative rights (Level 15) to make all necessary configuration changes. 🛠️

**System Settings**:

  - Go to `Administration > System Settings`.
  - Set the **System Location** to `5400 Patton Dr. Unit 4A, Lisle, Illinois 60532`.
  - Set the **Contact** to `support@networkiteasy.com`.
  - Change the **Host Name** to **User Defined** and give it a new name: `{{ devices.cisco_switch.name }}`
  - Set a **Login Banner** and **Welcome Banner** (you can use the same text): `{{ devices.cisco_switch.banner }}`.
  - Click **Apply**. 👍

**Time Settings**:

  - Go to `Administration > Time Settings > System Time`.
  - Configure the time zone under **Manual Settings** by using the "Click Here" button to import from your computer.
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
- Add the new Static IP address and **Apply** the details below:
    - **IP Address**: `{{ devices.cisco_switch.ip }}`
    - **Network Mask**: `{{ devices.cisco_switch.subnet_mask }}`

- Click **OK** through the popup. The switch will now lose connection as it updates to the new IP address.
- Update your NIC adapter settings to a compatible address within the same subnet (e.g., `192.168.10.100`).
- Re-navigate to the switch's new IP (`{{ devices.cisco_switch.ip }}`) and log in again.

- **Save Config**: Don’t forget to save your changes! 💾

---

## 7. Name Critical Interfaces 🔌

- Go to `Port Management > Port Settings`.
- Click the radio button for **GE1** and scroll down to the bottom of the page then select **edit**. 
- Set the Description to `{{ devices.firewall.name }}` and click **Apply**.
- You can switch ports from within the window by selecting them in the Port dropdown at the top. **Update and Apply** the descriptions for each of the remaining ports below:
    - **GE2**: `{{ devices.ap01.name }}`.
    - **GE3**: `{{ devices.dc01.name }}`.
    - **GE24**: `{{ devices.aruba_switch.name }}`.

- Click **Close** when the critical ports have all benn renamed. 🔧

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

!!! tip
    **VLAN 1** is already configured for you by default.

---

## 9. Auto Voice VLAN and Smartport ☎️

- Navigate to `VLAN Management > Voice VLAN > Properties`.
- Set the **Voice VLAN ID** to `{{ vlans.voip.id }}` and click **Apply** and **OK**.
- Go to `Smartport > Properties`.
- Set **Smartport** to `enabled by Auto Voice VLAN`.

---

## 10. Access vs Trunk Ports 🌐

!!! tip
    - **Access Ports**: Used for devices that only need to communicate with a **single VLAN**. Common use cases would be workstations that only need to communicate on the main LAN, or security cameras that should only be accessible on the security VLAN only. Most ports should be configured to Access typically.

    - **Trunk Ports**: Configuring trunk ports allows the connected device to communicate with **multiple VLANs** instead of just one. This is used for linking infrastrucutre together such as switches, access points, etc. For example, when linking switches together, they typically need to be made aware of **all VLANs** so you'd need to configure a single Trunk port for each port that links two switches together. Another common example is when customers have Voice VLANs and PBX servers - you can leverage a trunk port so that the physical VoIP phone can be plugged into the main Voice VLAN, but can then tag the Lan VLAN on the port so that the phone can passthru the Lan connection to a PC. 

- Navigate to `VLAN Management > Interface Settings`.
- **Select** the following interfaces and **edit** them to **Trunk** and **Apply**:
    - **GE1**: `{{ devices.firewall.name }}`.
    - **GE2**: `{{ devices.ap01.name }}`.
    - **GE24**: `{{ devices.aruba_switch.name }}`.

## 11. Tagging VLANs 🏷️
!!! tip
    - **Untagged / Native VLAN**: You will hear these terms often used interchangeably. The untagged, or native VLAN, dictates what network the device will be assigned to. Aside from large enterprise environments, this will almost always be VLAN 1 by default.
    - **Tagged VLANs**: In cases where a port is configured as a **Trunk port**, you can tag other VLANs that the port should be able to communicate with. The device will be assigned to the untagged/native VLAN, but can communicate with other VLANs that have been tagged. In the above example of linking switches together, you would configure the Untagged/Native VLAN to 1 so that it's accessible on the main LAN, but then you'd tag all other VLANs so that it can "passthru" those other VLANs so that they can be tagged on other ports on the switch.

- Navigate to `VLAN Management > Port VLAN Membership > Select GE2 and Join VLAN`.
  - Select **GE2 (Access Point)** and click **Join VLAN**
  - Set to **User Defined** and only tag the **{{ vlans.guest.name }}** (`{{ vlans.guest.id }}`).
  - **Apply** your changes and close the window.
  - **Save Config**: Make sure all your changes are saved! 💾

---

## 12. Backup Configuration 🔐

- Navigate to `Administration > File Management > File Operations`.
- Select **Backup File**.
- Choose **Running Config** _(save your configuration if you didn't just do it!)_.
- Select **HTTP/HTTPS** or **USB** to download the backup file:
  - If using HTTP/HTTPS, the file will download directly to your PC via your browser.
  - If using USB, ensure a USB drive is inserted into the switch. It will save to the root of the USB.
- **Encrypt Sensitive Data**: Always check the option to encrypt the configuration file to keep it secure. 🔒
- Name your backup file something useful: e.g., `username_cisco_config_lab1.txt`.

---

## 13. Reset the Switch and Restore Config 🔄


**Reset to Factory Defaults**

  - Navigate to `Administration > Reboot`.
  - Choose **Immediate** and select **Restore to Factory Defaults**. Click **Reboot** and **OK**.

<br>
**Restore the Configuration**

  - Reset your NIC Adapter to something like `192.168.1.100` and reconnect to the switch at the default IP `192.168.1.254`.
  - Log in using the default credentials (`{{ devices.cisco_switch.default_user}}/{{ devices.cisco_switch.default_pass}}`).
  - Configure a temporary new password to complete the login.
  - Navigate to `Administration > File Management > File Operations`.
  - Choose **Update File** and upload your saved config file to the **Running Configuration**. Hit **Apply**. 

!!! tip
    Because you're updating to the running configuration, it should "instantly" switch to the IP stored in the config file. That means you're disconnected and need to update your NIC again. 😊

  <br>
**Reconnect to the Switch**

  - Set the NIC to `192.168.10.100` and reconnect to the switch at `{{ devices.cisco_switch.ip }}`. You should notice your Welcome Message is configured if successful.
  - Ensure all your settings are restored. 
  - **Save Config**: Don’t forget to save your running config to the startup config to ensure persistence after reboot!

---

## 14. Reset for Future Labs 🔄

- Navigate to `Administration > Reboot`.
- Select **Immediate** and **Restore to Factory Defaults**. Click **Reboot**.
- Reset your NIC adapter to **DHCP** for IPv4.
- Your lab is now ready for the next user! 🎉

---