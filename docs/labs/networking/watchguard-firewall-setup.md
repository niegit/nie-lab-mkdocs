<!-- 

Explain Cert Issue for Web GUI

Add Custom Creds for Firewall Labs






 -->

# WatchGuard Firewall Lab Guide

## Pre-Requisites
- A computer with an accessible Ethernet port
- WatchGuard System Manager (WSM) installed
- {{ devices.firewall.type }} or other model
- A location to store your configuration files

---

## Power On and Get Connected
1. Plug cable into **LAN** (port 1) of the {{ devices.firewall.type }} and into your NIC.
2. WatchGuard provides a DHCP server by default (`{{ devices.firewall.default_subnet}}`) so make sure your **NIC is set to DHCP** or within the subnet. _May need to disable docking station NIC if you're also uplinked through it._
3. Run `ipconfig` to check if you received an IP in the subnet.
4. Default login: `{{ devices.firewall.default_web_address}}`.
    - Your browser may block the connection due to SSL certificate: click **Advanced** and **Continue** to {{ devices.firewall.default_web_address}} (unsafe) to get to GUI.
    - Credentials: defaults are `{{ devices.firewall.default_admin_account }}`.

5. Add instructions on resetting the firewall if the previous lab user didn't do it at the end.

---

## Setup Wizard
1. **Create New Configuration** and **accept terms**.
2. **Configure External Interface**:
    - Use Interface 0 for WAN.
    - Static IP:
        - Public Static: `{{ wan.ip }}{{wan.cidr }}`
        - Gateway: `{{ wan.gateway }}`
    - Click **Next**.
    - Domain name: `{{ vlans.lan.domain_name }}`.
    - DNS servers: 
        - `1.1.1.1` (CloudFlare) 
        - `8.8.8.8` (Google).
        - **Note:** It will test the servers and fail, which is fine at this point.
    - Click **Next**.
3. **Configure Trusted Interface**:
    - Leave defaults as we'll update them later in the lab. For now, the defaults create a DHCP server to get an IP and log into the firewall.
4. **Update Passwords**
    - `{{ devices.firewall.custom_status_account }}`
    - `{{ devices.firewall.custom_admin_account }}`
5. Click **Next**.
6. **Update** System Settings:
    - Name: `{{ devices.firewall.name }}`.
    - Location: `{{ office.location }}`.
    - Contact: `{{ office.contact }}`.
7. **Set Time Zone**: `GMT-6:00 Central Time US and Canada`.
8. Click **Next**.
9. **Skip Feature Key** for now since we don't have Internet.
10. Review information and click **Next**.

---

## Connecting with WatchGuard System Manager (WSM)
_If you don't have WatchGuard System Manager (WSM) already installed, download it from [WatchGuard Downloads]({{ devices.firewall.software_download }})._

1. Launch WatchGuard System Manager from your computer.
2. Go to **File > Connect to Device**:
    - **IP Address:** `{{ devices.firewall.default_ip }}`.
    - **Credentials:** `{{ devices.firewall.custom_status_account }}`
3. Right-click the device and open **Policy Manager**.
4. Take a moment to review the information we previously configured.
    - Go to **Setup > System** and confirm the information is correct. If something is incorrect, now is the time to update it!

    <!-- 2. **Upgrade Firmware**:
    - Look for the latest firmware for the firewall.
    - Check the current version running.
    - Download new firmware if an upgrade is needed: [WatchGuard T45 Software](https://software.watchguard.com/SoftwareDownloads?current=true&familyId=a2R6S00000537cVUAQ).
        - Install it on your machine (simple "next, next" installer).
    - Go to **File > Upgrade**:
        - Save the current config in the default location for now.
        - Sign in with admin credentials.
        - Browse to the firmware file. If there’s a popup saying no files, ensure you’ve installed the `.exe` firmware.
        - Click **OK**, then **Yes**, and wait for it to finish. -->

---

## Create Temporary Network and Port

1. **Configure a Temporary Port**:  

    !!! question "Why are we making a temporary network?"
        Unlike the cisco switch, you can make changes in policy manager without updating the "running configuration". **In order for changes to take effect they must be saved to the firewall.** That means this step is technically unneccessary, but by creating a temporary network we'll have a "Get out of jail free card" that we can use to get back into the firewall incase our we have a mistake in our configuration. It also gives you another opportunity at configuring interfaces.🎉🎊

    - Go to **Network > Configuration**:
        - Double-click **Interface 4** to configure.
        - Select **Trusted** type from the dropdown.
        - **Name** the interface: `Temp Network`.
        - **Set IP**: `192.168.199.1/24`.
        - **Add** a DHCP server:
            - Starting IP: `192.168.199.100`.
            - Ending IP: `192.168.199.110`.
        - Click **OK**, then **OK** again.
    - Save changes (**File > Save > To Firebox**):
        - **No** to feature key warning (no Internet).
        - Provide **admin credentials** _(`{{ devices.firewall.custom_admin_account }}`)_ and click **OK**.
        - WatchGuard stores config files in your documents. **Save the config** here temporarily. At the end of the lab, we'll make a final baseline backup to store in your permanent lab files.
        - Say **yes** to the feature key warning.
    - **Close** the policy manager window and **disconnect** from the firewall in WSM by right-clicking the device.
2. **Test New Interface**:
        - **Move** your ethernet connection into **Interface 4** of the WatchGuard instead of Interface 1.
        - **Confirm** you received a new **IP via DHCP** in the temp network by using the `ipconfig` command.
            - Troubleshoot the connection if not (check your adapter settings, reset the connection, etc.)


## Configuring VLANs to Firewall

1. Reconnect to the Firebox on the temp IP (`192.168.199.1`):
    - WSM > Connect to Firebox > Sign in.
    - Launch **Policy Manager**.
    - **Configure Interface 1**:
        - Go to **Network > Configuration**.
        - Click on the **VLAN** tab and add the **{{ vlans.lan.name }}** network:

            | **VLAN Name** | **VLAN ID** | **Subnet**         | **Default Gateway** | **DHCP Server**       | **DHCP Range**          |
            |---------------|-------------|--------------------|---------------------|-----------------------|-------------------------|
            | {{vlans.lan.name}} | {{vlans.lan.id }} | {{ vlans.lan.subnet }} | {{vlans.lan.gateway}} | Firewall | {{vlans.lan.dhcp_range}} |

            - **Name:** `{{ vlans.lan.name }}`
            - **Security Zone**: `Trusted`
            - **VLAN ID**: `{{ vlans.lan.id }}`
            - **IP Address**: `{{ vlans.lan.gateway }}{{ vlans.lan.cidr }}`
            - **DHCP Server**: Check `Use DHCP Server`
                - Click **Add** and **set** the **starting and ending IP** addresses `({{ vlans.lan.dhcp_range }})`
            - Click **OK** once finished.

        ![Adding VLANs to Firewall](img/add-vlan-to-firewall.png)

        Now you can **add** the **remaining VLANs** below using the same methods. **A couple caveats to be aware of though**:

        - The **IP Address** is a combination of the Default Gateway + the size of the subnet in CIDR notation _(meaning `/24` or similar)_
        - Only add a **DHCP server** to the VLAN if the Firewall is specified for the particular VLAN, otherwise leave it disabled.
        - For **Guest VLAN**, set the security zone to **Custom** instead of **Trusted**. Double check the network size as well, as it's not a /24.

            | **VLAN Name** | **VLAN ID** | **Subnet**         | **Default Gateway** | **DHCP Server**       | **DHCP Range**          |
            |---------------|-------------|--------------------|---------------------|-----------------------|-------------------------|
            {% for vlan in extra.vlans.values() if vlan.name != vlans.lan.name -%}
            | {{ vlan.name }} | {{ vlan.id }} | {{ vlan.subnet }} | {{ vlan.gateway }} | {{ vlan.dhcp_server | default("Not Assigned") }} | {{ vlan.dhcp_range | default("Not Defined") }} |
            {% endfor %}

    ![All Firewall VLANs](img/all-firewall-vlans.png)
 

    **Update Interface after VLANs have been added:**  

    - **Double-click** on `Interface 1`.
    - **Update** the **dropdown** to `VLAN`.
    - **Update** the **name** to `Trusted VLANs`.
    - **Configure** the **untagged VLAN** checkbox to `{{ vlans.lan.name }}` (at the bottom):
    - **Tag** the other **remaining VLANs** using the checkbox at the top so that the main LAN port can pass all VLANs through to the switches. **Do NOT tag the main LAN**.
    - Click **OK**, then **OK** again.

    **Verify Network Changes:**

    - Save our changes to the firewall with **File > Save > To Firebox**.
        - **No** to feature key warning
        - **Authenticate** as admin user
        - **Yes** to warning
    - After the save is successful, **move** the cable back to **Eth 1**.
    - Run `ipconfig` to confirm you received a proper IP from DHCP within the **{{ vlans.lan.name }}** subnet _({{ vlans.lan.subnet }})_.

    If you are successful, then you're good to go!

---

## Final Steps
1. **Backup Baseline Configuration**:
    - Go to **File > Save > As File**.
    - **Save** with a descriptive name, e.g., `baseline_watchguard_firewall.xml`.
    - Store in your lab files (e.g., OneDrive or USB).
3. **Wipe Firewall for Next User**:  
    Once you're all done, be sure to reset the firewall for the next lab user. For {{ devices.firewall.type }} models, follow these steps to factory reset:
    - **Power off** the Firebox using the switch located on the back.
    - **Press and hold** the **Reset** button _(next to power)_.
    - **While holding** the reset button, **power on** the Firebox.
    - **Continue holding** the button until the **ATTN** indicator begins to flash _(about 20 seconds)_.
    - **Release** the reset button but do not power off the Firebox.
    - **Wait** for the reset process to complete _(up to 70 seconds)_. The **ATTN** indicator will stay lit.
    
    The firewall has been reset. You can confirm this by running an `ipconfig` and verifying the IP you were given is within the default subnet of {{ devices.firewall.default_subnet }}.

---

Great work!🎉 You now have a baseline configuration for the firewall. There's still more work we need to do, and we need to connect it to Internet to update our feature key and unlock subscription services. We'll pick up from here in future labs, but in the meantime feel free to review [NIE's technical documenation](https://nie.itglue.com/3451640/docs/6433440) that our Field team uses when they prep new firewalls.