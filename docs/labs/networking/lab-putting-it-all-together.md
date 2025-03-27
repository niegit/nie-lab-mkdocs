<!-- 
Concept: Take everything we've learned so far and combine it into a network: Reload firewall configuration, reload switch config, connect FW <> Switch, confirm DHCP passed through to switch, etc.

Disconnect the patch cable from the firewall LAN port that goes into the SW01. We will need to plug ourselves directly into it again, but this also prevents the switch from getting a random DHCP address from the firewall until we've had a chance to restore the SW01 config.

Restore Firewall from baseline - Log into defaults (if defaults aren't configured then refer to end of last lab to reset)
- Use CMD ipconfig to check if you received an IP in the defaults, otherwise adjust NIC or reset firewall 
- Use WSM, Connect to Device with defaults, launch policy manager.
Note: User accounts are not stored in the config file, therefore the admin/status accounts will be set to their defaults as well. Refer to the last lab for that info, but these are good accounts "to know" going forward
- File > Open > Configuration File (No to saving) > Navigate to Baseline config and open
- Save the restored config to the Firewall (File > Save > To Firebox)
    - use default Admin creds
    - cancel save location
    - Yes to IP address mismatch
    - No to saving changes
- IPConfig /renew to get new lease and check IP received from LAN port
- Disconnect from WSM (changed IPs)


Restore Switch - Log into switch and reload baseline
- Move your PC's cable from the firewall to GE12 on SW01 (leave firewall LAN unplugged for now, otherwise switch would get DHCP)
- Set NIC for default cisco and login, create temp account to login
- Restore SW01 config from baseline
Don't wait, you lost connectivity due to the IP changes.

Connect Devices
- Plug switch GE01 into firewall LAN
- Update your NIC to DHCP
- Run ipconfig /renew to confirm you have DHCP Ip address handed to you through switch and default gateway now points to firewall
- ping switch IP

- Plug PC01 into switch GE13 and Power On
- Confirm received IP in DHCP, otherwise adjust NIC
- Ping between devices (may not be able to ping your device as Win Firewall may stop it, but can ping from your device out)

Adjust VLANs
- Sign into switch and save the config you previously restored
- Adjust GE12 for Security VLAN (20)
- Ipconfig would show no Internet now; bounce the port by doing an Admin shutdown on interface (Port Management > Port Settings select GE13 and edit)
- Administrative status down and apply (this disables the port, can visually check and see no lights)
    - "UP" and apply - now we have an IP in the security VLAN that the firewall handed to us via DHCP
- Ipconfig PC01 to check IP
- Ping from your PC to PC01 and confirm it doens't work like last lab. 

Check Firewall Traffic
- Launch system manager
- switch to traffic manager
- In the search box, enter the IP address of PC01 (should be on .20 network). This filters traffic to or from that particular IP
- Ping from your PC to PC01 again and you should see Deny attempts
- We can verify that ICMP traffic from our PC to PC01 is getting denied from the LAN network to the SECURITY network

Now let's fix it
From Policy manager, make new policy to allow traffic between these VLANs
- packet filter > ping
- ALLOW-PING-FROM-LAN-TO-SECURITY
- From LAN
- TO SECURITY
- Enable Logging x2
- Move Policy above Ping so that it takes precendence, otherwise the ping rule would continue to block us.

Try Again
- Open system manager and filter traffic toPC01 again if you clsoed it. Make sure the traffic isn't "paused" at t he bottom
- Ping PC01 again, this time you should see ALLOWED traffic, and it should specify the policy allowing it (ALLOW-PING-FROM-LAN-TO-SECURITY)

Scope in the Policy
Currently we're allowing the entire LAN to the SECURITY network. Some VLANs that may make sense, but in this case, let's pretend that we only want to allow one specific computer on the LAN to the SECURITY network. 

- Open Policy Manager

Setup a DHCP reservation for your PC on the LAN network.
- Network Configuration > VLAN > open LAN
- Add a Reserved Address to ensure the IP doesn't change in the future
 - Name it your PC hostname (run hostname cmd)
 - IP Address for something within the network - let's do 192.168.10.100
 - MAC is the Ethernet adapter MAC address. (ipconfig /all and look for the physical address for the correct Ethernet Adapter you're using)

- Setup > Aliases > Add
- Set a friendly name for your computer, typically hostname or what you just used above
- Add member > choose Host IPv4 for a single IP > add the "reserved IP" 192.168.10.100
- Ok all the way through

Now we have an alias with a friendly name that we can use in our policies, and it will always refer to the specific IP address.
- Open the Ping policy we created
- Remove LAN from the FROM and add your new alias instead
- Update the name to reflect changes (ALLOW-PING-FROM-PC-TO-SECURITY)
- Save policy and save config to firewall

Test Again...again
- run an ipconfig /renew to get your new DHCP address
- ipconfig to confirm IP
- No surprise, we should still be able to ping PC01!
- To test our changes, give your computer a new IP in the LAN network that's different than what you configured for the alias. This time set your gateway address as well so that it sends the traffic to the firewall for routing. 


 -->

# Lab 4: Putting It All Together 

## 🚧 Under Construction 🛠️
This lab is still under construction, but mostly finished. If you feel confident in your skills, feel free to continue below, just know it may not be 100% correct.

## Overview  
In this lab, we will take everything we've learned so far and integrate it into a complete network setup. This includes reloading the firewall and switch configurations, connecting the firewall to the switch, confirming DHCP servers, configuring VLANs, and setting up policies to control network traffic.  

---

## Step 1: Preparing for Configuration  

1. **Disconnect** the firewall LAN cable going into `{{ devices.cisco_switch.name }}`.   
2. **Plug your PC directly into the firewall LAN port** for initial configuration.  

---

## Step 2: Restore Firewall from Baseline  

1. **Log into the firewall using default settings.**   
    - Use `ipconfig` in CMD to check if you received an IP in the defaults.  
    - If no IP is received, adjust your NIC settings or reset the firewall.  

    !!! tip "Credentials Reset"
        **User accounts are not stored within the firewall configuration file**, but rather the firebox itself. That means the credentials we configured in the last lab won't be there because we reset the firewall for other users. You will need to use the default firebox credentials to get connected. While you can review them on the [Network Information](network-info.md) page, they are also just "good to know" in general. 
 
2. **Use WatchGuard System Manager (WSM)** to connect to the device with default settings.  
3. **Launch Policy Manager.**  
4. **Restore the baseline configuration:**  
    - Go to `File > Open > Configuration File` _(Select "No" to saving current config)._  
    - Navigate to the **Baseline Config** and open it.  
5. **Save the restored config to the firewall:**  
    - `File > Save > To Firebox`  
    - Use default admin credentials.  
    - Cancel save location.  
    - Select **Yes** to IP address mismatch.  
    - Select **No** to saving changes.  
6. **Renew IP lease:**  
    - Run `ipconfig /renew` to confirm a new IP from the LAN port.  
7. **Disconnect from WSM**, as IP addresses have now changed.  

---

## Step 3: Restore Switch Configuration  

1. **Move your PC's uplink** from the firewall to `GE12` on **{{devices.cisco_switch.name}}.**  
    - Keep the firewall LAN unplugged for now to prevent DHCP issues.  
2. **Set NIC settings for default Cisco login and create a temporary account.**  
3. **Restore {{devices.cisco_switch.name}}** config from baseline.  
    - Connectivity will be lost due to IP changes

---

## Step 4: Connect Devices  

1. Connect **{{devices.cisco_switch.name}}** to {{ devices.firewall.name }} by uplinking the **LAN** interface to switchport `GE01`. 
2. **Set NIC to DHCP.**  
3. **Renew IP lease:**  
    - Run `ipconfig /renew` and confirm DHCP-assigned address.  
    - Verify that the default gateway is now pointing to the firewall.  
4. **Ping switch IP** to confirm connectivity.  
5. **Plug PC01 into switch `GE13` and power it on.**  
    - Confirm it receives an IP via DHCP.  
    - If needed, adjust NIC settings.  
6. **Test pinging between devices:**  
    - If you are using your NIE provided laptop, the built-in firewall may block incoming ICMP traffic, but you should be able to ping **outbound**. That means you should be able to ping other devices, but other devices may not be able to ping you.

---

## Step 5: Adjust VLANs  

1. **Sign into {{devices.cisco_switch.name}}** and **save** the restored config.
2. **Set `GE13` to the {{vlans.security.name}} VLAN** by setting the Access VLAN to **{{vlans.security.id}}**.
3. **Check connectivity:**  
    - Run `ipconfig`
4. **Bounce the port to force a new lease:**  
    - Go to `Port Management > Port Settings`.  
    - Select `GE13` and edit.  
    - Set `Administrative Status` to **Down**, then apply.  
    - Set `Administrative Status` to **Up**, then apply.

    !!! tip "Bouncing Ports on Switches"
        Sometimes a "logical layer" reconnect _(like `ipconfig /renew`)_ is not enough for a device to pick up it's network changes . The best way to force it is to unplug the cable from the switch or the device and then plug it back into the NIC. In Cisco IOS we can accomplish the same by administratively shutting down the port and turning it back on again. 
        
        If you've used the Cisco CLI then this is the equivalent of issuing a `shutdown` and `no shutdown` _(or more commonly referred to as a `shut` and `no shut`)_ command to an interface.

5. **Run `ipconfig` again on `{{devices.pc01.name}}`.**  
    - Confirm it now has an IP in VLAN {{vlans.security.id}} from the firewall via DHCP.  
6. **Test connectivity:**  
    - Ping from your PC to `{{devices.pc01.name}}`—it should fail due to firewall rules.  

---

## Step 6: Check Firewall Traffic  

1. **Launch WatchGuard System Manager.**  
2. **Open the Traffic Monitor.**  
3. **Filter by `{{devices.pc01.name}}`'s IP address**.  
4. **Ping `{{devices.pc01.name}}` again from your PC.**  
   - You should see `Deny` attempts in the Traffic Monitor.  
   - This confirms that ICMP traffic from LAN to the Security VLAN is blocked.  

---

## Step 7: Create a Policy to Allow VLAN Traffic  

1. **Open Policy Manager.**  
2. **Create a new policy:**  
    Press the `+` button in the ribbon menu to add a new policy and select `Packet Filter > Ping`  
    - Name: **ALLOW-PING-FROM-LAN-TO-SECURITY**  
    - `From`: LAN  
    - `To`: SECURITY  
    - **Configure logging** on the Policy so that we can review the traffic in the future.
        - **Select** the **Properties** tab along the top
        - **Click** the **Logging** button
        - Check the boxes for `send log message` and `send a log message for reports` then **select OK**.
    - **Click OK** to save the policy

3. **Move the policy above the default Ping rule** so it takes precedence. 
4. **Save and apply** the policy to the firewall.  

    !!! tip "Auto Order Mode"
        Policy Manager may automatically detect and re-order the policies for you within policy manager. While semi-helpful, it prevents you from being able to make adjustments to the order yourself. Since firewalls process ACLs starting from the top down, this may be an issue when needing to override the order of policies. 

        **To disable this**, select `view > Auto-Order Mode > Uncheck`. Now you should be able to drag policies to re-order how they process.  


---

## Step 8: Test Again  

1. **Reopen Traffic Monitor and filter for `{{devices.pc01.name}}`.**  
2. **Ping `{{devices.pc01.name}}` again.**  
    - You should now see **Allowed** traffic instead of Denied.  
    - The logs should reference **ALLOW-PING-FROM-LAN-TO-SECURITY**.  

---

## Step 9: Restrict Policy Scope  

By default, this policy allows **all LAN devices** to reach the **SECURITY VLAN**. Instead, we will restrict access to a single device.  

1. **Open Policy Manager.**  
2. **Set up a DHCP Reservation for your PC on the LAN.**  
    - Go to `Network Configuration > VLAN > LAN`.  
    - Add a Reserved Address:  
        - **Name:** Use your PC’s hostname (`hostname` command in CMD).  
        - **IP Address:** Assign `192.168.10.100`.  
        - **MAC Address:** Get the Ethernet adapter MAC (`ipconfig /all`). It's the **physical address** for the NIC adapter you're plugged in to. 
3. **Create an Alias for this device:**  
    - Go to `Setup > Aliases > Add`.  
    - **Name:** Match your PC hostname or reserved IP.  
    - **Add Member:** Choose **Host IPv4** and enter `192.168.10.100`.  
4. **Modify the Ping Policy:**  
    - Remove **LAN** from the `From` box.  
    - Add the **Alias** you just created instead.  
    - Rename the policy to **ALLOW-PING-FROM-PC-TO-SECURITY**.  
    - Save and apply the updated configuration.  

---

## Step 10: Final Testing  

1. **Renew your IP lease:**  
    - Run `ipconfig /renew`.  
    - Verify that your PC has `192.168.10.100`.  
2. **Test pinging `{{devices.pc01.name}}`—it should work.**  
3. **Test changing your IP manually:**  
    - Assign a **different** IP in the LAN subnet.  
    - Set the gateway to the firewall.  
    - **Ping `{{devices.pc01.name}}`—it should fail!**  
        - This confirms that only the reserved PC is allowed to communicate with the Security VLAN.  

---