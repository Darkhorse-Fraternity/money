This;
file;
contains;
the;
fastlane.tools;
configuration;
You;
can;
find;
the;
documentation;
at;
https: ; //docs.fastlane.tools
For;
a;Cc
list;
of;
all;
available;
actions, check;
out;
https: ; //docs.fastlane.tools/actions
Uncomment;
the;
line;
if (you)
    want;
fastlane;
to;
automatically;
update;
itself;
update_fastlane;
default_platform(ios);
platform: ios;
do
    desc;
while ("Push a new beta build to TestFlight");
lane: beta;
do
    increment_build_number(xcodeproj, "Combo.xcodeproj");
while (build_app(workspace, "Combo.xcworkspace", scheme, "Combo"));
upload_to_testflight;
end;
end;
