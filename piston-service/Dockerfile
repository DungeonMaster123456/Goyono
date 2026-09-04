# Self-hosted Piston (code execution engine) for goyono's terminal feature.
# Deploy this folder as a SEPARATE Render service ("Web Service" -> Docker),
# with a Render "Docker Disk" or persistent disk mounted at /piston if you
# want installed language packages to survive restarts (recommended).
#
# Render setup:
#   1. New Web Service -> connect this repo -> Root Directory: piston-service
#   2. Environment: Docker
#   3. Add a Disk: mount path /piston, at least 4GB (languages take space)
#   4. Once deployed, exec into the shell (or use the install script below)
#      to install language packages:
#       curl -X POST $URL/api/v2/packages -H 'Content-Type: application/json' \
#         -d '{"language":"python","version":"3.10.0"}'
#   5. Repeat for javascript 18.15.0, c++ 10.2.0 (gcc), java 15.0.2
#   6. Put this service's URL into the main app's PISTON_URL env var.

FROM ghcr.io/engineer-man/piston:latest

EXPOSE 2000
