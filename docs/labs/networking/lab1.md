# Lab 1: Setting Up a Cisco SG-350X 24P Switch Using the Web GUI

This lab guides you through the complete setup process of a Cisco SG-350X 24P switch using its web GUI. By the end of this lab, you'll have configured the switch, saved and backed up its configuration, and tested factory reset and restoration.

## Objectives
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

💡 *Tip: If you're unsure of the default IP, try `192.168.1.254` or check the documentation.*

---

## Step-by-Step Instructions

### 1. Access the Web GUI
🖥️ **Connect to the Switch:**
1. Connect your PC to one of the switch’s Ethernet ports.
2. Open a web browser and navigate to the switch’s default IP address (e.g., `192.168.1.254`).
3. Log in with the default credentials:
   - Username: `cisco`
   - Password: `cisco`
4. Change the default password when prompted.

📌 *Note: If you can't access the web GUI, ensure your PC's IP is in the same subnet as the switch.*

---

### 2. Update Firmware
⚙️ **Keep It Up-to-Date:**
1. Go to **Administration > File Management > Upgrade/Backup Firmware/Language**.
2. Download the latest firmware from Cisco’s website and upload it to the switch.
3. Reboot the switch after the update is complete.

⚠️ *Warning: Do not power off the switch during the firmware update process!*

---

### 3. Add Users and Passwords
🔐 **Secure Your Switch:**
1. Navigate to **Administration > User Accounts > Add New User**.
2. Create new users with appropriate roles:
   - Example: Add an administrator user.
3. Save changes.

💡 *Did You Know? Creating multiple users with unique credentials enhances security and accountability.*

---

### 4. Save Running Configuration to Startup Configuration
💾 **Don’t Lose Your Work:**
1. Go to **Administration > File Management > Copy/Save Configuration**.
2. Select **Running Configuration** as the source and **Startup Configuration** as the destination.
3. Click **Apply**.

---

### 5. Configure Time Settings
⏰ **Sync Time:**
1. Navigate to **System > Time > SNTP Settings**.
2. Enable SNTP and configure time servers.
3. Set the time zone and daylight saving settings.

💡 *Tip: Accurate time settings are critical for logging and troubleshooting.*

---

### 6. Update Management IP Address
🌐 **Set a Static IP:**
1. Go to **System > IP Configuration > IPv4 Interface**.
2. Assign a static IP address for management access.
   - Example: `192.168.10.2` with subnet mask `255.255.255.0`.
3. Apply the changes and verify the new IP address.

📌 *Note: Document the new IP address to avoid losing access.*

---

### 7. Add and Configure VLANs
📶 **Segment Your Network:**
1. Navigate to **VLAN Management > VLAN Settings**.
2. Add the required VLANs:
   - Example: VLAN 10 (Data), VLAN 20 (Voice).
3. Assign ports to VLANs as needed.
   - Example: Assign ports `GE2-GE12` to VLAN 10, and ports `GE13-GE20` to VLAN 20.

💡 *Fun Fact: VLANs can improve network performance by reducing broadcast domains.*

---

### 8. Update Trunk Ports for Uplinks
🔗 **Connect Your Network:**
1. Navigate to **Port Management > Port Settings**.
2. Set `GE1` and `GE24` as trunk ports.
3. Configure allowed VLANs on these trunk ports for uplinks to:
   - Firewall (GE1).
   - Another switch (GE24).

---

### 9. Back Up Configuration
📂 **Protect Your Config:**
1. Go to **Administration > File Management > Copy/Save Configuration**.
2. Select **Startup Configuration** as the source and **External Storage** (USB or PC) as the destination.
3. Save the file.

💡 *Tip: Regular backups are crucial for disaster recovery.*

---

### 10. Factory Reset and Restore Configuration
#### Factory Reset:
🚨 **Reset to Defaults:**
1. Navigate to **Administration > Reboot**.
2. Select the factory reset option and confirm.

#### Restore Configuration:
♻️ **Bring It Back:**
1. After the reset, access the switch GUI again.
2. Go to **Administration > File Management > Restore Configuration**.
3. Upload the backup configuration file from USB or PC.
4. Reboot the switch to apply the restored configuration.

📌 *Note: Always verify the restored configuration after rebooting.*

---

## Verification
✅ **Check Your Work:**
1. Confirm all settings are correctly applied.
2. Test VLAN connectivity and uplink functionality.
3. Verify the backed-up configuration works as expected after restoration.

---

## Conclusion
🎉 **Well Done!**
You have successfully set up, configured, and backed up a Cisco SG-350X 24P switch using the web GUI. Practice these steps to become proficient in managing Cisco switches.