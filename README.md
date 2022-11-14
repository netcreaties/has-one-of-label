# has-one-of-label

Checks if one of specified labels is set, if so sends the first found label back as output.

## Usage

```
name: Publish version based on label

on:
    pull_request:
        types: [opened, synchronize, reopened, closed]

jobs:
    hasOneOfLabel:
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v2
            - name: Checking correct labels
              id: correctLabels
              uses: netcreaties/has-one-of-label@v1
              with:
                  labels: "patch,minor,major"
```
