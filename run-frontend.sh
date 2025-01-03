#!/bin/bash

# Serve the React app on port 4000
#npx serve -s build -l 4000
#!/bin/bash

# Use the PORT environment variable provided by Cloud Run, default to 8080
npx serve -s build -l ${PORT:-8080}

