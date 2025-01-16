# ⚠️WARNING:⚠️ This Lab is not ready for use yet.

**We are still working on this lab, please check back at another time. We should be done by next week!**

⚠️🔧🔒⚠️🔧🔒⚠️🔧🔒⚠️🔧🔒⚠️🔧🔒⚠️🔧🔒⚠️🔧🔒⚠️🔧🔒⚠️🔧🔒⚠️🔧🔒⚠️🔧🔒⚠️🔧🔒


# Lab 2: Advanced Switch Configuration

In this lab you will work to restore a switch from your backup, solve network issues, and demonstrate VLAN tagging.


## Prerequisites  

- Familiarity with VLAN concepts and switch port configurations.  
- GUI access to a managed switch.  
- Endpoints like PCs or laptops for testing network connectivity.

---

## Required Equipment  

- Managed switch (e.g., {{ extra.devices.cisco_switch.type }}).  
- Endpoints for connectivity testing.  
- Browser-based GUI access to the switch.

---

!!! tip "Key Concepts"
    VLAN tagging separates network traffic into logical segments, improving security and performance.  
    You'll also be working with the following VLANs:
    
    {% for vlan_key, vlan in extra.vlans.items() %}
    - **{{ vlan.name }}**: {{ vlan.description }} ({{ vlan.subnet }})
    {% endfor %}

---


## Task 1: Restore the Switch Configuration from Backup  

!!! question "Why Restore Configuration?"
    Restoring a configuration ensures your switch has the desired settings without manually reconfiguring everything.

### Steps  

1. **Access the Switch GUI**  
      - Open your browser and navigate to the management IP: `{{ extra.devices.cisco_switch.ip }}`.  
      - Use the credentials below:  
      - Username: `{{ extra.devices.cisco_switch.custom_user }}`  
      - Password: `{{ extra.devices.cisco_switch.custom_pass }}`  

         
!!! tip "Don't forget your NIC adapter settings. Revisit the [cisco setup guide](cisco-switch-setup.md) if you need a refesher."

2. **Locate Backup/Restore Settings**  
      - Navigate to `Administration → File Management → Backup/Restore`.  
      - Select the **Restore Configuration** option.

3. **Upload Backup File**  
      - Choose the backup file from your local machine or your USB inserted into the switch.  
      - Click **Apply** and confirm the restore process.

4. **Verify Configuration**  
      - Go to **Status** → **Summary** to confirm the restored settings match your requirements.

!!! tip "Save Your Work"
    After restoring the configuration, ensure you save it to the startup configuration.  

---

## Task 2: Configure Specific Ports with VLAN Tags  

!!! warning "Important!"
    Incorrect VLAN configurations can disrupt network traffic. Always verify your settings before applying changes.

### Steps  

1. **Access VLAN Management**  
      - Navigate to `VLAN Management → VLAN Settings` in the switch GUI.  
      - Review the existing VLANs or create new ones.  

2. **Confirm you have the following VLANs set:**   
    {% for vlan_key, vlan in extra.vlans.items() %}
    - `{{ vlan.id }}` **{{ vlan.name }}**
    {% endfor %}

3. **Assign VLANs to Ports**  
      - Navigate to **Port Settings**.  
      - Assign VLAN IDs to the appropriate ports and set the mode to **Access**.  
      - Example: Port 1 → VLAN ID `{{ extra.vlans.lan.id }}` (LAN).

4. **Configure Trunk Ports (if required)**  
      - Set the port mode to **Trunk** for ports connecting to other switches or routers.  
      - Specify allowed VLANs (e.g., `{{ extra.vlans.lan.id }}`, `{{ extra.vlans.security.id }}`).  

---

## Task 3: Test Network Connectivity Across VLANs  

!!! info "Network Testing"
    Testing ensures that VLAN configurations work as expected and that inter-VLAN routing is functional.

### Steps  

1. **Connect Endpoints**  
      - Plug endpoints into switch ports configured for specific VLANs.  
      - Example: Connect a PC to a port assigned to VLAN ID `{{ extra.vlans.voip.id }}`.  

2. **Test Intra-VLAN Communication**  
      - Use `ping` to verify communication between devices in the same VLAN.  

3. **Test Inter-VLAN Routing**  
      - Ensure the router or Layer 3 switch is configured for inter-VLAN routing.  
      - Test connectivity between VLANs (e.g., LAN → SECURITY).  

---

## Task 4: Create a Network Share and Test VLAN Access  

!!! question "Why Test VLAN Access?"
    Testing file-sharing access across VLANs validates your network segmentation policies.

### Steps  

1. **Set Up a File Share**  
      - Create a shared folder on a device in VLAN `{{ extra.vlans.lan.id }}`.  

2. **Access the Share from Another VLAN**  
      - Attempt to connect to the shared folder from a device in VLAN `{{ extra.vlans.guest.id }}`.  

3. **Validate Security Rules**  
      - Verify that access is allowed or denied based on configured policies.

---

## Verification and Cleanup  

!!! success "Verification Checklist"
    - VLANs are properly configured.  
    - Endpoints can communicate as per design.  
    - Inter-VLAN routing works as expected.  

1. **Save Configuration**  
      - Save the final settings to prevent data loss during power cycles.  

2. **Reset the Environment**  
      - Disconnect test devices and prepare the switch for the next lab session.  

---

!!! tip "Final Note"
    Backup your final switch configuration to ensure it can be restored later if needed.
