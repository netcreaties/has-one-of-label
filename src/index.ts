import { Toolkit } from "actions-toolkit";
import { hasOneOf } from "./utils/has-one-of";

Toolkit.run(async tools => {
    const labels = tools.inputs.labels as string;
    const optional = tools.inputs.optional as string;

    await hasOneOf({labels, optional}, tools);
})
