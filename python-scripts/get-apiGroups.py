import subprocess


cmd_output = subprocess.run(["kubectl", "api-versions"], stdout=subprocess.PIPE, text=True)
fit_out = cmd_output.stdout.split("\n")
service_names = []

for i in fit_out:
    rm_space = " ".join(i.split())
    service_names.append(rm_space.split(" ")[0].split("/")[0])

print(list(set(service_names)))