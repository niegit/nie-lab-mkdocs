<!-- 
Concept: Take everything we've learned so far and combine it into a network: Reload firewall configuration, reload switch config, connect FW <> Switch, confirm DHCP passed through to switch, etc.

Restore Firewall - Log into defaults (if defaults aren't configured then refer to end of last lab to reset)
- Use CMD ipconfig to check if you received an IP in the defaults, otherwise adjust NIC or reset firewall 
- Use WSM, Connect to Device with defaults, launch policy manager
- File > Open > Configuration File (No to saving) > Navigate to Baseline config and open
- Save the restored config to the Firewall (File > Save > To Firebox)
    - NO to adding feature key warning (No Internet)
    - use default Admin creds
    - Use default location for saving
    - No to overwriting file
    - Yes to IP Address message
    - Yes to feature key warning
    - No to file save
- IPConfig to check IP received from LAN port
- Disconnect from WSM (changed IPs)


Restore Switch - Log into switch and reload baseline
- Move cable from firewall to GE12 on switch (leave firewall LAN unplugged for now, otherwise switch would get DHCP)
- Set NIC for default cisco and login
- Restore config from baseline

Connect Devices
- Plug switch GE01 into firewall LAN
- Update your NIC to DHCP
- Run ipconfig to confirm you have DHCP Ip address handed to you through switch and default gateway now points to firewall
- ping switch IP
- ping gateway

- Plug PC01 into switch GE13 and Power On
- Confirm received IP in DHCP, otherwise adjust NIC

- Ping across switch between devices (may not be able to ping your device as Win Firewall may stop it, but can ping from your device out)

Adjust VLANs
- Sign into switch and save the config you previously restored
- Adjust GE12 for Security VLAN (20)
- Ipconfig would show no Internet now; bounce the port by doing an Admin shutdown on interface (Port Management > Port Settings select GE13 and edit)
- Administrative status down and apply (this disables the port, can visually check and see no lights)
    - "UP" and apply - now we have an IP in the security VLAN that the firewall handed to us via DHCP
- Ipconfig PC01 to check IP
- Ping from your PC to PC01 and confirm it doens't work like last lab. 
- Start a rolling ping

Now let's fix it
VLAN Management > Interface Settings
- Edit GE13 to Trunk

VLAN Management > Port VLAN Membership
- 20 untagged, tag main VLAN 1
- bounce port
- ping again - success?!

 -->