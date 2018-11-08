30 May 2017


                                           Apache Lounge Distribution

                                       mod_evasive2 1.10.2 for Apache 2.4 Win32 VC15

# Original Home: http://www.zdziarski.com/blog/?page_id=442
# Ported for Windows Apache 2.4 compatibility by: Gregg Smith
# Binary by: Steffen
# Mail: info@apachelounge.com
# Home: http://www.apachelounge.com/

Build with Visual Studio® 2017 (VC15)
--------------------------------------------
Be sure you have installed the Visual C++ Redistributable for Visual Studio 2017.
Download and install, if you not have it already, see:

 http://www.apachelounge.com/download/vc15/


# Install:

- Copy mod_evasive2.so to your modules folder 


# Add to your httpd.conf

LoadModule evasive2_module modules/mod_evasive2.so


# Directives provided by mod_evasive2

mod_evasive has default options configured, but you may also add the
following block to your httpd.conf:

<IfModule evasive2_module>
    DOSDisplayToken      On
    DOSHashTableSize    3097
    DOSPageCount        2
    DOSSiteCount        50
    DOSPageInterval     1
    DOSSiteInterval     1
    DOSBlockingPeriod   10
</IfModule>

Optionally you can also add the following directive:
    DOSSystemCommand	"C:/SomeAppDir/someapp.exe %s"
    DOSLogDir		"C:/Apache24/logs"

The DOS log will default to /temp on the hard drive Apache is running on 
(i.e. C:\Temp if Apache is on drive C) if the folder exists. It is recommended
however to use DOSLogDir and configure it to your Apache's logs folder.

DOSDisplayToken
----------------

Default: Off
Values On or Off, Displays the module name and version in the ServerSignature
when ServerTokens are set to full and ServerSignature is turned on. 


DOSHashTableSize
----------------

Default: 3097
The hash table size defines the number of top-level nodes for each child's 
hash table.  Increasing this number will provide faster performance by 
decreasing the number of iterations required to get to the record, but 
consume more memory for table space.  You should increase this if you have
a busy web server.  The value you specify will automatically be tiered up to 
the next prime number in the primes list (see mod_evasive.c for a list 
of primes used).

DOSPageCount
------------

Default: 2
This is the threshhold for the number of requests for the same page (or URI)
per page interval.  Once the threshhold for that interval has been exceeded,
the IP address of the client will be added to the blocking list.
 
DOSSiteCount
------------

Default: 50
This is the threshhold for the total number of requests for any object by
the same client on the same listener per site interval.  Once the threshhold 
for that interval has been exceeded, the IP address of the client will be added
to the blocking list.

DOSPageInterval
---------------

Default: 1
The interval for the page count threshhold; defaults to 1 second intervals.

DOSSiteInterval
---------------

Default: 1
The interval for the site count threshhold; defaults to 1 second intervals.

DOSBlockingPeriod
-----------------

Default: 10
The blocking period is the amount of time (in seconds) that a client will be
blocked for if they are added to the blocking list.  During this time, all
subsequent requests from the client will result in a 503 (Forbidden) and
the timer being reset (e.g. another 10 seconds).  Since the timer is reset
for every subsequent request, it is not necessary to have a long blocking
period; in the event of a DoS attack, this timer will keep getting reset. 

DOSSystemCommand (experimental on Windows and untested)
----------------

If this value is set, the system command specified will be executed
whenever an IP address becomes blacklisted.  This is designed to enable
system calls to ip filter or other tools.  A locking mechanism using /tmp
prevents continuous system calls.  Use %s to denote the IP address of the
blacklisted IP.

DOSLogDir
---------

Choose an alternative temp directory


WHITELISTING IP ADDRESSES

IP addresses of trusted clients can be whitelisted to insure they are never 
denied.  The purpose of whitelisting is to protect software, scripts, local 
searchbots, or other automated tools from being denied for requesting large 
amounts of data from the server.  Whitelisting should *not* be used to add 
customer lists or anything of the sort, as this will open the server to abuse.
This module is very difficult to trigger without performing some type of 
malicious attack, and for that reason it is more appropriate to allow the 
module to decide on its own whether or not an individual customer should be 
blocked.

To whitelist an address (or range) add an entry to the Apache configuration 
in the following fashion:

DOSWhitelist	127.0.0.1
DOSWhitelist	127.0.0.*

Wildcards can be used on up to the last 3 octets if necessary.  Multiple
DOSWhitelist commands may be used in the configuration.

TWEAKING APACHE

The keep-alive settings for your children should be reasonable enough to 
keep each child up long enough to resist a DOS attack (or at least part of 
one).  Remember, it is the child processes that maintain their own internal
IP address tables, and so when one exits, so does all of the IP information it
had. For every child that exits, another 5-10 copies of the page may get 
through before putting the attacker back into '503 Land'.  With this said, 
you should have a very high MaxRequestsPerChild, but not unlimited as this
will prevent cleanup.

You'll want to have a MaxRequestsPerChild set to a non-zero value, as
DosEvasive cleans up its internal hashes only on exit.  The default
MaxRequestsPerChild is usually 10000.  This should suffice in only allowing
a few requests per 10000 per child through in the event of an attack (although
if you use DOSSystemCommand to firewall the IP address, a hole will no
longer be open in between child cycles).

TESTING

Want to make sure it's working? Run test.pl, and view the response codes.
It's best to run it several times on the same machine as the web server until
you get 503 Forbidden messages. Some larger servers with high child counts 
may require more of a beating than smaller servers before blacklisting
addresses. 

Please don't use this script to DoS others without their permission.
