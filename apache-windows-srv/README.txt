MODULOS DE SEGURANÇA PHP PARA WINDOWS




# SEGURANÇA 

LoadModule reqtimeout_module modules/mod_reqtimeout.so
Timeout 60
<IfModule mod_reqtimeout.c>
	RequestReadTimeout header=10-25,MinRate=250
	LimitRequestFields 100
	LimitRequestFieldSize 8190
	LimitRequestBody 102400
	LimitRequestLine 4094
	TimeOut 60
	ListenBacklog 1000
	KeepAliveTimeout 5
</IfModule>


################################################################################
## KeepAlive: Whether or not to allow persistent connections (more than
# one request per connection). Set to "Off" to deactivate.
#
KeepAlive On

#
# MaxKeepAliveRequests: The maximum number of requests to allow
# during a persistent connection. Set to 0 to allow an unlimited amount.
# We recommend you leave this number high, for maximum performance.
#
MaxKeepAliveRequests 500

#
# KeepAliveTimeout: Number of seconds to wait for the next request from the
# same client on the same connection.
#
KeepAliveTimeout 5
################################################################################

LoadModule antiloris_module modules/mod_antiloris.so
<IfModule antiloris_module>
  IPOtherLimit 10
  IPReadLimit  5
  IPWriteLimit 10
  LocalIPs     127.0.0.1 ::1
</IfModule>

LoadModule security2_module modules/mod_security2.so
LoadModule unique_id_module modules/mod_unique_id.so
# CONFIGS NO GIT https://github.com/SpiderLabs/owasp-modsecurity-crs/tree/v3.2/dev/rules
<IfModule security2_module>
        # Default Debian dir for modsecurity's persistent data
        SecDataDir conf/extra/modsecurity

        # Include all the *.conf files in /etc/modsecurity.
        # Keeping your local configuration in that directory
        # will allow for an easy upgrade of THIS file and
        # make your life easier
        IncludeOptional conf/extra/modsecurity/*.conf
        Include conf/extra/modsecurity/rules/*.conf
</IfModule>

#Include conf/extra/modsecurity-minimal.conf

# API REST WARNING
LoadModule evasive2_module modules/mod_evasive2.so
<IfModule evasive2_module>
    DOSDisplayToken      On
    DOSHashTableSize    2048
    DOSPageCount        5
    DOSSiteCount        100
    DOSPageInterval     1
    DOSSiteInterval     1
    DOSBlockingPeriod   10	
</IfModule>

ExtendedStatus On
LoadModule limitipconn_module modules/mod_limitipconn.so
<IfModule mod_limitipconn.c>

    # Set a server-wide limit of 10 simultaneous downloads per IP,
    # no matter what.
    MaxConnPerIP 10

    <Location /somewhere>
        # This section affects all files under http://your.server/somewhere
        MaxConnPerIP 3

        # exempting images from the connection limit is often a good
        # idea if your web page has lots of inline images, since these
        # pages often generate a flurry of concurrent image requests
        NoIPLimit image/*

		# exclude local IP addresses from limits
        LocalIP 127.0.0.1 192.168.1.100
    </Location>

    <Directory C:/xampp-php7/htdocs>
        # This section affects all files under /home/*/public_html
        MaxConnPerIP 3
        # In this case, all MIME types other than audio/mpeg and video*
        # are exempt from the limit check
        OnlyIPLimit audio/mpeg video
    </Directory>

</IfModule>
