# has-one-of-label

Checks if one of specified labels is set, if so sends the first found label back as output.

## Usage Example

```yaml
name: Tag next release

on:
    pull_request:
        types: [closed]

jobs:
    semver:
        runs-on: ubuntu-latest
        if: github.event.pull_request.merged
        outputs:
            tag: ${{ steps.semver.outputs.new_version }}
        steps:
            - uses: actions/checkout@v2
              with:
                  fetch-depth: 0
                  ref: ${{ github.event.repository.default_branch }}
            - name: Retrieve latest merged, git tag
              id: latestTag
              run: |
                  version=$(git tag --list --sort v:refname --merged | tail -1)
                  echo ::set-output name=LATEST_TAG::$version
              shell: bash
            - name: Validate and retrieve version label
              id: semverLabel
              uses: netcreaties/has-one-of-label@v1
              with:
                  labels: "patch,minor,major"
            - uses: actions-ecosystem/action-bump-semver@v1
              id: semver
              with:
                  current_version: ${{ steps.latestTag.outputs.latest_tag }}
                  level: ${{ steps.semverLabel.outputs.matched }}
    # Examples of Jobs to run after.
    create_release:
    create_tag:
    update_npm_version:
```
