import { Toolkit } from "actions-toolkit";

type Inputs = {labels: string, optional: string}

interface Label {
    color: string,
    default: boolean,
    description: string,
    name: string,
    node_id: string,
    url: string,
}

export async function hasOneOf(inputs: Inputs, tools: Toolkit) {
    const {context} = tools;

    const inputLabels = inputs.labels.split(',');
    const pullRequestLabels: Label[]|undefined = context.payload?.pull_request?.labels;
    const matchedLabel = pullRequestLabels?.find(label => inputLabels.includes(label.name));

    if (!matchedLabel) {
        tools.outputs.found = 'false';

        if (inputs.optional === 'no') {
            await tools.exit.failure('Pull request does not contain one of specified labels');
        }

        await tools.exit.success('Pull request does not contain one of specified labels, optional found to proceeding');
    }

    tools.outputs.found = 'true';
    tools.outputs.matched = matchedLabel?.name;

    await tools.exit.success('Matched label found');
}
