<!-- 
TO DO List

Add a bit more at the beginning for "restoring your configuration"

Update Jinja for PC01 / PC02? Name, User, Password

 -->


# ⚠️WARNING:⚠️ This Lab is not ready for use yet.

**We are still working on this lab, please check back at another time. We should be done by next week!**

⚠️🔧🔒⚠️🔧🔒⚠️🔧🔒⚠️🔧🔒⚠️🔧🔒⚠️🔧🔒⚠️🔧🔒⚠️🔧🔒⚠️🔧🔒⚠️🔧🔒⚠️


# Lab 2: Advanced Switch Configuration

In this lab, you will work to restore a switch from your backup, solve network issues, and demonstrate VLAN tagging.


## Prerequisites  

- Familiarity with VLAN concepts and switch port configurations.  
- GUI access to a managed switch.  
- Two Endpoint devices - You may use your laptop as well as PC01 (bottom shelf of rack).

---

## Required Equipment  

- Managed switch (e.g., {{ extra.devices.cisco_switch.type }}).  
- Endpoints for connectivity testing.  
- Browser-based GUI access to the switch.

---

!!! tip "Key Concepts"
    VLAN tagging separates network traffic into logical segments, improving {{ vlans.security.name }} and performance.  
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
    - Open your browser and navigate to the management IP: `{{ extra.devices.cisco_switch.default_ip }}`.  
    - Use the credentials below:  
        - Username: `{{ extra.devices.cisco_switch.default_user }}`  
        - Password: `{{ extra.devices.cisco_switch.default_pass }}`  

!!! tip "Don't forget your NIC adapter settings. Revisit the [cisco setup guide](cisco-switch-setup.md) if you need a refresher."

2. **Locate Backup/Restore Settings**  
    - Navigate to `Administration → File Management → File Operations`.  
    - Select the **Update File** option.

3. **Upload Backup File**  
    - Choose the backup file from your local machine or your USB inserted into the switch.  
    - Choose **Running Configuration** for the destination.  
    - Click **Apply** and confirm the restore process.

4. **Reconnect to Switch**  
    - **Update** your **NIC settings** and **reconnect** to the switch with:  
        - IP Address: `{{ devices.cisco_switch.ip }}`  
        - User: `{{ devices.cisco_switch.custom_user }}`  
        - Password: `{{ devices.cisco_switch.custom_pass }}`

!!! tip "Save Your Work"  
    After restoring the configuration, ensure you save it to the startup configuration.  

---

## Task 2: Connect More Endpoints  

1. **Turn on PC01 and Sign In**  
    - Plug **Power** into **PC01**.  
    - Plug in the **Display Cable** between **PC01** and the monitor.  
    - Plug the **Ethernet** cable into **PC01** and into `GE13` _(bottom-left)_ of **{{ devices.cisco_switch.name }}**.  
    - Sign into **PC01** with the following credentials: `(LabAdmin/Password)`.

2. **Update Network Settings**  
    - Update the NIC so that it can communicate with the switch.  
    - Set the IP Address within the {{ vlans.lan.name }} subnet _({{ vlans.lan.subnet}})_. This exercise will use `192.168.10.13` for this example, feel free to use the same and follow along.

---

## Task 3: CMD and Conquer  

Let's run some quick tests to confirm our setup so far by launching the **Windows Terminal**. Command Prompt (CMD) will suffice as well, but **Windows Terminal** allows us to run commands in **many** shells _(Command Prompt, PowerShell, Windows Subsystem for Linux)_, not just CMD.*

### **What's my IP?**  
- Press `WIN + X` and select **Terminal**.  
- Type `ipconfig` and hit **Enter**.  
    - **Verify** the Ethernet Adapter has the proper **IPv4** and **Subnet Mask** configured.

### **Ping the Switch**  

!!! tip "Can you hear me now?"  
    The `ping` command is one of the most commonly used network utilities for troubleshooting. This command sends a series of network packets to a designated IP or host in order to check if they can "talk" to one another. It's mostly used to verify that another device is online, and that the devices can establish a connection between one another.

    💡**Tip:** By default `ping` only sends 4 packets then stops, but using `ping -a` creates a **rolling ping** that runs continuosly until stopped with `ctrl+c`. This can be helpful when rebooting a server as it allows you to start a rolling ping against it to monitor the reboot progress and verify when it's back up.

    [📚Read more about Ping](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/ping)

- In the **terminal**, type `ping {{ devices.cisco_switch.ip }}` and hit **Enter**.

If you were successful, then you should see 4 packets sent successfully to the switch. Each reply gives you the amount of time in milliseconds _(ms)_ that it took to send a packet to the switch and receive an "alive" response. 

```
C:\Users\LabUser>ping 192.168.10.2

Pinging 192.168.10.2 with 32 bytes of data:
Reply from 192.168.10.2: bytes=32 time=2ms TTL=64
Reply from 192.168.10.2: bytes=32 time=4ms TTL=64
Reply from 192.168.10.2: bytes=32 time=3ms TTL=64
Reply from 192.168.10.2: bytes=32 time=5ms TTL=64

Ping statistics for 192.168.10.2:
Packets: Sent = 4, Received = 4, Lost = 0 (0% loss),
Approximate round trip times in milli-seconds:
Minimum = 2ms, Maximum = 5ms, Average = 3ms
```

- From **{{ devices.cisco_switch.name }}** try to `ping` your other device by it's IP address.

If your switch and endpoints are configured correctly then you should be able successfully to ping one another.

## Task 4: Review VLANs on Switch

Now that you have the endpoints connected, we will configure VLANs on the switch to segment traffic between different logical networks. If you restored from a baseline then you likely have these already configured, but never hurts to **verify explicitly**.

### Steps:

1. **Access the VLAN Configuration Menu**  
      - On the switch GUI, navigate to **VLAN Management → VLAN Configuration**.  
      - Review the current VLAN configuration to ensure the necessary VLANs have been created. You should already have the following VLANs configured:

      {% for vlan in extra.vlans.values() %}
      **VLAN {{ vlan.id }} - {{ vlan.name }}** ({{ vlan.subnet }})
      {% endfor %}

2. **Assign PC01 to the {{ vlans.security.name }} VLAN** 
      - Go to the **Port to VLAN Membership** menu and assign **PC01** (`GE13`) to the **{{ vlans.security.name }} VLAN**.  
      - Configure `GE13`'s  **untagged or native VLAN** ID to `{{ vlans.security.id }}`.
3. **Update Port for {{ vlans.security.name }} VLAN**  
      - Update the NIC for **PC01** to be on the **{{ vlans.security.name }}** subnet (_{{ vlans.security.subnet }}_) to allow it to communicate on the network. 

---

!!! warning
      **Note**: Be careful when making changes to the port you're plugged into, especially in remote situations where you may be connected behind another device. Making a change to the port you’re directly connected to could result in losing connectivity, making it difficult to access the device for further configuration. Always try to think through possible scenarios and impacts a change may make in the environment.

---

## Task 5: Verify VLAN Configuration with Ping Test

<!-- Let's test the connectivity between **PC01** and your laptop by pinging across VLANs.

### Steps:

1. **Ping Test Between Endpoints**  

      - On **PC01**, open the **Windows Terminal** and run the following command:  
      ```
      ping 192.168.10.2
      ```
   - This will ping the switch. You should see request timeout or unreachable message.

   - On **PC01**, open the **Windows Terminal** and run the following command:  
     ```
     ping 192.168.10.13
     ```
   - This will attempt to ping your device on a different VLAN. You should see request timeout or unreachable message.

2. **Verify Results**  
   - If the ping fails, it confirms that **PC01** and the other endpoint are isolated due to the different VLANs. This is expected without proper routing.

---

## Task 6: Troubleshoot Connectivity Issues

If you encounter issues with pinging or connectivity, follow these troubleshooting steps:

1. **Verify VLAN Assignments**  
   - Ensure that **PC01** is correctly assigned to the **{{ vlans.security.name }} VLAN** and that the VLAN configuration is correct.

2. **Check IP Address Configuration**  
   - Ensure that each PC has the correct IP address within its respective subnet.

3. **Verify Port Configuration**  
   - Double-check the port configuration for **PC01** and ensure it’s set to **tagged** for the {{ vlans.security.name }} VLAN.

4. **Test with Other VLANs**  
   - Test connectivity between other devices in different VLANs to ensure proper segmentation.

---

## Task 7: Cleanup and Final Verification

1. **Save Configuration**  
   - Once you are done testing, ensure that you save the configuration to the startup configuration on the switch to preserve your changes.

2. **Document Configuration**  
   - Document the VLAN configurations, IP addresses, and any changes made to the switch for future reference.

3. **Test Final Connectivity**  
   - Perform a final round of tests to ensure that all VLANs are properly segmented and devices can communicate as expected.
 -->