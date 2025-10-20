import subprocess

try:
    subprocess.run(["pytest", "jules-scratch/verification/verify_home_page.py"], check=True)
    print("Tests ran successfully.")
except subprocess.CalledProcessError as e:
    print(f"Tests failed with error: {e}")